import { useState, useEffect } from "react"

import "./sass/main.scss"

import { Clock, Quote, Extra } from "./components"

import day from "./assets/desktop/bg-image-day.jpg"
import afternoon from "./assets/desktop/bg-image-afternoon.jpg"
import night from "./assets/desktop/bg-image-night.jpg"

function App() {
  const [showMore, setShowMore] = useState(false)
  const [worldTimeAPI, setWorldTimeAPI] = useState([])
  const [timeOfDay, setTimeOfDay] = useState("")
  const [hours, setHours] = useState()
  const [minutes, setMinutes] = useState()

  const TIME_URL = "https://worldtimeapi.org/api/ip"
  const linearGrad = "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))"

  const getTimeAPI = async (url) => {
    const response = await fetch(url)
    const data = await response.json()
    setWorldTimeAPI(data)
  }

  const getTimeOfDay = () => {
    if (hours >= 0 && hours < 12) {
      setTimeOfDay("morning")
    } else if (hours >= 12 && hours < 18) {
      setTimeOfDay("afternoon")
    } else {
      setTimeOfDay("evening")
    }
  }

  const getStyles = () => {
    console.log("styling")
    if (hours >= 7 && hours < 17) {
      return {
        backgroundImage: `${linearGrad}, url(${day})`,
      }
    } else if (hours >= 17 && hours < 20) {
      return {
        backgroundImage: `${linearGrad}, url(${afternoon})`,
      }
    } else if (hours >= 20 && hours < 7) {
      return {
        backgroundImage: `${linearGrad}, url(${night})`,
      }
    } else {
      return {
        backgroundImage: `${linearGrad}`,
      }
    }
  }

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
    getTimeAPI(TIME_URL)
    if (hours) {
      getTimeOfDay()
    }
    const getTime = setInterval(() => {
      const date = new Date()
      setHours(date.getHours())
      setMinutes(date.getMinutes())
    }, [1000])
    return () => {
      clearInterval(getTime)
    }
  }, [hours])

  return (
    <div className="App" style={getStyles()}>
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

export default App
