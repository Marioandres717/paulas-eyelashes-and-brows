import React, { useEffect, useState } from 'react'
import Layout from '../components/layout'

const Booking = () => {
  const [events, setEvents] = useState([])
  const [hasError, setErrors] = useState(false)

  async function fetchData() {
    const res = await fetch('/api/get-calendar-events')
    res
      .json()
      .then(res => setEvents(res))
      .catch(err => setErrors(err))
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Layout>
      <h1>Booking</h1>
      <pre>{JSON.stringify(events)}</pre>
    </Layout>
  )
}

export default Booking
