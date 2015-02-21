import sys
from socket import socket
import json

if sys.argv[1] == 'msg':
    j = json.dumps({'v':sys.argv[2]})
    s = socket()
    s.connect(('0.0.0.0', 18920))
    s.send(j)

elif sys.argv[1] == 'stream':
    f = open('py_output.log', 'a')
    f.write(sys.argv[2]+'\n')
    f.close()
