from socket import socket
import json

j = json.dumps({'v':'asdf'})

s = socket()
s.connect(('0.0.0.0', 18920))
s.send(j)