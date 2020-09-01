import { useState, useEffect } from 'react'
import justADate from '../utils/just-a-date'

function useEvents() {
  const [events, setEvents] = useState([])
  const [filteredEvents, setFilteredEvents] = useState([])
  const [loading, setLoading] = useState(false)
  const [hasError, setErrors] = useState(false)

  async function fetchEvents() {
    setLoading(true)
    const res = await fetch('/api/get-calendar-events')
    res
      .json()
      .then(res => {
        setEvents(res)
        setFilteredEvents(filterEvents())
        setLoading(false)
      })
      .catch(err => setErrors(err))
  }

  function filterEvents(date = new Date().toISOString()) {
    if (events.length <= 0) {
      return []
    }

    const filtered = events.filter(event => {
      const eventDate = justADate(event.start.dateTime).toISOString()
      const filterDate = justADate(date).toISOString()

      return eventDate === filterDate
    })

    setFilteredEvents(filtered)
    return filtered
  }

  function updateEvent(event) {
    const eventIndex = events.findIndex(e => e.id === event.id)
    const copyArr = [...events]
    copyArr[eventIndex] = event
    setEvents(copyArr)
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  return {
    filteredEvents,
    loading,
    hasError,
    fetchEvents,
    filterEvents,
    updateEvent,
  }
}

export default useEvents
