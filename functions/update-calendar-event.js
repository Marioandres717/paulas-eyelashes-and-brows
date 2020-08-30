const axios = require('axios')
const SEND_NOTIFICATIONS = true
exports.handler = async event => {
  try {
    const { id, start, end, visibility } = JSON.parse(event.body)

    const result = await axios({
      url: `${process.env.API_URL}/get-access-token`,
      method: 'GET',
    }).then(({ data }) => {
      return axios({
        url: `https://www.googleapis.com/calendar/v3/calendars/${process.env.CALENDAR_EMAIL}/events/${id}?sendNotifications=${SEND_NOTIFICATIONS}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${data.access_token}`,
        },
        body: { start, end, visibility },
      })
    })

    return {
      statusCode: 200,
      body: JSON.stringify(result.data.items),
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    }
  }
}
