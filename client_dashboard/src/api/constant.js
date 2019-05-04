//TODO: use env variable
const SERVICE_PORT = '7000'
const SERVICE_HOST = 'http://localhost'
const HOST = `${SERVICE_HOST}:${SERVICE_PORT}`

export const LOGIN_URL = `${HOST}/api/v1/auth/login`
export const REGISTER_URL = `${HOST}/api/v1/auth/register`


/**
 * Company endpoint
 */
export const COMPANY_SUBSCRIBERS_URL = `${HOST}/api/v1/company/subscriber`


/**
 * Message endpoint
 */
export const MESSAGE_SEND_MESSAGE_URL = `${HOST}/api/v1/message`