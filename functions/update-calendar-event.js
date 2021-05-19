const axios = require('axios')

exports.handler = async event => {
  try {
    const body = JSON.parse(event.body)
    const { id } = body

    const result = await axios({
      url: `${process.env.API_URL}/api/get-access-token`,
      method: 'GET',
    }).then(({ data }) => {
      return axios({
        url: `https://www.googleapis.com/calendar/v3/calendars/${process.env.CALENDAR_EMAIL}/events/${id}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${data.access_token}`,
          'Content-Type': 'application/json',
        },
        data: body,
      })
    })

    axios({
      url: `${process.env.API_URL}/api/send-email-confirmation`,
      method: 'POST',
      data: result.data,
    })

    return {
      statusCode: 200,
      body: JSON.stringify(result.data),
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
