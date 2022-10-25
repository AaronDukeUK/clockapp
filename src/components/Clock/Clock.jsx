import sun from "../../assets/desktop/icon-sun.svg"

const Clock = ({
  worldTimeAPI,
  showMore,
  handleClick,
  hours,
  minutes,
  timeOfDay,
}) => {
  return (
    <main className="clock">
      <div>
        <div className="clock__lead">
          <img src={sun} alt="sun" />
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
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="16" cy="16" r="16" />
          <path
            d={
              showMore
                ? "M11.2 13.6001L16 18.4001L20.8 13.6001"
                : "M11.2 18.3999L16 13.5999L20.8 18.3999"
            }
            stroke="white"
            strokeWidth="2"
          />
        </svg>
      </button>
    </main>
  )
}

export default Clock
