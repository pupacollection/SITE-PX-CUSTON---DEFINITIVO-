import React from 'react';

interface PxLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
}

export const PxLogo: React.FC<PxLogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = false,
}) => {
  const dimensions = {
    sm: 'h-8',
    md: 'h-11',
    lg: 'h-16',
    xl: 'h-24',
  }[size];

  return (
    <div className={`inline-flex flex-col items-center select-none ${className}`}>
      <svg
        viewBox="0 0 520 250"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${dimensions} w-auto max-w-full drop-shadow-[0_2px_12px_rgba(255,26,45,0.2)] transition-transform hover:scale-[1.02]`}
      >
        <defs>
          <filter id="px-glow-filter" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#FF1A2D" floodOpacity="0.45" />
          </filter>
        </defs>

        {/* Black Contour Base Shield / Sticker Outline */}
        <path
          d="M 115 15 C 65 15, 18 60, 18 120 C 18 180, 58 225, 118 225 C 145 225, 168 215, 185 200 L 490 200 C 510 200, 515 185, 515 170 L 515 125 C 515 105, 495 90, 400 90 L 375 25 C 365 15, 340 15, 310 15 Z"
          fill="#000000"
          stroke="#1f1f1f"
          strokeWidth="3.5"
        />

        {/* Subwoofer / Turbo Horn Structure (Left Badge Motif) */}
        <g transform="translate(15, 10)">
          {/* Outer white rim */}
          <path
            d="M 95 24 C 55 24, 24 64, 24 115 C 24 165, 55 202, 95 202 C 115 202, 130 192, 140 176 C 120 176, 75 160, 70 115 C 65 70, 110 44, 136 44 C 126 31, 110 24, 95 24 Z"
            fill="#FFFFFF"
          />
          {/* Inner horn shadow & contour */}
          <path
            d="M 60 115 C 60 85, 85 58, 110 50 C 90 60, 80 85, 80 115 C 80 145, 95 168, 115 175 C 90 170, 60 148, 60 115 Z"
            fill="#050505"
          />
          {/* Central cone dynamic ellipses */}
          <ellipse cx="108" cy="115" rx="14" ry="42" fill="#FFFFFF" />
          <ellipse cx="109" cy="115" rx="8" ry="28" fill="#000000" />
        </g>

        {/* Bold White Letter "P" with Automotive Stencil Cut */}
        <g transform="translate(160, 80)">
          <path
            d="M 0 0 L 0 86 L 27 86 L 27 52 L 48 52 C 69 52, 79 40, 79 26 C 79 10, 67 0, 48 0 Z M 27 18 L 44 18 C 50 18, 53 21, 53 26 C 53 31, 50 34, 44 34 L 27 34 Z"
            fill="#FFFFFF"
          />
        </g>

        {/* Automotive Red Letter "X" with Custom Sharp Geometry */}
        <g transform="translate(236, 70)" filter="url(#px-glow-filter)">
          <polygon points="12,10 42,10 98,96 68,96" fill="#FF1A2D" />
          <polygon points="68,10 98,10 12,96 0,78 52,50" fill="#FF1A2D" />
        </g>

        {/* Dynamic Tachometer / Audio Frequency Waveform with Arrow */}
        <g transform="translate(138, 162)" filter="url(#px-glow-filter)">
          {/* Red baseline */}
          <rect x="0" y="3" width="186" height="7.5" fill="#FF1A2D" rx="2" />
          
          {/* Downward Arrow Marker */}
          <polygon points="100,2 84,24 116,24" fill="#FF1A2D" transform="rotate(35 100 12)" />
          
          {/* High-frequency sound spikes */}
          <polyline
            points="180,6.5 200,-15 215,22 230,-22 245,24 260,-18 275,18 290,-8 305,6.5 358,6.5"
            fill="none"
            stroke="#FF1A2D"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* Typography: "CUSTON" in Stencil Industrial Font */}
        <g transform="translate(285, 206)">
          {/* C */}
          <path d="M 22 2 L 7 2 C 2 2, 0 5, 0 12 L 0 18 C 0 25, 2 28, 7 28 L 22 28 L 22 22 L 7 22 L 7 8 L 22 8 Z" fill="#FFFFFF" />
          {/* U */}
          <path d="M 30 2 L 37 2 L 37 21 C 37 23, 38 24, 41 24 C 44 24, 45 23, 45 21 L 45 2 L 52 2 L 52 20 C 52 26, 48 28, 41 28 C 34 28, 30 26, 30 20 Z" fill="#FFFFFF" />
          {/* S */}
          <path d="M 60 2 L 78 2 L 78 7 L 66 7 L 66 12 L 78 15 L 78 28 L 60 28 L 60 22 L 72 22 L 72 18 L 60 15 Z" fill="#FFFFFF" />
          {/* T */}
          <path d="M 85 2 L 105 2 L 105 7 L 98 7 L 98 28 L 92 28 L 92 7 L 85 7 Z" fill="#FFFFFF" />
          {/* O */}
          <path d="M 112 2 L 128 2 C 133 2, 135 5, 135 12 L 135 18 C 135 25, 133 28, 128 28 L 112 28 C 107 28, 105 25, 105 18 L 105 12 C 105 5, 107 2, 112 2 Z M 112 8 L 112 22 L 128 22 L 128 8 Z" fill="#FFFFFF" />
          {/* N */}
          <path d="M 142 2 L 149 2 L 160 18 L 160 2 L 166 2 L 166 28 L 159 28 L 148 11 L 148 28 L 142 28 Z" fill="#FFFFFF" />
        </g>
      </svg>

      {showSubtitle && (
        <span className="text-[10px] md:text-xs font-black tracking-[0.25em] text-[#FF1A2D] uppercase mt-1">
          EVENTOS • CARROS • EXPERIÊNCIAS
        </span>
      )}
    </div>
  );
};
