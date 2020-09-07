import Nav from '../nav/component.js'
import navStyles from './styles.module.scss'

export default function About() {
  return (
    <div>
      <Nav />

      <div className={`container ${navStyles.container}`}>
        <h1 className={navStyles.title}>Fit Track App!</h1>
        <p className={navStyles.description}>
          Lets start Exercising, i am picking my bike! ;)
        </p>
      </div>
  </div>
  )
}