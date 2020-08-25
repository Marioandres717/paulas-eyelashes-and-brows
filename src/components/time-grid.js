/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Paper } from '@material-ui/core'
import { Grid } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'

const eventList = events => {
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
                Standard license
              </Typography>
              <Typography variant="body2" gutterBottom>
                Full resolution 1920x1080 • JPEG
              </Typography>
              <Typography variant="body2" color="textSecondary">
                ID: 1030114
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2" style={{ cursor: 'pointer' }}>
                Remove
              </Typography>
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
