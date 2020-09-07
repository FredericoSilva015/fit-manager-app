import { useState, useEffect } from 'react';
import trackingDisplayStyles from './styles.module.scss'

export default function TrackingDisplay({ results }) {
    let [bg, setBg] = useState('')

    useEffect(() => {
      setBackground(results, setBg)
    })

    return (
        <div className={`${bg} ${trackingDisplayStyles.tracking__display}`}>
            <h2 className={trackingDisplayStyles.tracker__mainValue}>{results.total}</h2>
            <div className={trackingDisplayStyles.tracker__valueWrapper}>
                <p className={trackingDisplayStyles.tracker__value}>{results.target - results.variant}</p>
                <p className={trackingDisplayStyles.tracker__value}>{results.target}</p>
                <p className={trackingDisplayStyles.tracker__value}>{results.target + results.variant}</p>
            </div>
            <h3 className={trackingDisplayStyles.tracker__label}>{results.label}</h3>
        </div>
    )
}

export function setBackground( results, setBg) {
    const min = results.target - results.variant
    const max = results.target + results.variant
    const inBetween = results.total >= min && results.total <= max
    const lesser = results.total < min

    if( inBetween ) {
      setBg(trackingDisplayStyles.tracking__display__default);
    } else if ( lesser ){
      setBg(trackingDisplayStyles.tracking__display__green);
    } else {
      setBg(trackingDisplayStyles.tracking__display__red)
    }
}