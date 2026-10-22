export type AircraftPart = "airframe" | "rotors" | "propeller";

export const aircraftParts: Record<
  AircraftPart,
  { label: string; description: string }
> = {
  airframe: {
    label: "The airframe",
    description:
      "A fixed-wing concept for the journey from our coast to the local reefs, and back again.",
  },
  rotors: {
    label: "Vertical lift",
    description:
      "Four lift rotors let Condor take off vertically before transitioning to forward flight.",
  },
  propeller: {
    label: "Forward flight",
    description:
      "One cruise propeller carries the aircraft out over the reefs for marine observation.",
  },
};

export default function Aircraft({
  selected = "airframe",
  compact = false,
}: {
  selected?: AircraftPart;
  compact?: boolean;
}) {
  return (
    <svg
      className={`aircraft-art ${compact ? "aircraft-art--compact" : ""} aircraft-art--${selected}`}
      viewBox="0 0 800 660"
      role="img"
      aria-label="Illustrative Condor concept: a fixed-wing aircraft with four vertical lift rotors and a rear cruise propeller"
    >
      <defs>
        <linearGradient
          id={compact ? "wing-small" : "wing"}
          x1="0"
          y1="0"
          x2="1"
          y2="1"
        >
          <stop stopColor="#fff" />
          <stop offset="1" stopColor="#c2d1e6" />
        </linearGradient>
        <linearGradient
          id={compact ? "hull-small" : "hull"}
          x1="0"
          y1="0"
          x2=".8"
          y2="1"
        >
          <stop stopColor="#fff" />
          <stop offset=".6" stopColor="#edf2f7" />
          <stop offset="1" stopColor="#93abcf" />
        </linearGradient>
        <pattern
          id={compact ? "hatch-small" : "hatch"}
          width="6"
          height="6"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(35)"
        >
          <path d="M0 0V6" stroke="#39549a" strokeWidth="1" />
        </pattern>
      </defs>
      <g
        className="aircraft-guides"
        fill="none"
        stroke="#264bc8"
        strokeWidth=".8"
      >
        <ellipse
          cx="413"
          cy="363"
          rx="302"
          ry="159"
          transform="rotate(-24 413 363)"
          strokeDasharray="3 8"
        />
        <path d="M73 510 701 198M248 127 570 591" strokeDasharray="4 8" />
        <path d="m83 503-8 6 10 1M690 201l11-3-6 9M244 132l4-6 6 3M563 587l8 6 1-10" />
        <path d="M131 511v16m-8-8h16M668 150v16m-8-8h16" />
      </g>
      <g
        className="aircraft-shadow"
        opacity=".11"
        fill="#264bc8"
        transform="translate(3 54)"
      >
        <path d="m155 421 199-104-69-160 38-7 132 115 148-61 42 13-93 66 90 64-24 20-108-52-43 30 74 151-37 26-119-133-192 51Z" />
      </g>
      <g className="aircraft-model" strokeLinejoin="round">
        <g className="aircraft-tail" stroke="#879dc0" strokeWidth="1">
          <path d="m531 251 18-66 20-10 13 58Z" fill="#dae4f0" />
          <path d="m550 249 18-66 1-8 13 58Z" fill="#a8bbd4" />
          <path
            d="m532 255 65-56 26 1-44 59 82 13 12 19-111-12Z"
            fill={`url(#${compact ? "wing-small" : "wing"})`}
          />
          <path d="m579 259 82 13 12 19-111-12Z" fill="#c3d0e0" />
          <path d="m624 200-45 59M661 278l-69-10" fill="none" />
        </g>
        <g className="aircraft-wing" stroke="#8299bb" strokeWidth="1.2">
          <path
            d="m333 322-76-167 33-25 154 143 135 207-36 28-145-158Z"
            fill={`url(#${compact ? "wing-small" : "wing"})`}
          />
          <path
            d="m333 322-76-167 4 11 70 164 67 28 145 159 36-27v-10l-36 28-145-158Z"
            fill="#a6bad3"
          />
          <path
            d="m290 130 154 143M300 164l115 114M437 323l103 153 25-8"
            fill="none"
          />
          <path d="m285 142 21 21-19 13-16-25Z" fill="#e7ee98" stroke="none" />
          <path d="m519 467 19 25 25-18-19-24Z" fill="#264bc8" stroke="none" />
          <path
            d="m319 201 43 42M484 406l28 41"
            stroke="#b1c2d9"
            strokeWidth="3"
          />
        </g>
        <g
          className="aircraft-booms"
          stroke="#54729e"
          strokeWidth="8"
          strokeLinecap="round"
        >
          <path d="m232 326 232-112M341 479l220-111" />
          <path
            d="m232 324 232-112M341 477l220-111"
            stroke="#a3b8d3"
            strokeWidth="3"
          />
        </g>
        <g className="aircraft-hull" stroke="#8299bb" strokeWidth="1">
          <path
            d="M148 426c-6-13 43-49 70-67l312-137c22-9 52-5 61 8l-39 40-333 154c-34 13-62 17-71 2Z"
            fill={`url(#${compact ? "hull-small" : "hull"})`}
          />
          <path
            d="M148 426c11 15 58-2 82-14l322-152 39-30-39 40-333 154c-34 13-62 17-71 2Z"
            fill="#a6bad4"
          />
          <path
            d="m283 337 72-34c19-9 39-10 44-2l-52 35-57 25c-12 5-21-11-7-24Z"
            fill="#264bc8"
            stroke="#193d9d"
          />
          <path
            d="m290 340 63-29c13-6 25-8 34-7l-49 28-49 22Z"
            fill="#5279db"
            stroke="none"
          />
          <path
            d="m167 399 24-17c-10 13-4 28 7 30l-23 9c-17 6-19-9-8-22Z"
            fill="#e7ee98"
            stroke="none"
          />
          <path
            d="m439 270 43-19 16 6-47 23Z"
            fill={`url(#${compact ? "hatch-small" : "hatch"})`}
            opacity=".5"
          />
          <path
            d="m215 405 26-12M224 411l26-13"
            stroke="#264bc8"
            strokeWidth="2"
          />
        </g>
        <g className="aircraft-rotors">
          {[
            [232, 324],
            [464, 212],
            [341, 477],
            [561, 366],
          ].map(([x, y], i) => (
            <g key={i} transform={`translate(${x} ${y})`}>
              <ellipse
                cy="5"
                rx="61"
                ry="23"
                fill="#b3c8e0"
                opacity=".19"
                stroke="#264bc8"
                strokeWidth=".8"
              />
              <path d="m-8 0 5 14c3 4 9 3 13-1L8-3Z" fill="#4c658a" />
              <ellipse rx="9" ry="5" fill="#213e70" />
              <g transform={`rotate(${i % 2 ? -22 : 20})`}>
                <path
                  d="M-3-2C-20-11-50-12-60-7c12 6 36 10 58 10ZM3 2c18 9 47 10 58 5C48 1 25-3 2-3Z"
                  fill="#264bc8"
                  stroke="#163aa1"
                  strokeWidth=".8"
                />
                <path d="m-60-7 9 4 1-6ZM61 7l-9-4-1 6Z" fill="#e7ee98" />
              </g>
              <ellipse rx="5" ry="3" fill="#dce6ef" stroke="#38557e" />
            </g>
          ))}
        </g>
        <g className="aircraft-propeller" transform="translate(591 232)">
          <path d="m-6 2 11-5 12 6-9 10Z" fill="#314d7a" />
          <path
            d="M9 5c-2-14 4-44 11-49 5 11 0 34-7 49Zm1 0c2 15-4 44-11 50-5-12 0-35 7-50Z"
            fill="#264bc8"
            stroke="#173c9c"
          />
          <path d="m18-42 2-2 2 8-5 4M0 47l-1 8-3-7 2-6" fill="#e7ee98" />
          <circle cx="10" cy="5" r="5" fill="#e7ee98" />
        </g>
      </g>
      {!compact && (
        <g
          className="aircraft-markings"
          fill="#264bc8"
          fontSize="12"
          fontFamily="'General Sans',sans-serif"
        >
          <text x="103" y="565">
            Condor / illustrative concept
          </text>
          <path d="M103 579h28" stroke="#264bc8" strokeWidth="2" />
          <text x="626" y="119" fontSize="11">
            Santa Barbara
          </text>
          <text x="626" y="137" fontSize="11">
            ↗ Pacific coast
          </text>
        </g>
      )}
    </svg>
  );
}
