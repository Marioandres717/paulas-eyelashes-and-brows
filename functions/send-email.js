const mailgun = require('mailgun-js')
exports.handler = (event, _context, callback) => {
  const mg = mailgun({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  })

  const data = JSON.parse(event.body)
  const email = {
    from: `${process.env.COMPANY_NAME} <${process.env.CALENDAR_EMAIL}>`,
    to: `${data.name} <${data.email}>`,
    subject: data.subject,
    text: data.text,
  }

  mg.messages().send(email, (error, response) => {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(response),
    })
  })
}
