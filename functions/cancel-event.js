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

    const customer = JSON.parse(data.description)

    await axios({
      url: `${process.env.GATSBY_API_URL}/api/update-event`,
      method: 'POST',
      headers: {
        'Content-Type': 'text/html',
      },
      data: JSON.stringify({
        event: {
          ...data,
          visibility: 'public',
          description: '',
          status: 'tentative',
        },
      }),
    })

    const cancelEmailSent = await axios({
      url: `${process.env.GATSBY_API_URL}/api/send-email`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        ...customer,
        subject: 'Lashes Appointment - Canceled',
        text: `You have cancel your appointment with Paula.`,
      },
    })

    return {
      statusCode: 200,
      body: JSON.stringify(cancelEmailSent.data),
    }
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify(e.message),
    }
  }
}
