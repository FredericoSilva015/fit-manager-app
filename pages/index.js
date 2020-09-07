import { useState } from 'react'
import Head from 'next/head'
import About from '../components/about/component'
import dayjs from 'dayjs'
import TrackingDisplay from '../components/trackingDisplay/component'
import ResultsForm from '../components/resultsForm/component'
import homeStyles from '../styles/home.module.scss'

export default function Home({ data }) {
  // let data = {
  //   calories: {
  //     label: "Calories",
  //     total: 1840,
  //     target: 1840,
  //     variant: 15
  //   },
  //   carbs: {
  //     label: "Carbs",
  //     total: 190,
  //     target: 160,
  //     variant: 15
  //   },
  //   fat: {
  //     label: "Fat",
  //     total: 55,
  //     target: 60,
  //     variant: 10
  //   },
  //   protein: {
  //     label: "Protein",
  //     total: 120,
  //     target: 165,
  //     variant: 10
  //   }
  // }

  const [results, setResults] = useState(data);

  const onChange = (e) => {
    const data = { ...results }

    let name = e.target.name
    let value = parseInt(e.target.value, 10)

    const resultType = name.split(" ")[0].toLowerCase()
    const resultMacro = name.split(" ")[1].toLowerCase()

    data[resultMacro][resultType] = value

    setResults(data);
  }

  async function getDataForDay(addDay) {
    let currentDate = dayjs(results.date);
    let newDate

    if(addDay) {
      newDate = currentDate.add(1, 'day').format('YYYY-MM-DDTHH:mm:ss')
    } else {
      newDate = currentDate.subtract(1, 'day').format('YYYY-MM-DDTHH:mm:ss')
    }

    const res = await fetch('http://localhost:3000/api/daily?date=' + newDate)
    const json = await res.json()

    setResults(json);
  }

  async function updateMacros() {
    const res = await fetch('http://localhost:3000/api/daily', {
      method: 'post',
      body: JSON.stringify(results)
    })
  }

  return (
    <div>
      <Head>
        <title>Fit Tracker Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <About />

      <div className="container">

      <div className={homeStyles.dayTracker__wrapper}>
          <button className={homeStyles.dayTracker__button} onClick={() => getDataForDay(false)}>Previous Day</button>
          <div className={homeStyles.dayTracker__date}>{dayjs(results.date).format('DD/MM/YYYY')}</div>
          <button className={homeStyles.dayTracker__button} onClick={() => getDataForDay(true)}>Next Day</button>
      </div>

      <div className={homeStyles.tracker__wrapper}>
        <TrackingDisplay results={results.calories} />
        <TrackingDisplay results={results.carbs}/>
        <TrackingDisplay results={results.fat}/>
        <TrackingDisplay results={results.protein}/>
      </div>

      <div className={homeStyles.form__wrapper}>
        <ResultsForm data={results} item='Total' onChange={onChange}/>
        <ResultsForm data={results} item='Target' onChange={onChange}/>
        <ResultsForm data={results} item='Variant' onChange={onChange}/>
      </div>

      <div className={homeStyles.button__wrapper}>
        <button className={homeStyles.save__button}  onClick={updateMacros}>Save</button>
      </div>

    </div>
  </div>
  )
}

export async function getStaticProps()  {
  const res = await fetch("http://localhost:3000/api/daily");
  const json = await res.json();
  return {
    props: {
      data: json,
    },
  };
}
