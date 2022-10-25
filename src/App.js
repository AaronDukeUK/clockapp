import { useState, useEffect } from "react"

import "./sass/main.scss"

import { Clock, Quote } from "./components"

function App() {
  const [showMore, setShowMore] = useState(false)
  const [worldTimeAPI, setWorldTimeAPI] = useState([])
  const TIME_URL = "https://worldtimeapi.org/api/ip"

  const getTimeAPI = async (url) => {
    const response = await fetch(url)
    const data = await response.json()
    setWorldTimeAPI(data)
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
  }, [])

  return (
    <div className="App">
      <div
        className={
          showMore
            ? "App__container App__container--showMore"
            : "App__container"
        }
      >
        <Quote showMore={showMore} />
        <Clock showMore={showMore} worldTimeAPI={worldTimeAPI}>
          {showMore ? (
            <button className="clock__button" onClick={() => handleClick()}>
              LESS
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="20" cy="20" r="20" class="circle" />
                <path d="M14 17L20 23L26 17" stroke="white" stroke-width="2" />
              </svg>
            </button>
          ) : (
            <button className="clock__button" onClick={() => handleClick()}>
              MORE
              <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
                <g fill="none" fill-rule="evenodd">
                  <circle cx="20" cy="20" r="20" />
                  <path stroke="#FFF" stroke-width="2" d="M14 23l6-6 6 6" />
                </g>
              </svg>
            </button>
          )}
        </Clock>
      </div>
      {showMore && (
        <div className="extra">
          <div className="extra__container">
            <div>
              <h6>Current Timezone</h6>
              <h2>{worldTimeAPI.timezone}</h2>
            </div>
            <div>
              <h6>Day of the Year</h6>
              <h2>{worldTimeAPI.day_of_year}</h2>
            </div>
          </div>
          <div className="extra__container">
            <div>
              <h6>Day of the Week</h6>
              <h2>{worldTimeAPI.day_of_week}</h2>
            </div>
            <div>
              <h6>Week Number</h6>
              <h2>{worldTimeAPI.week_number}</h2>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
