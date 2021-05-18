import { useState } from 'react'
import justADate from '../utils/just-a-date'

function useEvents() {
  const [state, setState] = useState({
    events: [],
    status: 'idle',
    error: null,
  })

  async function fetchEvents() {
    setState({ status: 'pending' })
    const response = await fetch('/api/get-calendar-events')
    try {
      const events = await response.json()
      setState({
        events,
        status: 'resolved',
      })
    } catch (error) {
      setState({ status: 'rejected', error })
    }
  }

  function filterEvents(date = justADate(new Date()).toISOString()) {
    if (state.events.length <= 0) {
      return []
    }
    const filtered = state.events.filter(event => {
      const eventDate = justADate(event.start.dateTime).toISOString()
      const filterDate = justADate(date).toISOString()

      return eventDate === filterDate
    })

    return filtered
  }

  function updateEvent(event) {
    const eventIndex = state.events.findIndex(e => e.id === event.id)
    const copyArr = [...state.events]
    copyArr[eventIndex] = event
    setState({ events: copyArr })
  }

  return {
    state,
    fetchEvents,
    updateEvent,
    filterEvents,
  }
}

export default useEvents
