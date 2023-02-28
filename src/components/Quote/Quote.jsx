import { useEffect, useState } from "react"
import refresh from "../../assets/desktop/icon-refresh.svg"

const Quote = ({ showMore }) => {
  // Use an empty array as the initial value for quote
  const [quote, setQuote] = useState([])

  // Add state for the current quote number
  const [quoteNumber, setQuoteNumber] = useState(0)

  const QUOTE_URL = "https://type.fit/api/quotes"

  // Create a function to fetch a quote from the API
  const getQuote = async (url) => {
    const response = await fetch(url)
    const data = await response.json()
    setQuote(data)
  }

  // Fetch a quote when the component mounts and whenever the QUOTE_URL changes
  useEffect(() => {
    getQuote(QUOTE_URL)
  }, [QUOTE_URL])

  // Create a click handler for the refresh button
  const handleClick = () => {
    // Set the quote number to a random value between 0 and the length of the quote array
    setQuoteNumber(Math.floor(Math.random() * quote.length))
  }

  // Render the quote if it exists
  if (quote[quoteNumber] && !showMore) {
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

  // Return null if the quote doesn't exist yet
  return null
}

export default Quote
