import React from 'react'
import Moment from 'react-moment'

const DateFormatter = ({ date }: any) => {
  // console.log('date:',date)
  return (
    <Moment format='MM-DD-YYYY' withTitle>
      {date}
    </Moment>
  )
}

export default DateFormatter
