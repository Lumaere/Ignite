import requests
import random
import time

summId = 521955
for x in range(0,9):
    url = "https://na.api.pvp.net/api/lol/na/v1.4/summoner/"+str(summId)+"?api_key=184d689a-f9d9-4f1f-b178-e688e5348e15"
    response = requests.get(url)
    lat = random.randrange(32,40)
    long = random.randrange(-120,-80)
    summoner = response.json()
    summoner["location"] = (lat, long)
    print (summoner)
    summId+=1
    time.sleep(2)
