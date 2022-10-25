import { useEffect, useState } from "react"

import sun from "../../assets/desktop/icon-sun.svg"

const Clock = ({ children, worldTimeAPI }) => {
  const [hours, setHours] = useState()
  const [minutes, setMinutes] = useState()

  useEffect(() => {
    const getTime = setInterval(() => {
      const date = new Date()
      setHours(date.getHours())
      setMinutes(date.getMinutes())
    }, [1000])

    return () => {
      clearInterval(getTime)
    }
  }, [])

  if (worldTimeAPI.length !== 0 && hours !== undefined) {
    let timeOfDay
    console.log(worldTimeAPI)

    const getTimeOfDay = () => {
      if (hours >= 0 && hours < 12) {
        timeOfDay = "morning"
      } else if (hours >= 12 && hours < 18) {
        timeOfDay = "afternoon"
      } else {
        timeOfDay = "evening"
      }
    }

    getTimeOfDay()

    return (
      <main className="clock">
        <div>
          <div className="clock__lead">
            <img src={sun} alt="sun" />
            <h4>{`Good ${timeOfDay}, it's currently`}</h4>
          </div>

          <div className="clock__time">
            <h1>
              {hours}:{minutes < 10 ? "0" : ""}
              {minutes}
            </h1>
            <span className="clock__timezone">{worldTimeAPI.abbreviation}</span>
          </div>

          <div className="clock__location">
            <h3>In London, UK</h3>
          </div>
        </div>
        {children}
      </main>
    )
  }
}

export default Clock
