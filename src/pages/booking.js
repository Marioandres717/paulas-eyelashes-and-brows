/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useEffect, useState } from 'react'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import Layout from '../components/layout'
import Calendar from '../components/calendar'

const Booking = () => {
  const [events, setEvents] = useState([])
  const [hasError, setErrors] = useState(false)

  async function fetchData() {
    const res = await fetch('/api/get-calendar-events')
    res
      .json()
      .then(res => setEvents(res))
      .catch(err => setErrors(err))
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Layout>
        <div sx={{ maxWidth: 300 }}>
          <Calendar />
        </div>
      </Layout>
    </MuiPickersUtilsProvider>
  )
}

export default Booking
