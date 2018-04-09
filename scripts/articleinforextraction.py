import os
import csv

dataPath = "/Users/elaineschertz/Desktop/stego_dataset"
savePath = "/Users/elaineschertz/Desktop/"

classifier = '/Users/elaineschertz/stanford-ner/classifiers/english.conll.4class.distsim.crf.ser.gz'
jar = '/Users/elaineschertz/stanford-ner/stanford-ner.jar'

# saves name, title, article type, author and date for each txt file in articleInfo.csv	
def saveArticleInfo(text):
	type = "none"
	author = "none"
	title = "none"
	date = "none"
	for i, line in enumerate(text):
		if i == 0:
			if "FactSheet" in line or "Chart" in line: 
				type = "factsheet"
				title = line.strip().replace(',', '')
			elif "Advertisements" in line:
				type = "ad"
			elif "Obituaries" in line:
				type = "obituary"
			elif "Brief" in line:
				type = "brief"
			elif "Lucky Numbers" in line:
				type = "lucky numbers"
				title = line.strip()
			elif "Forum" in line:
				type = "forum"
			elif "Editorial" in line:
				type = "editorial"
			elif "Calendar" in line:
				type = "calendar"
				title = line.strip().replace(',', '')
			elif "Map" in line:
				type = "map"
				title = line.strip().replace(',', '')
			elif "Agenda" in line:
				type = "agenda"
				title = line.strip().replace(',', '')
			else:
				type = "article"
				title = line.strip().replace(',', '')
		elif i == 1:
			if "Story by" in line:
				authorLine = line.split(":")
				try:
					author = authorLine[1].strip().replace(',', '')
				except IndexError:
					authorLine = line.split(" ")
					author = authorLine[2].strip() + " " + authorLine[3].strip()
				
			elif "Date" in line:
				dateLine = line.split(":")
				date = dateLine[1].strip()
		elif i == 2:
			if "Date" in line:
				dateLine = line.split(":")
				date = dateLine[1].strip()
		elif i > 2:
			break
	#save information to a csv
	print filename+","+type +","+date+","+title+","+author

	f = open(savePath+'articleInfo.csv','a')
	f.write(filename+","+type +","+date+","+title+","+ author)
	f.write("\n")
	f.close()
