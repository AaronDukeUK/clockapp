import { useState, useEffect, useCallback } from "react"

import "./sass/main.scss"

import { Clock, Quote, Extra } from "./components"

import day from "./assets/desktop/bg-image-day.jpg"
import afternoon from "./assets/desktop/bg-image-afternoon.jpg"
import night from "./assets/desktop/bg-image-night.jpg"

function App() {
  const [showMore, setShowMore] = useState(false)
  const [worldTimeAPI, setWorldTimeAPI] = useState([])
  const [timeOfDay, setTimeOfDay] = useState()
  const [hours, setHours] = useState()
  const [minutes, setMinutes] = useState()
  const [styles, setStyles] = useState({})

  const TIME_URL = "https://worldtimeapi.org/api/ip"
  const linearGrad = "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))"

  const getTimeAPI = async (url) => {
    const response = await fetch(url)
    const data = await response.json()
    setWorldTimeAPI(data)
  }

  console.log(hours)

  const getTimeOfDay = useCallback(() => {
    let timeOfDay
    if (hours >= 6 && hours < 12) {
      timeOfDay = "morning"
    } else if (hours >= 12 && hours < 18) {
      timeOfDay = "afternoon"
    } else {
      timeOfDay = "evening"
    }
    setTimeOfDay(timeOfDay)
  }, [hours])

  const getStyles = useCallback(() => {
    if (hours >= 7 && hours < 17) {
      setStyles({
        backgroundImage: `${linearGrad}, url(${day})`,
      })
    } else if (hours >= 17 && hours < 20) {
      setStyles({
        backgroundImage: `${linearGrad}, url(${afternoon})`,
      })
    } else if (hours >= 0 && hours < 7) {
      setStyles({
        backgroundImage: `${linearGrad}, url(${night})`,
      })
    } else {
      setStyles({
        backgroundImage: `${linearGrad}`,
      })
    }
  }, [hours, linearGrad])

  const handleClick = () => {
    const quote = document.querySelector(".quote")

    if (showMore) {
      setShowMore(false)
      quote.classList.remove("quote--hide")
    }
    if (!showMore) {
      setShowMore(true)
      quote.classList.add("quote--hide")
    }
  }

  useEffect(() => {
    const fetchTime = async () => {
      await getTimeAPI(TIME_URL)
      getTimeOfDay()
      getStyles()
    }

    fetchTime()

    const interval = setInterval(() => {
      const date = new Date()
      setHours(date.getHours())
      setMinutes(date.getMinutes())
    }, 1000)

    return () => clearInterval(interval)
  }, [getStyles, getTimeOfDay])

  console.log(timeOfDay, styles, worldTimeAPI)

  if (timeOfDay && styles && worldTimeAPI) {
    return (
      <div className="App" style={styles}>
        <div
          className={
            showMore
              ? "App__container App__container--showMore"
              : "App__container"
          }
        >
          <Quote showMore={showMore} />
          {worldTimeAPI.length !== 0 && hours !== undefined && (
            <Clock
              showMore={showMore}
              worldTimeAPI={worldTimeAPI}
              handleClick={handleClick}
              hours={hours}
              minutes={minutes}
              timeOfDay={timeOfDay}
            />
          )}
        </div>
        {showMore && <Extra worldTimeAPI={worldTimeAPI} />}
      </div>
    )
  }

  return (
    <div className="loading">
      <h3>AARON DUKE</h3>
      <div className="spinner"></div>
    </div>
  )
}

export default App
