module.exports = function() {
  var storeKey = 'capi-creds';
  var credentials = {
    appId: null,
    clientId: null,
    clientSecret: null
  }

  try {
    stored_creds = JSON.parse(window.sessionStorage.getItem(storeKey));
    if (stored_creds) {
      credentials = stored_creds
    }
  } catch(e) {
    // No creds, this is fine.
  }

  this.get = function() {
    return credentials;
  }

  this.set = function(appId, clientId, clientSecret) {
    credentials.appId = appId;
    credentials.clientId = clientId;
    credentials.clientSecret = clientSecret;
    window.sessionStorage.setItem(storeKey, JSON.stringify(credentials))
  }

  return this
}
