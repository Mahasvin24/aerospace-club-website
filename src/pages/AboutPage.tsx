import './AboutPage.css'

const mission =
  'This organization is built upon the fundamental principles of personal integrity, innovation, entrepreneurship, comradery, and leadership. Our main objective is to foster the talents of our members and instill these fundamental principles so when they graduate, they will take with them what they have learned to any company, university, start up, or any other organization they choose to enter.'

const vision =
  "Our mission is not to be the average engineering organization, our goal is to be the leading collegiate organization across all of California in Aeronautics, Controls, and Robotics in all metrics. Our aim to accomplish this goal is to create advanced projects, dominate in any competition we may enter, develop our members' technical and leadership skills, and most importantly build and maintain relationships across our local organizations, campus, city, county and state."

export default function AboutPage() {
  return (
    <main className="about-page">
      <section className="about-intro" aria-labelledby="about-title">
        <p className="about-intro__eyebrow">About / Our History</p>
        <h1 id="about-title">A student-built aeronautics club taking shape in Santa Barbara.</h1>
      </section>

      <section className="about-grid" aria-label="Mission and vision">
        <article className="about-card about-card--mission">
          <h2>Mission</h2>
          <p>{mission}</p>
        </article>

        <article className="about-card about-card--statement about-card--shore">
          <p>Beyond the Shore</p>
        </article>

        <article className="about-card about-card--statement about-card--rest">
          <p>Above the Rest</p>
        </article>

        <article className="about-card about-card--vision">
          <p>{vision}</p>
        </article>
      </section>
    </main>
  )
}
