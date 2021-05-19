const axios = require('axios')

exports.handler = async e => {
  try {
    const body = JSON.parse(e.body)
    const { event, emailInformation } = body

    const updatedEvent = await axios({
      url: `${process.env.GATSBY_API_URL}/api/get-access-token`,
      method: 'GET',
    }).then(({ data }) => {
      return axios({
        url: `https://www.googleapis.com/calendar/v3/calendars/${process.env.CALENDAR_EMAIL}/events/${event.id}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${data.access_token}`,
          'Content-Type': 'application/json',
        },
        data: event,
      })
    })

    if (emailInformation) {
      const emailSent = await axios({
        url: `${process.env.GATSBY_API_URL}/api/send-email`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: emailInformation,
      })

      return {
        statusCode: 200,
        body: JSON.stringify(emailSent.data),
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify(updatedEvent.data),
    }
  } catch (error) {
    return {
      statusCode: status,
      body: JSON.stringify(error),
    }
  }
}
