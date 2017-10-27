names = ["a","b","c","d","A","B","C","D"]
ids = ['1a','2b','3c','4d','5A','6B','7C','8D']
pair = dict(zip(names,ids))

if (len(names) == len(ids)):
	print("Name and ID Array Lengths Are Different")

# ids.sort(key=(dict(zip(ids,names)).get))
# names = sorted(names, key=str.lower)
# ids = sorted(ids, key=(pair.get))



# for k in sorted(pair, key=lambda k: k.lower()):
	# print(k)

#works good enough, not perfect though
# for i, j in sorted(pair.items(), key=lambda x: x[0].lower()): 
# 	print(i + ", " + j)
 
for i in sorted(pair, key=str.lower):
	print(i + ", " + pair[i])






print("names: " + str(names))
print("ids: " + str(ids))