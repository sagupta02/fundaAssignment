async function setGDPRCookies(context) {
  const cookies = [
    {
      name: 'euconsent-v2',
      value: process.env.GDPR_COOKIE_VALUE,
      domain: '.funda.nl',
      path: '/',
      expires: -1,
      httpOnly: false,
      secure: true,
    },
  ]
  await context.addCookies(cookies)
}

module.exports = { setGDPRCookies }
