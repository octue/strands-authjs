import { getCSRFToken } from './django'

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/auth/api/browser/v1`

const ACCEPT_JSON = {
  accept: 'application/json',
}

export const AuthProcess = Object.freeze({
  LOGIN: 'login',
  CONNECT: 'connect',
})

export const Flows = Object.freeze({
  VERIFY_EMAIL: 'verify_email',
  LOGIN: 'login',
  LOGIN_BY_CODE: 'login_by_code',
  SIGNUP: 'signup',
  PROVIDER_REDIRECT: 'provider_redirect',
  PROVIDER_SIGNUP: 'provider_signup',
  MFA_AUTHENTICATE: 'mfa_authenticate',
  REAUTHENTICATE: 'reauthenticate',
  MFA_REAUTHENTICATE: 'mfa_reauthenticate',
})

export const URLs = Object.freeze({
  // Meta
  CONFIG: BASE_URL + '/config',

  // Account management
  CHANGE_PASSWORD: BASE_URL + '/account/password/change',
  EMAIL: BASE_URL + '/account/email',
  PROVIDERS: BASE_URL + '/account/providers',

  // Account management: 2FA
  AUTHENTICATORS: BASE_URL + '/account/authenticators',
  RECOVERY_CODES: BASE_URL + '/account/authenticators/recovery-codes',
  TOTP_AUTHENTICATOR: BASE_URL + '/account/authenticators/totp',

  // Auth: Basics
  LOGIN: BASE_URL + '/auth/login',
  REQUEST_LOGIN_CODE: BASE_URL + '/auth/code/request',
  CONFIRM_LOGIN_CODE: BASE_URL + '/auth/code/confirm',
  SESSION: BASE_URL + '/auth/session',
  REAUTHENTICATE: BASE_URL + '/auth/reauthenticate',
  REQUEST_PASSWORD_RESET: BASE_URL + '/auth/password/request',
  RESET_PASSWORD: BASE_URL + '/auth/password/reset',
  SIGNUP: BASE_URL + '/auth/signup',
  VERIFY_EMAIL: BASE_URL + '/auth/email/verify',

  // Auth: 2FA
  MFA_AUTHENTICATE: BASE_URL + '/auth/2fa/authenticate',
  MFA_REAUTHENTICATE: BASE_URL + '/auth/2fa/reauthenticate',

  // Auth: Social
  PROVIDER_SIGNUP: BASE_URL + '/auth/provider/signup',
  REDIRECT_TO_PROVIDER: BASE_URL + '/auth/provider/redirect',
  PROVIDER_TOKEN: BASE_URL + '/auth/provider/token',

  // Auth: Sessions
  SESSIONS: BASE_URL + '/auth/sessions',
})

export const AuthenticatorType = Object.freeze({
  TOTP: 'totp',
  RECOVERY_CODES: 'recovery_codes',
})

function postForm(action, data) {
  const f = document.createElement('form')
  f.method = 'POST'
  f.action = action

  for (const key in data) {
    const d = document.createElement('input')
    d.type = 'hidden'
    d.name = key
    d.value = data[key]
    f.appendChild(d)
  }
  document.body.appendChild(f)
  f.submit()
}

async function request(method, path, data, headers) {
  const options = {
    method,
    // Don't pass authentication related headers to the config endpoint.
    credentials: path !== URLs.CONFIG ? 'include' : 'omit',
    // TODO Include csrftoken
    headers: {
      ...ACCEPT_JSON,
      ...headers,
    },
  }

  if (typeof data !== 'undefined') {
    options.body = JSON.stringify(data)
    options.headers['Content-Type'] = 'application/json'
  }
  const resp = await fetch(path, options)
  const msg = await resp.json()

  if (
    [401, 410].includes(msg.status) ||
    (msg.status === 200 && msg.meta?.is_authenticated)
  ) {
    const event = new CustomEvent('allauth.auth.change', { detail: msg })
    document.dispatchEvent(event)
  }
  return msg
}

export async function login(data) {
  return await request('POST', URLs.LOGIN, data)
}

export async function reauthenticate(data) {
  return await request('POST', URLs.REAUTHENTICATE, data)
}

export async function logout() {
  return await request('DELETE', URLs.SESSION)
}

export async function signUp(data) {
  return await request('POST', URLs.SIGNUP, data)
}

export async function providerSignup(data) {
  return await request('POST', URLs.PROVIDER_SIGNUP, data)
}

export async function getProviderAccounts() {
  return await request('GET', URLs.PROVIDERS)
}

export async function disconnectProviderAccount(providerId, accountUid) {
  return await request('DELETE', URLs.PROVIDERS, {
    provider: providerId,
    account: accountUid,
  })
}

export async function requestPasswordReset(email) {
  return await request('POST', URLs.REQUEST_PASSWORD_RESET, { email })
}

export async function requestLoginCode(email) {
  return await request('POST', URLs.REQUEST_LOGIN_CODE, { email })
}

export async function confirmLoginCode(code) {
  return await request('POST', URLs.CONFIRM_LOGIN_CODE, { code })
}

export async function getEmailVerification(key) {
  return await request('GET', URLs.VERIFY_EMAIL, undefined, {
    'X-Email-Verification-Key': key,
  })
}

export async function getEmailAddresses() {
  return await request('GET', URLs.EMAIL)
}
export async function getSessions() {
  return await request('GET', URLs.SESSIONS)
}

export async function endSessions(ids) {
  return await request('DELETE', URLs.SESSIONS, { sessions: ids })
}

export async function getAuthenticators() {
  return await request('GET', URLs.AUTHENTICATORS)
}

export async function getTOTPAuthenticator() {
  return await request('GET', URLs.TOTP_AUTHENTICATOR)
}

export async function mfaAuthenticate(code) {
  return await request('POST', URLs.MFA_AUTHENTICATE, { code })
}

export async function mfaReauthenticate(code) {
  return await request('POST', URLs.MFA_REAUTHENTICATE, { code })
}

export async function activateTOTPAuthenticator(code) {
  return await request('POST', URLs.TOTP_AUTHENTICATOR, { code })
}

export async function deactivateTOTPAuthenticator() {
  return await request('DELETE', URLs.TOTP_AUTHENTICATOR)
}

export async function getRecoveryCodes() {
  return await request('GET', URLs.RECOVERY_CODES)
}

export async function generateRecoveryCodes() {
  return await request('POST', URLs.RECOVERY_CODES)
}

export async function getConfig() {
  return await request('GET', URLs.CONFIG)
}

export async function addEmail(email) {
  return await request('POST', URLs.EMAIL, { email })
}

export async function deleteEmail(email) {
  return await request('DELETE', URLs.EMAIL, { email })
}

export async function markEmailAsPrimary(email) {
  return await request('PATCH', URLs.EMAIL, { email, primary: true })
}

export async function requestEmailVerification(email) {
  return await request('PUT', URLs.EMAIL, { email })
}

export async function verifyEmail(key) {
  return await request('POST', URLs.VERIFY_EMAIL, { key })
}

export async function getPasswordReset(key) {
  return await request('GET', URLs.RESET_PASSWORD, undefined, {
    'X-Password-Reset-Key': key,
  })
}

export async function resetPassword(password, key) {
  return await request(
    'POST',
    URLs.RESET_PASSWORD,
    { password, key },
    {
      'X-Password-Reset-Key': key,
    }
  )
}

export async function changePassword(data) {
  return await request('POST', URLs.CHANGE_PASSWORD, data)
}

export async function getAuth() {
  return await request('GET', URLs.SESSION)
}

export async function authenticateByToken(
  providerId,
  token,
  process = AuthProcess.LOGIN
) {
  return await request('POST', URLs.PROVIDER_TOKEN, {
    provider: providerId,
    token,
    process,
  })
}

export function redirectToProvider(
  providerId,
  callbackURL,
  process = AuthProcess.LOGIN
) {
  postForm(URLs.REDIRECT_TO_PROVIDER, {
    provider: providerId,
    process,
    callback_url: callbackURL,
    csrfmiddlewaretoken: getCSRFToken(),
  })
}
