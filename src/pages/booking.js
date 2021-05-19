/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useState, useEffect } from 'react'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import useEvents from '../hooks/useEvents'
import TimeGrid from '../components/time-grid'
import Grid from '@material-ui/core/Grid'
import { Paper } from '@material-ui/core'
import { DatePicker } from '@material-ui/pickers'

const Booking = () => {
  const [date, setDate] = useState(new Date())
  const {
    state: { events, status, error },
    fetchEvents,
    updateEvent,
    filterEvents,
  } = useEvents()

  useEffect(() => {
    async function fetch() {
      await fetchEvents()
    }
    fetch()
  }, [])

  const onChangeDate = d => setDate(d)

  const bookAppointment = async (event, customer) => {
    const e = {
      ...event,
      visibility: 'private',
      description: JSON.stringify(customer, null, 2),
      status: 'tentative',
    }

    const res = await fetch('/api/update-calendar-event', {
      method: 'POST',
      body: JSON.stringify(e),
    })

    return res
      .json()
      .then(event => {
        updateEvent(event)
      })
      .catch(err => console.error(err))
  }

  if (status === 'rejected') {
    throw new Error('Error Fetching Calendar Events')
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <h1>{status}</h1>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ width: 350 }}>
            <DatePicker
              autoOk
              variant="static"
              openTo="date"
              value={date}
              onChange={onChangeDate}
              disablePast={true}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} sm={8}>
          {status === 'pending' ? (
            <h1>Loading!</h1>
          ) : (
            <TimeGrid events={filterEvents(date)} book={bookAppointment} />
          )}
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  )
}

export default Booking
