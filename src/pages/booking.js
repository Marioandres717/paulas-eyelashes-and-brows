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
    state: { status },
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

    const res = await fetch('/api/update-event', {
      method: 'POST',
      body: JSON.stringify({
        event: e,
        emailInformation: {
          ...customer,
          subject: 'Lashes Appointment',
          text: `You have book an appointment with Paula for eye lashes, please confirm the email to reserve your appointment.\n${process.env.GATSBY_API_URL}/api/confirm-event?eventId=${e.id}`,
        },
      }),
    })

    return res
      .json()
      .then(event => {
        updateEvent(e)
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
            <TimeGrid
              events={filterEvents(date).filter(e => e.visibility === 'public')}
              book={bookAppointment}
            />
          )}
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  )
}

export default Booking
