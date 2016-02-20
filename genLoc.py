import requests
import random
import time
import json

def attachLocation(summoner):
    lat = random.randrange(32,40)
    long = random.randrange(-120,-80)
    summoner["location"] = (lat, long)

def attachRanking(summoner):
    pass

summId = 521955
for x in range(0, 399):
    url = "https://na.api.pvp.net/api/lol/na/v1.4/summoner/"+str(summId)+"?api_key=184d689a-f9d9-4f1f-b178-e688e5348e15"
    summoner = requests.get(url).json()
    attachLocation(summoner)
    attachRanking
    print (json.dumps(summoner))
    summId+=1
    time.sleep(0.1)
#no more than 500 req per 10m or 10 per 10s
