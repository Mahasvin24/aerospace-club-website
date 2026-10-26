import PageIntro from '../components/PageIntro'
import './FleetPage.css'

interface FleetEntry {
  name: string
  type: string
  status: string
  description: string
  image?: string
  imageAlt?: string
  imageHeight?: number
  specifications: Array<{ label: string; value: string }>
}

const fleet: FleetEntry[] = [
  {
    name: 'RC Galaga',
    type: 'FPV Testbed Quadcopter',
    status: 'Legacy Build',
    description:
      'The catalyst build that started it all for SB Aero. Assembled and wired entirely in-house from individual components, RC Galaga served as our hands-on testbed for building, wiring, and tuning quadcopters. It was our first step in taking a complex aerial build from raw parts to field operations.',
    image: '/assets/fleet/rc-galaga.jpg',
    imageAlt: 'RC Galaga quadcopter resting on a concrete ledge',
    imageHeight: 689,
    specifications: [
      { label: 'Weight', value: 'TBD' },
      { label: 'Span', value: '5\"' },
      { label: 'Time', value: '15+ minutes' },
      { label: 'Feature', value: 'Lasers' },
    ],
  },
  {
    name: 'Skyscout',
    type: 'FPV Endurance Quadcopter',
    status: 'Active Development',
    description:
      'Engineered for long-duration hovering and precision data capturing, this drone serves as our analytics platform in the sky. Built around a stabilized camera gimbal, custom ESC, and onboard computer vision software, it autonomously tracks player positions, ball movement, and team formations during soccer matches. Skyscout delivers the high-altitude data every trainer and team needs.',
    image: '/assets/fleet/skyscout.jpg',
    imageAlt: 'Skyscout quadcopter being tested outdoors',
    imageHeight: 683,
    specifications: [
      { label: 'Weight', value: 'TBD' },
      { label: 'Span', value: '10\"' },
      { label: 'Time', value: '20+ minutes' },
      { label: 'Feature', value: 'Computer Vision' },
    ],
  },
  {
    name: 'Condor',
    type: 'VTVL surveillance drone',
    status: 'Active Development',
    description:
      "Using 4 rotors and 1 propeller, this drone is designed to fly out over Santa Barbara's local reefs and back. It captures wildlife from above undisturbed and provides needed data to marine scientists.",
    specifications: [
      { label: 'Weight', value: 'TBD' },
      { label: 'Span', value: '3’’ by 2’’' },
      { label: 'Time', value: 'TBD' },
      { label: 'Feature', value: 'TBD' },
    ],
  },
]

export default function FleetPage() {
  return (
    <main id="main-content" tabIndex={-1} className="page fleet-page">
      <div className="page__inner">
        <PageIntro eyebrow="Our Fleet" title={'THE HARDWARE\nWE BUILD AND FLY.'}>
          <div className="fleet-page__motto" aria-label="Ad rem classem paratus — ready for the fleet">
            <span>AD REM CLASSEM PARATUS</span>
            <em>READY FOR THE FLEET</em>
          </div>
        </PageIntro>

        <hr className="section-rule fleet-page__rule" />

        <section className="fleet-list content-width" aria-label="Aircraft fleet">
          {fleet.map((aircraft) => (
            <article className="fleet-card glass-card" key={aircraft.name}>
              {aircraft.image ? (
                <img
                  className="fleet-card__image"
                  src={aircraft.image}
                  alt={aircraft.imageAlt}
                  width={1024}
                  height={aircraft.imageHeight}
                  loading="lazy"
                />
              ) : (
                <div className="fleet-card__placeholder" aria-hidden="true">
                  <span>COMING SOON</span>
                  <svg viewBox="0 0 240 150">
                    <path d="M20 76h200M120 18v114M63 37l114 78M177 37 63 115" />
                    <circle cx="120" cy="75" r="25" />
                    <circle cx="35" cy="75" r="8" />
                    <circle cx="205" cy="75" r="8" />
                  </svg>
                </div>
              )}

              <div className="fleet-card__content">
                <h2>{aircraft.name}</h2>
                <p className="fleet-card__meta">
                  <span>{aircraft.type}</span>
                  <span className="fleet-card__status">
                    <span aria-hidden="true">•</span>
                    {aircraft.status}
                  </span>
                </p>
                <p className="fleet-card__description">{aircraft.description}</p>

                <dl className="fleet-card__specs">
                  {aircraft.specifications.map((specification) => (
                    <div key={specification.label}>
                      <dt>{specification.label}</dt>
                      <dd>{specification.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  )
}
