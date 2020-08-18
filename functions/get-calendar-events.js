require('dotenv').config()
const axions = require('axios')

exports.handler = async () => {
  try {
    const result = await axions({
      url: `https://www.googleapis.com/calendar/v3/calendars/${process.env.CALENDAR_EMAIL}/events`,
      method: 'GET',
      headers: {
        Authorization: `Bearer `,
      },
    })
    console.log('result', result.data.items)
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
