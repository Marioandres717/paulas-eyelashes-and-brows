const axios = require('axios')
const MAX_RESULTS = 500

exports.handler = async (event, context) => {
  try {
    const result = await axios({
      url: `${process.env.API_URL}/get-access-token`,
      method: 'GET',
    }).then(({ data }) => {
      return axios({
        url: `https://www.googleapis.com/calendar/v3/calendars/${process.env.CALENDAR_EMAIL}/events?singleEvents=true&maxResults=${MAX_RESULTS}&orderBy=startTime`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${data.access_token}`,
        },
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
