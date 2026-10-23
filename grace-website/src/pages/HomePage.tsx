import './HomePage.css'

function AircraftBlueprint() {
  return (
    <div className="home-blueprint" aria-hidden="true">
      <svg viewBox="0 0 760 430" role="presentation">
        <g className="home-blueprint__dimensions">
          <path d="M85 64H681M85 54V74M681 54V74" />
          <path d="M225 338H635M225 328V348M635 328V348" />
        </g>

        <g className="home-blueprint__airframe">
          <rect x="74" y="195" width="610" height="40" rx="20" />
          <path className="home-blueprint__centerline" d="M80 215H680" />
          <circle cx="69" cy="215" r="17" />
          <circle cx="662" cy="215" r="27" />
          <circle cx="503" cy="215" r="35" />

          <path className="home-blueprint__major" d="M248 281 586 131M248 150 586 300" />
          <path className="home-blueprint__minor" d="M260 230 561 96M260 200 561 334" />
          <path className="home-blueprint__tail" d="M105 232 205 165M105 198 205 265M110 112 132 214" />

          <circle cx="413" cy="131" r="21" />
          <circle cx="413" cy="299" r="21" />
        </g>

        <text className="home-blueprint__label home-blueprint__label--top" x="286" y="49">
          AIRFRAME / TOP VIEW
        </text>
        <text className="home-blueprint__label home-blueprint__label--station" x="612" y="166">
          STA. 04
        </text>
        <text className="home-blueprint__label home-blueprint__label--wingspan" x="372" y="360">
          WINGSPAN
        </text>
      </svg>
    </div>
  )
}

export default function HomePage() {
  return (
    <main id="main-content" tabIndex={-1} className="home-page">
      <h1 className="sr-only">Santa Barbara Aeronautics</h1>

      <div className="home-grid" aria-hidden="true">
        <span className="home-grid__horizontal home-grid__horizontal--top" />
        <span className="home-grid__horizontal home-grid__horizontal--one" />
        <span className="home-grid__horizontal home-grid__horizontal--two" />
        <span className="home-grid__horizontal home-grid__horizontal--three" />
        <span className="home-grid__vertical home-grid__vertical--left" />
        <span className="home-grid__vertical home-grid__vertical--center" />
        <span className="home-grid__vertical home-grid__vertical--right" />
      </div>

      <AircraftBlueprint />

      <div className="home-marquee" aria-hidden="true">
        <div className="home-marquee__track">
          <span>SB AERO</span>
          <span>SB AERO</span>
          <span>SB AERO</span>
        </div>
      </div>
    </main>
  )
}
