from socket import socket
import json

j = json.dumps({'v':'pypy msg'})

s = socket()
s.connect(('0.0.0.0', 18920))
s.send(j)