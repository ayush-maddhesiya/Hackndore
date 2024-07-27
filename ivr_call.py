import os
from twilio.rest import Client



account_sid = "AC4a1db79945870147d088190de0166bce"
auth_token = "aacc13d610b886ac198a6e801bccedea"
client = Client(account_sid, auth_token)

call = client.calls.create(
  url="http://demo.twilio.com/docs/voice.xml",
  to="+919343433379",
  from_="+18152491113"
)

print(call.sid)
