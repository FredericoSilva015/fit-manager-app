import Link from 'next/link'
import navStyles from './styles.module.scss'

export default function Nav() {
  const data = [
    { href: 'https://nextjs.org', label: 'Next.js' },
    { href: 'https://www.mongodb.com/cloud/atlas', label: 'Free Atlas MongoDB' },
  ]

  const links = data.map(
    data => ({
      ...data,
      key: `nav-link-${data.href}-${data.label}`,
  }))

  return (
    <nav className={`${navStyles.nav} container--full-width`}>
      <ul className={navStyles.list}>
        <li>
          <Link href="/">
            <a className={navStyles.link}>Home</a>
          </Link>
        </li>
        {links.map(({ key, href, label }) => (
          <li key={key}>
            <a className={navStyles.link} href={href}>{label}</a>
          </li>
        ))}
      </ul>

    </nav>
  )
}