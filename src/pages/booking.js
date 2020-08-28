/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useState } from 'react'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import Layout from '../components/layout'
import TimeGrid from '../components/time-grid'
import Grid from '@material-ui/core/Grid'
import { Paper } from '@material-ui/core'
import useEvents from '../hooks/useEvents'
import { DatePicker } from '@material-ui/pickers'

const Booking = () => {
  const [date, setDate] = useState(new Date())
  const { filteredEvents, hasError, loading, filterEvents } = useEvents()

  function onChangeDate(d) {
    const calendarDate = d.toISOString()
    setDate(calendarDate)
    return filterEvents(calendarDate)
  }

  if (hasError) {
    return <h1>HAS ERROR!!!!</h1>
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Layout>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Paper sx={{ width: 350 }}>
              <DatePicker
                autoOk
                variant="static"
                openTo="date"
                value={date}
                onChange={onChangeDate}
              />
            </Paper>
          </Grid>

          <Grid item xs={12} sm={8}>
            {loading ? <h1>Loading!</h1> : <TimeGrid events={filteredEvents} />}
          </Grid>
        </Grid>
      </Layout>
    </MuiPickersUtilsProvider>
  )
}

export default Booking
