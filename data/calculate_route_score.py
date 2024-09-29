import sys
import json
from safety_score import safety_score

def test_function (name):
    print(name + " hello")

# data = json.loads(sys.stdin.read())["data"]
# test_function(data)
print(sys.stdin.read())