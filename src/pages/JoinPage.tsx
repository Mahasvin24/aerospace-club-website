import './JoinPage.css'

const joinFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSdnimrw_WGW1eqc9N5nO0xDxfg-oGchwFrlcJK7zAYO3uvMFw/viewform'
const calendarUrl = 'https://docs.google.com/spreadsheets/d/1k8jAfNfwNUZDOiO9iNy0gWImfC9p1740Hf73wLA0o0I/edit?usp=sharing'

const steps = [
  {
    number: '01',
    title: 'Reach out',
    description: (
      <>Fill out our google form linked <a href={joinFormUrl} target="_blank" rel="noreferrer" aria-label="Open the membership interest form here (opens in a new tab)">here</a></>
    ),
  },
  {
    number: '02',
    title: 'Meet the group',
    description: 'Attend a meeting or project work day to understand the club direction.',
  },
  {
    number: '03',
    title: 'Pick a track',
    description: 'Choose a focus area: engineering, content, finances, research, or operations.',
  },
]

export default function JoinPage() {
  return (
    <main id="main-content" tabIndex={-1} className="page join-page">
      <div className="page__inner join-page__inner">
        <header className="join-intro">
          <p className="join-intro__eyebrow">Join / Contact</p>
          <h1>LEARN, BUILD, AND FLY WITH US.</h1>
          <p className="join-intro__subtitle">What you should do</p>
        </header>

        <section className="join-steps" aria-label="How to join">
          {steps.map((step) => (
            <article className="join-step" key={step.number}>
              <p className="join-step__number">{step.number}</p>
              <h2>{step.title}</h2>
              <p className="join-step__description">{step.description}</p>
            </article>
          ))}
        </section>

        <section className="join-contact" aria-labelledby="contact-heading">
          <div className="join-contact__copy">
            <h2 id="contact-heading">CONTACT US</h2>
            <p>For general inquiries, questions, or comments:</p>
            <a className="join-contact__email" href="mailto:sb.aeronautics@gmail.com">
              sb.aeronautics@gmail.com
            </a>
          </div>

          <div className="join-calendar">
            <p className="join-calendar__label">Calendar</p>
            <a className="join-calendar__title" aria-label="SB Aero's Annual Calendar (opens in a new tab)" href={calendarUrl} target="_blank" rel="noreferrer">
              SB Aero&apos;s Annual Calendar
            </a>
            <p>
              Find our events and meeting schedule{' '}
              <a href={calendarUrl} target="_blank" rel="noreferrer" aria-label="View club events and meeting schedule here (opens in a new tab)">here</a>
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}
