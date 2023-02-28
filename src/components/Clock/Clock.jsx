import { useState } from "react"

import sun from "../../assets/desktop/icon-sun.svg"
import moon from "../../assets/desktop/icon-moon.svg"

import arrowDownLg from "../../assets/desktop/arrow-down-lg.svg"
import arrowDown from "../../assets/desktop/arrow-down.svg"
import arrowUpLg from "../../assets/desktop/arrow-up-lg.svg"
import arrowUp from "../../assets/desktop/arrow-up.svg"

const Clock = ({
  worldTimeAPI,
  showMore,
  handleClick,
  hours,
  minutes,
  timeOfDay,
}) => {
  const [width, setWidth] = useState(window.innerWidth)

  const resizeWindow = () => {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth)
    })
  }

  resizeWindow()

  return (
    <main className="clock">
      <div>
        <div className="clock__lead">
          <img src={(hours < 4) | (hours > 18) ? moon : sun} alt="daylight" />
          <h4>{`Good ${timeOfDay}`}</h4>
        </div>

        <div className="clock__time">
          <div className="clock__main">
            <h1>{hours}</h1>
            <h1>:</h1>
            <h1>{minutes < 10 ? `0${minutes}` : minutes}</h1>
          </div>
          <span className="clock__timezone">{worldTimeAPI.abbreviation}</span>
        </div>

        <div className="clock__location">
          <h3>In London, UK</h3>
        </div>
      </div>
      <button className="clock__button" onClick={() => handleClick()}>
        {showMore ? "LESS" : "MORE"}
        {width >= 768 && (
          <img src={showMore ? arrowUpLg : arrowDownLg} alt="" />
        )}
        {width < 768 && <img src={showMore ? arrowUp : arrowDown} alt="" />}
      </button>
    </main>
  )
}

export default Clock
