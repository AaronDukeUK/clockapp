import { useState, useEffect, useCallback } from "react"
import "./sass/main.scss"
import { Clock, Quote, Extra } from "./components"
import day from "./assets/desktop/bg-image-day.jpg"
import afternoon from "./assets/desktop/bg-image-afternoon.jpg"
import night from "./assets/desktop/bg-image-night.jpg"

const TIME_URL = "https://worldtimeapi.org/api/ip"
const linearGrad = "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))"

function App() {
  // State variables
  const [showMore, setShowMore] = useState(false)
  const [worldTimeAPI, setWorldTimeAPI] = useState({})
  const [timeOfDay, setTimeOfDay] = useState("")
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [styles, setStyles] = useState({})

  // Fetch world time API data
  const fetchWorldTimeAPI = useCallback(async () => {
    try {
      const response = await fetch(TIME_URL)
      const data = await response.json()
      setWorldTimeAPI(data)
    } catch (error) {
      console.error("Error fetching world time API data:", error)
    }
  }, [])

  // Update time of day based on hours state variable
  const updateTimeOfDay = useCallback(() => {
    if (hours >= 6 && hours < 12) {
      setTimeOfDay("morning")
    } else if (hours >= 12 && hours < 18) {
      setTimeOfDay("afternoon")
    } else {
      setTimeOfDay("evening")
    }
  }, [hours])

  // Update background styles based on time of day and hours state variable
  const updateBackgroundStyles = useCallback(() => {
    let backgroundImageUrl
    if (hours >= 7 && hours < 17) {
      backgroundImageUrl = day
    } else if (hours >= 17 && hours < 20) {
      backgroundImageUrl = afternoon
    } else if (hours >= 0 && hours < 7) {
      backgroundImageUrl = night
    } else {
      backgroundImageUrl = ""
    }
    setStyles({
      backgroundImage: `${linearGrad}, url(${backgroundImageUrl})`,
    })
  }, [hours])

  // Handle click event for "show more" button
  const handleShowMoreClick = () => {
    setShowMore(!showMore)
  }

  // Update hours and minutes state variables every second
  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date()
      setHours(date.getHours())
      setMinutes(date.getMinutes())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  // Fetch world time API data and update time of day and background styles
  useEffect(() => {
    fetchWorldTimeAPI()
  }, [fetchWorldTimeAPI])

  useEffect(() => {
    updateTimeOfDay()
    updateBackgroundStyles()
  }, [updateTimeOfDay, updateBackgroundStyles])

  // Render loading screen if necessary data has not loaded yet
  if (
    !timeOfDay ||
    !styles ||
    !worldTimeAPI ||
    document.readyState !== "complete"
  ) {
    return (
      <div className="loading">
        <h3>AARON DUKE</h3>
        <div className="spinner"></div>
      </div>
    )
  }

  // Render main app content
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
            handleClick={handleShowMoreClick}
            hours={hours}
            minutes={minutes}
            timeOfDay={timeOfDay}
          />
        )}
      </div>
      <Extra worldTimeAPI={worldTimeAPI} showmore={showMore} />
    </div>
  )
}

export default App
