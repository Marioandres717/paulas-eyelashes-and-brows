import { useState, useEffect } from 'react'

function useEvents() {
  const [data, setData] = useState([])
  const [filteredEvents, setFilteredEvents] = useState([])
  const [loading, setLoading] = useState(false)
  const [hasError, setErrors] = useState(false)

  async function fetchEvents() {
    setLoading(true)
    const res = await fetch('/api/get-calendar-events')
    res
      .json()
      .then(res => {
        setData(res)
        setFilteredEvents(res)
        setLoading(false)
      })
      .catch(err => setErrors(err))
  }

  function filterEvents(date = new Date().toISOString()) {
    if (data.length <= 0) {
      return []
    }

    const filtered = data.filter(
      event => new Date(event.start.dateTime) >= new Date(date)
    )

    setFilteredEvents(filtered)
    return filtered
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
  }
}

export default useEvents
