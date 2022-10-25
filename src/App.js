import { useState, useEffect } from "react"

import "./sass/main.scss"

import { Clock, Quote, Extra } from "./components"

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
        <Clock
          showMore={showMore}
          worldTimeAPI={worldTimeAPI}
          handleClick={handleClick}
        />
      </div>
      {showMore && <Extra worldTimeAPI={worldTimeAPI} />}
    </div>
  )
}

export default App
