import threading

filenames = [
'404_body.html',
'about_body.html',
'alerts_body.html',
'contact_body.html',
'docs_body.html',
'donate_body.html',
'faq_body.html',
'how-it-works_body.html',
'index_body.html',
'news_body.html',
'news_body.html',
'privacy-policy_body.html',
'resources_body.html',
'terms-of-use_body.html',
]

def update():
	threading.Timer(2.0, update).start()
	for fname in filenames:
		filename = "components/body/" + fname
		result = fname.replace("_body","")
		with open(result, 'w') as outfile:
			with open('components/header.html') as infile:
				for line in infile:
					outfile.write(line)
			with open(filename) as infile:
				for line in infile:
					outfile.write(line)
			with open('components/footer.html') as infile:
				for line in infile:
					outfile.write(line)


print("Script Initiated")
update()