const axios = require('axios')
const rs = require('jsrsasign')
const cred = require('../credentials.json')
const timestamp = require('./utils/current-date-to-unix-timestamp')

const signToken = () => {
  const oHeader = { alg: 'RS256', typ: 'JWT' }
  const oPayload = {
    iss: cred.client_email,
    scope: cred.scope,
    aud: cred.token_uri,
    exp: timestamp(3600),
    iat: timestamp(0),
  }
  const sHeader = JSON.stringify(oHeader)
  const sPayload = JSON.stringify(oPayload)
  const sSignature = cred.private_key

  return rs.jws.JWS.sign('RS256', sHeader, sPayload, sSignature)
}

exports.handler = async () => {
  try {
    const sJWS = signToken()
    const token = await axios({
      url: 'https://oauth2.googleapis.com/token',
      method: 'POST',
      ContentType: 'application/x-www-form-urlencoded',
      data: {
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: sJWS,
      },
    })

    return {
      statusCode: 200,
      body: JSON.stringify({ access_token: token.data.access_token }),
    }
  } catch (error) {
    const { response } = error
    const { request, ...errorObject } = response

    return {
      statusCode: 500,
      body: JSON.stringify(errorObject),
    }
  }
}
