import PageIntro from '../components/PageIntro'
import './SponsorsPage.css'

export default function SponsorsPage() {
  return (
    <main className="page sponsors-page">
      <div className="page__inner">
        <PageIntro eyebrow="Partners / Our Supporters" title="Building the future of flight, together.">
          <p className="sponsors-page__lede">
            Our partners help SB Aero transform ambitious ideas into real airframes, flight tests,
            and a stronger student engineering community.
          </p>
        </PageIntro>

        <section className="sponsors" aria-labelledby="sponsors-heading">
          <h2 id="sponsors-heading">THANK YOU TO OUR SPONSORS</h2>

          <div className="sponsors__list">
            <div className="sponsor-card glass-card">
              <img
                className="sponsor-card__logo sponsor-card__logo--aztech"
                src="/assets/sponsors/aztech-labs.png"
                alt="Aztech Labs"
              />
            </div>

            <a
              className="sponsor-card glass-card sponsor-card--link"
              href="https://accu-components.com/us/"
              target="_blank"
              rel="noreferrer"
              aria-label="Visit Accu Components"
            >
              <img
                className="sponsor-card__logo sponsor-card__logo--accu"
                src="/assets/sponsors/accu-components.png"
                alt="Accu Components"
              />
            </a>
          </div>
        </section>
      </div>
    </main>
  )
}
