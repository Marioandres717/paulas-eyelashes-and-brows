/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useState } from 'react'
import { Calendar as C } from '@material-ui/pickers'

const Calendar = () => {
  const [date, changeDate] = useState(new Date())

  return <C disablePast={true} date={date} onChange={changeDate} />
}

export default Calendar
