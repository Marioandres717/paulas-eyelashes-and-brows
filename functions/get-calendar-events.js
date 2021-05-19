const axios = require('axios')
var formatRFC3339 = require('date-fns/formatRFC3339')

const MAX_RESULTS = 50

exports.handler = async () => {
  try {
    const result = await axios({
      url: `${process.env.GATSBY_API_URL}/api/get-access-token`,
      method: 'GET',
    }).then(({ data }) => {
      return axios({
        url: `https://www.googleapis.com/calendar/v3/calendars/${
          process.env.CALENDAR_EMAIL
        }/events?singleEvents=true&maxResults=${MAX_RESULTS}&orderBy=startTime&timeMin=${formatRFC3339(
          new Date()
        )}`,
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
    const { response } = error
    const { request, status, ...errorObject } = response

    return {
      statusCode: status,
      body: JSON.stringify(errorObject),
    }
  }
}
