import requests
import random
import time
import json

def attachLocation(summoner):
    lat = random.randrange(32,40)
    long = random.randrange(-120,-80)
    summoner["location"] = (lat, long)

#def attachRanking(summoner, summId):
    #entryUrl = "https://na.api.pvp.net/api/lol/na/v2.5/league/by-summoner/"+str(summId)+"/entry?api_key=184d689a-f9d9-4f1f-b178-e688e5348e15"
    #summoner["entry"] = requests.get(entryUrl).json()

pageNum = 1
for x in range(0,30):
    url = "http://www.lolking.net/leaderboards/285ca6feadf6357d815b0d05c66caf11/na/"+str(pageNum)+".json"
    page = requests.get(url).json()["data"]
    #print (json.dumps(page))
    for summoner in page:
        attachLocation(summoner)
        print(json.dumps(summoner))
    pageNum+=1
    time.sleep(1)
#no more than 500 req per 10m or 10 per 10s
