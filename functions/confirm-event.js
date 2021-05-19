const axios = require('axios')
exports.handler = async (event, _context, callback) => {
  try {
    const {
      queryStringParameters: { eventId },
    } = event
    const {
      data: { access_token },
    } = await axios({
      url: `${process.env.GATSBY_API_URL}/api/get-access-token`,
      method: 'GET',
    })

    const { data } = await axios({
      url: `https://www.googleapis.com/calendar/v3/calendars/${process.env.CALENDAR_EMAIL}/events/${eventId}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })

    const changeEventStatusToConfirmed = await axios({
      url: `${process.env.GATSBY_API_URL}/api/update-event`,
      method: 'POST',
      headers: {
        'Content-Type': 'text/html',
      },
      data: JSON.stringify({
        event: { ...data, status: 'confirmed', visibility: 'private' },
      }),
    })

    const { id, description } = changeEventStatusToConfirmed.data
    const customer = JSON.parse(description)

    const emailSent = await axios({
      url: `${process.env.GATSBY_API_URL}/api/send-email`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        ...customer,
        subject: 'Lashes Appointment - Confirmed',
        text: `You have confirmed the appointment with Paula for eye lashes.\nIf you must cancel the appointment, please do so with more than 8 hours in advance.\nCancel Appointment: ${process.env.GATSBY_API_URL}/api/cancel-event?eventId=${id}`,
      },
    })

    return {
      statusCode: 200,
      body: JSON.stringify(emailSent.data),
    }
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify(e),
    }
  }
}
