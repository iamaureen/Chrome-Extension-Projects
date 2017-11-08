
from oauth2client.service_account import ServiceAccountCredentials
def _get_access_token():
  """Retrieve a valid access token that can be used to authorize requests.

  :return: Access token.
  """
  FCM_SCOPE = "https://www.googleapis.com/auth/firebase.messaging"
  credentials = ServiceAccountCredentials.from_json_keyfile_name(
      'E:/service-account.json', FCM_SCOPE)
  access_token_info = credentials.get_access_token()
  print(access_token_info.access_token)


def main():
    _get_access_token()

if __name__ == '__main__':
    main()
