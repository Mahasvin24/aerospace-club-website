import './TeamPage.css'

interface TeamMember {
  name: string
  role: string
  image?: string
  imagePosition?: 'center' | 'top'
}

const executiveRows: TeamMember[][] = [
  [
    {
      name: 'Tony Ruelas',
      role: 'President',
      image: '/assets/team/tony-ruelas.png',
    },
    {
      name: 'Yael Carranza',
      role: 'Vice President',
      image: '/assets/team/yael-carranza.png',
      imagePosition: 'top',
    },
  ],
  [
    {
      name: 'Grace Holtzclaw',
      role: 'Technology Director',
      image: '/assets/team/grace-holtzclaw.png',
    },
    {
      name: 'Luis Martinez',
      role: 'Financial Director',
      image: '/assets/team/luis-martinez.png',
    },
    {
      name: 'Amy McGraw',
      role: 'Administrative Director',
    },
  ],
]

const chairRows: TeamMember[][] = [
  [
    {
      name: 'Ana Shrivastava',
      role: 'Creative Media & Design Chair',
      image: '/assets/team/ana-shrivastava.png',
    },
    {
      name: 'Vacant',
      role: 'Business Chair',
    },
  ],
]

const projectLeadRows: TeamMember[][] = [
  [
    {
      name: 'Luis (Tony) Mendoza',
      role: 'Skyscout System Integration Lead',
      image: '/assets/team/luis-tony-mendoza.png',
    },
    {
      name: 'Parker Johnston',
      role: 'Research & Development PCB Design Lead',
      image: '/assets/team/parker-johnston.png',
    },
  ],
  [
    {
      name: 'Isaac Perez-Aguineca',
      role: 'Condor Project Lead',
      image: '/assets/team/isaac-perez-aguineca.png',
      imagePosition: 'top',
    },
    {
      name: 'Jacob Ismael',
      role: 'Research & Development Firmware Lead',
      image: '/assets/team/jacob-ismael.png',
      imagePosition: 'top',
    },
  ],
]

function MemberCard({ member }: { member: TeamMember }) {
  return (
    <article className="member-card">
      <div
        className={`member-card__portrait${member.image ? '' : ' member-card__portrait--placeholder'}`}
        role={member.image ? undefined : 'img'}
        aria-label={member.image ? undefined : `Portrait unavailable for ${member.name}`}
      >
        {member.image ? (
          <img
            src={member.image}
            alt={`${member.name}, ${member.role}`}
            style={{ objectPosition: member.imagePosition === 'top' ? 'center top' : 'center' }}
          />
        ) : null}
      </div>
      <h3>{member.name}</h3>
      <p>{member.role}</p>
    </article>
  )
}

function TeamSection({ title, rows }: { title: string; rows: TeamMember[][] }) {
  return (
    <section className="team-group">
      <h2>{title}</h2>
      <div className="team-group__rows">
        {rows.map((row, rowIndex) => (
          <div className="team-group__row" key={`${title}-${rowIndex}`}>
            {row.map((member) => <MemberCard member={member} key={member.name} />)}
          </div>
        ))}
      </div>
    </section>
  )
}

export default function TeamPage() {
  return (
    <main className="page team-page">
      <div className="page__inner team-page__inner">
        <header className="team-intro">
          <p className="team-intro__eyebrow">Our Team</p>
          <h1>THE PEOPLE BEHIND SB AERO.</h1>
          <p className="team-intro__subtitle">The 26-27 Team</p>
        </header>

        <div className="team-roster">
          <TeamSection title="Executive Officers" rows={executiveRows} />
          <TeamSection title="Chairs" rows={chairRows} />
          <TeamSection title="Project Leads" rows={projectLeadRows} />
        </div>
      </div>
    </main>
  )
}
