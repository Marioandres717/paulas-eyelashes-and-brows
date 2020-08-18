const axios = require('axios')
const rs = require('jsrsasign')
const cred = require('../credentials.json')
const timestamp = require('./utils/current-date-to-unix-timestamp')

exports.handler = async () => {
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

  const sJWS = rs.jws.JWS.sign('RS256', sHeader, sPayload, sSignature)

  try {
    const token = await axios({
      url: cred.token_uri,
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
    console.log(errorObject)
    return {
      statusCode: 500,
      body: JSON.stringify(errorObject),
    }
  }
}
