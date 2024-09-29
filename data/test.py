import sys
import json

def test_function (name):
    print(name + " hello")

# data = json.loads(sys.stdin.read())["data"]
# test_function(data)
print(sys.stdin.read())