import requests
import json

url = "http://127.0.0.1:8000/api/storage_info_bulk/"  # replace with your actual API endpoint
headers = {"Content-Type": "application/json"}

data = [
    {"zone": 1, "row": 1, "column": 1, "mapid": "map_1", "level": 1, "product": 2, "lab": False, "lock": False},
    {"zone": 1, "row": 2, "column": 2, "mapid": "map_2", "level": 2, "product": 2, "lab": True, "lock": False},
    # ... more records
]

response = requests.post(url, headers=headers, data=json.dumps(data))

print(response.status_code)
print(response.json())
