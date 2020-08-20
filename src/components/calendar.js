import React, { useEffect, useState } from 'react'
import Layout from '../components/layout'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

const Calendar = () => (
  <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" />
)

export default Calendar
