import requests, json # needs to be downloaded through "pip install requests"
import os.path
from colorama import init
from termcolor import colored

init()
red = "\033[31m"
green = "\033[32m"
yellow = "\033[33m"
reset = "\033[37m"

def start(functName):
    print("\t" + functName + " Initiated")
def end(indent):
    print(indent + "\tComplete")




def downloadIcons():
	start("\tdownloadIcons()")
	url = "https://api.coinmarketcap.com/v1/ticker/"
	print("\t\t\tQuerying CoinMarketCap...")
	response = requests.get(url, verify=True) #Verify is check SSL certificate

	if response.status_code != 200:
		print('Status:', response.status_code, 'Problem with the request. Exiting.')
		exit()
	assets = response.json()
	path = os.path.dirname(__file__) + location
	assetNameFile = "assetNames.json"
	assetTupleFile = "assetTuples.json"
	assetNames = []
	assetTuples = {}

	for asset in assets:
		assetNames.append(asset["name"])
		assetTuples[asset["name"]] = asset["id"]
	assetNames = sorted(assetNames, key=str.lower)

	
	with open( path + assetNameFile, 'w+') as outfile:
		print("\t\t\tCreated File: " + assetNameFile)
		json.dump(assetNames, outfile)


	with open( path + assetTupleFile, 'w+') as outfile:
		print("\t\t\tCreated File: " + assetTupleFile)
		json.dump(assetTuples, outfile)

	

	

	end("\t\t")
