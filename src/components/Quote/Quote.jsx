import { useEffect, useState } from "react"

import refresh from "../../assets/desktop/icon-refresh.svg"

const Quote = () => {
  const [quote, setQuote] = useState([])

  const QUOTE_URL = "https://programming-quotes-api.herokuapp.com/Quotes/random"

  const getQuote = async (url) => {
    const response = await fetch(url)
    const data = await response.json()
    setQuote(data)
  }

  useEffect(() => {
    getQuote(QUOTE_URL)
  }, [QUOTE_URL])

  const handleClick = () => {
    getQuote(QUOTE_URL)
  }

  return (
    <div className="quote">
      <div className="quote__container">
        <p className="quote__body">"{quote.en}"</p>
        <h5 className="quote__author">{quote.author}</h5>
      </div>
      <img
        className="quote__refresh"
        src={refresh}
        alt="refresh quote"
        onClick={handleClick}
      />
    </div>
  )
}

export default Quote
