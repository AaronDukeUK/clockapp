import { useEffect, useState } from "react"

import refresh from "../../assets/desktop/icon-refresh.svg"

const Quote = () => {
  const [quote, setQuote] = useState([])
  const [quoteNumber, setQuoteNumber] = useState(0)

  const QUOTE_URL = "https://type.fit/api/quotes"

  const getQuote = async (url) => {
    const response = await fetch(url)
    const data = await response.json()
    setQuote(data)
  }

  useEffect(() => {
    getQuote(QUOTE_URL)
  }, [QUOTE_URL])

  const handleClick = () => {
    setQuoteNumber(Math.floor(Math.random() * quote.length))
  }
  if (quote[quoteNumber]) {
    console.log(quote)
    return (
      <div className="quote">
        <div className="quote__container">
          <p className="quote__body">"{quote[quoteNumber].text}"</p>
          <h5 className="quote__author">{quote[quoteNumber].author}</h5>
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
}

export default Quote
