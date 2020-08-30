/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Paper, Button } from '@material-ui/core'
import { Grid } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'

const eventList = events => {
  async function book(event) {
    const e = {
      ...event,
      attendees: [
        {
          email: 'huh@gmail.com',
        },
      ],
    }

    const res = await fetch('/api/update-calendar-event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(e),
    })
    res.json().then(res => {
      console.log('res', res)
    })
  }

  return events.map(event => (
    <Grid item xs={12} key={event.id}>
      <Paper
        sx={{
          margin: 'auto',
          cursor: 'pointer',
          '&:hover': {
            zIndex: 100,
          },
        }}
      >
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1">
                {event.summary}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {event.start.dateTime} - {event.end.dateTime}
              </Typography>
              <Typography variant="body2">{event.location}</Typography>
            </Grid>
            <Grid item>
              <Button
                sx={{ marginLeft: 'auto' }}
                variant="contained"
                color="primary"
                onClick={() => book(event)}
              >
                Book
              </Button>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">$19.00</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  ))
}

const TimeGrid = ({ events }) => {
  return (
    <Grid spacing={3} container>
      {eventList(events)}
    </Grid>
  )
}

export default TimeGrid
