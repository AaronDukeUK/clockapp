import React from "react"

const Extra = ({ worldTimeAPI }) => {
  return (
    <div className="extra">
      <div className="extra__group">
        <h6>Current Timezone</h6>
        <h2>{worldTimeAPI.timezone}</h2>
      </div>
      <div className="extra__group">
        <h6>Day of the Year</h6>
        <h2>{worldTimeAPI.day_of_year}</h2>
      </div>

      <div className="extra__group">
        <h6>Day of the Week</h6>
        <h2>{worldTimeAPI.day_of_week}</h2>
      </div>
      <div className="extra__group">
        <h6>Week Number</h6>
        <h2>{worldTimeAPI.week_number}</h2>
      </div>
    </div>
  )
}

export default Extra
