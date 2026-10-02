interface PageIntroProps {
  eyebrow: string
  title: string
  children?: React.ReactNode
  align?: 'left' | 'center'
}

export default function PageIntro({ eyebrow, title, children, align = 'center' }: PageIntroProps) {
  return (
    <section className={`page-intro page-intro--${align}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      {children}
    </section>
  )
}
