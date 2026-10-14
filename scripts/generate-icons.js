import fs from 'fs';
import zlib from 'zlib';

function createPNG(width, height, r, g, b, a = 255) {
  const bytesPerPixel = 4;
  const scanlineLength = width * bytesPerPixel;
  const rawData = Buffer.alloc(height * (scanlineLength + 1));

  for (let y = 0; y < height; y++) {
    const rowOffset = y * (scanlineLength + 1);
    rawData[rowOffset] = 0; // Filter type 0 (None)
    for (let x = 0; x < width; x++) {
      const pixelOffset = rowOffset + 1 + x * bytesPerPixel;
      // Simple border and center red logo accent
      const isRedAccent = (x > width * 0.35 && x < width * 0.65 && y > height * 0.4 && y < height * 0.6);
      if (isRedAccent) {
        rawData[pixelOffset] = 255;
        rawData[pixelOffset + 1] = 26;
        rawData[pixelOffset + 2] = 45;
        rawData[pixelOffset + 3] = 255;
      } else {
        rawData[pixelOffset] = r;
        rawData[pixelOffset + 1] = g;
        rawData[pixelOffset + 2] = b;
        rawData[pixelOffset + 3] = a;
      }
    }
  }

  const compressed = zlib.deflateSync(rawData);

  function makeChunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);
    const typeBuf = Buffer.from(type, 'ascii');
    const crcBuf = Buffer.alloc(4);
    
    // CRC-32 calculation
    let crc = 0 ^ (-1);
    for (const b of Buffer.concat([typeBuf, data])) {
      crc = (crc >>> 8) ^ table[(crc ^ b) & 0xff];
    }
    crc = (crc ^ (-1)) >>> 0;
    crcBuf.writeUInt32BE(crc, 0);

    return Buffer.concat([len, typeBuf, data, crcBuf]);
  }

  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) {
      c = (c & 1) ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[i] = c >>> 0;
  }

  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type (RGBA)
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace

  const ihdrChunk = makeChunk('IHDR', ihdr);
  const idatChunk = makeChunk('IDAT', compressed);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

fs.mkdirSync('public', { recursive: true });
fs.writeFileSync('public/px-logo-192.png', createPNG(192, 192, 17, 17, 17));
fs.writeFileSync('public/px-logo-512.png', createPNG(512, 512, 17, 17, 17));
fs.writeFileSync('public/px-logo-maskable-512.png', createPNG(512, 512, 0, 0, 0));
fs.writeFileSync('public/apple-touch-icon.png', createPNG(180, 180, 17, 17, 17));
fs.writeFileSync('public/favicon.ico', createPNG(32, 32, 17, 17, 17));
console.log('Icons generated successfully.');
