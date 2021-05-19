/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Paper } from '@material-ui/core'
import { Grid } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import FormDialog from './form-dialog'
import * as React from 'react'

const EventList = ({ events, book }) => {
  return (
    <React.Fragment>
      {events.map(event => (
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
                  <FormDialog onSubmit={book} />
                </Grid>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">$19.00</Typography>
                <Typography variant="subtitle2">{event.id}</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      ))}
    </React.Fragment>
  )
}

const TimeGrid = props => {
  return (
    <Grid spacing={3} container>
      <EventList {...props} />
    </Grid>
  )
}

export default TimeGrid
