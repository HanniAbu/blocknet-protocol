// http://107.170.169.56:8888/api/v1.0/snode
{
  "BlockCount": 93949, 
  "NetworkDifficulty": "9670.50139150", 
  "NetworkHash": "594886881934", 
  "ServiceNodeTotal": 310
}


// Not Using
// https://www.cryptocompare.com/api/data/coinsnapshotfullbyid/?id=5305
{
	"Response":"Success",
	"Message":"Coin full snapshot successfully returned",
	"Data":{
		"General":{
			"Symbol":"BLOCK",
			"Name":"BlockNet",
			"Algorithm":[], //????
			"ProofType":"PoW/PoS",
			"StartDate":"20/10/2014",
		},
	},
	"Type":100
}

// https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BLOCK&tsyms=BTC,USD,EUR,KRW,AUD,BRL,CAD,CHF,CNY,GBP,HKD,IDR,INR,JPY,MXN,RUB
{
	"DISPLAY":{
		"BLOCK":{
			"BTC":{
			},
			"USD":{
				"OPEN24HOUR":"$ 21.46",
				"HIGH24HOUR":"$ 25.25",
				"LOW24HOUR":"$ 20.69",
				"MKTCAP":"$ 112.01 M"
			}
		}
	}
}


// https://www.cryptocompare.com/api/data/socialstats/?id=5305
{
	"Data":{
		"CryptoCompare":{
			"Followers":122,
			"Points":3405,
			"Posts":"11",
			"Comments":"8",
			"PageViews":7665
		},
		"Twitter":{
			"followers":8271,
			"following":"491",
			"lists":238,
			"statuses":1388,
		}
	}
}


// https://www.reddit.com/r/theblocknet/about.json

{
  "data": {
    "display_name": "theblocknet",
    "active_user_count": 139,
    "accounts_active": 139,
    "subscribers": 654,
    "created": "Nov. 2014",
  }



// history....aggregate is num to group, limit is num of groupings
//  can use histominute, histohour, histoday
// https://min-api.cryptocompare.com/data/histohour?fsym=BLOCK&tsym=USD&limit=60&aggregate=3
// https://min-api.cryptocompare.com/data/histohour?fsym=BLOCK&tsym=BTC&limit=60&aggregate=3

// or simpler: http://coincap.io/history/BLOCK
{
	"Response":"Success",
	"Type":100,
	"Aggregated":true,
	"Data":[{
			"time":1507885200,
			"close":0.004003,
			"high":0.004097,
			"low":0.003999,
			"open":0.003999,
			"volumefrom":518.27,
			"volumeto":2.0707
		},{
			"time":1507896000,
			"close":0.004043,
			"high":0.004031,
			"low":0.004003,
			"open":0.004003,
			"volumefrom":45.82,
			"volumeto":0.1503
		}],
	"TimeTo":1507896000,
	"TimeFrom":1507885200,
	"FirstValueInArray":true,
	"ConversionType":{
		"type":"direct",
		"conversionSymbol":""
	}
}


// https://api.coinmarketcap.com/v1/ticker/blocknet/?convert=EUR
// BTC,USD,EUR,KRW,AUD,BRL,CAD,CHF,CNY,GBP,HKD,IDR,INR,JPY,MXN,RUB
[
  { 
    "price_usd": "22.4358", 
    "price_btc": "0.00401296", 
    "24h_volume_usd": "119875.0", 
    "market_cap_usd": "108569880.0", 
    "available_supply": "4839136.0", 
    "percent_change_1h": "0.71", 
    "percent_change_24h": "2.97", 
    "percent_change_7d": "-6.08",
  }
]


<a class="twitter-timeline" data-theme="light" data-link-color="#E81C4F" href="https://twitter.com/The_Blocknet">Tweets by The_Blocknet</a>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>


// https://github.com/BlocknetDX/BlockDX/graphs/contributors-data.json

[{
	"author":{
		"login":"thelazier",
		"avatar":"https://avatars1.githubusercontent.com/u/10759339?s=60&v=4"
	},
	"total":4,
	"weeks":[{
		"w":1251590400,"a":0,"d":0,"c":0
		},{
		"w":1252195200,"a":0,"d":0,"c":0
		......},
	{
	"author":{
		......

data to graph github commits
A = # of additions
B = # of deletions
C = # of commits



