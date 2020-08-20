const axios = require('axios')

exports.handler = async (event, context) => {
  try {
    const result = await axios({
      url: `${process.env.API_URL}/get-access-token`,
      method: 'GET',
    }).then(({ data }) => {
      return axios({
        url: `https://www.googleapis.com/calendar/v3/calendars/${process.env.CALENDAR_EMAIL}/events`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${data.access_token}`,
        },
      })
    })

    return {
      statusCode: 200,
      body: JSON.stringify({ events: result.data.items }),
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    }
  }
}
