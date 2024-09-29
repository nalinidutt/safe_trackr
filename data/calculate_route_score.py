import sys
import json
from safety_score import safety_score

def func():
    input_data = json.loads(sys.stdin.read())
    lat = input_data["lat"]
    long = input_data["lng"]
    time = input_data["time"]

    return safety_score(lat, long, time)

print(func())