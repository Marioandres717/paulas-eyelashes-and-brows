import React, { useReducer } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

const INITIAL_STATE = {
  name: '',
  email: '',
  status: 'IDLE',
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'updateFieldValue':
      return { ...state, [action.field]: action.value }

    case 'updateStatus':
      return { ...state, status: action.status }

    case 'reset':
    default:
      return INITIAL_STATE
  }
}

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false)
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  const setStatus = status => dispatch({ type: 'updateStatus', status })

  const updateFieldValue = field => event => {
    dispatch({
      type: 'updateFieldValue',
      field,
      value: event.target.value,
    })
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = () => {
    handleClose()
    props.onSubmit(props.event, { email: state.email, name: state.name })
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Book Appointment
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Book Appointment</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To book your appointment, please enter your email address here. We
            will send a confirmation email. The confirmation email will be valid
            for 30 minutes, so please make sure to click the confirmation email
            to reserve your appointment. Thank you
          </DialogContentText>
          <TextField
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            value={state.name}
            onChange={updateFieldValue('name')}
          />
          <TextField
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            value={state.email}
            onChange={updateFieldValue('email')}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Book
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
