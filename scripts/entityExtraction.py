import nltk
import os
import csv
import time
import sqlite3
from nltk import pos_tag
from nltk.tag import StanfordNERTagger
from nltk.tokenize import word_tokenize
from nltk.chunk import conlltags2tree
from nltk.tree import Tree

db = sqlite3.connect(':memory:')

dataPath = "/Users/elaineschertz/Desktop/stego_dataset"
savePath = "/Users/elaineschertz/Desktop/"

classifier = '/Users/elaineschertz/stanford-ner/classifiers/english.all.3class.distsim.crf.ser.gz'
jar = '/Users/elaineschertz/stanford-ner/stanford-ner.jar'

# Process text  
def process_text(filename):
	with open(dataPath+"/"+filename) as text:
		unarrayText = text.read().replace('\n', ' ')
		unarrayText = unicode(unarrayText, errors='ignore')
		token_text = word_tokenize(unarrayText)
	return token_text

# Stanford NER tagger    
def stanford_tagger(token_text):
	st = StanfordNERTagger(classifier,jar)   
	ne_tagged = st.tag(token_text)
	return(ne_tagged)

# Tag tokens with standard NLP BIO tags
def bio_tagger(ne_tagged):
		bio_tagged = []
		prev_tag = "O"
		for token, tag in ne_tagged:
			if tag == "O": #O
				bio_tagged.append((token, tag))
				prev_tag = tag
				continue
			if tag != "O" and prev_tag == "O": # Begin NE
				bio_tagged.append((token, "B-"+tag))
				prev_tag = tag
			elif prev_tag != "O" and prev_tag == tag: # Inside NE
				bio_tagged.append((token, "I-"+tag))
				prev_tag = tag
			elif prev_tag != "O" and prev_tag != tag: # Adjacent NE
				bio_tagged.append((token, "B-"+tag))
				prev_tag = tag
		return bio_tagged

# Create tree       
def stanford_tree(bio_tagged):
	tokens, ne_tags = zip(*bio_tagged)
	pos_tags = [pos for token, pos in pos_tag(tokens)]

	conlltags = [(token, pos, ne) for token, pos, ne in zip(tokens, pos_tags, ne_tags)]
	ne_tree = conlltags2tree(conlltags)
	return ne_tree

# Parse named entities from tree
def structure_ne(ne_tree):
	ne = []
	for subtree in ne_tree:
		if type(subtree) == Tree: # If subtree is a noun chunk, i.e. NE != "O"
			ne_label = subtree.label()
			ne_string = " ".join([token for token, pos in subtree.leaves()])
			ne.append((ne_string, ne_label))
	return ne

# Initiate database
def init_db(cur):
	    cur.execute('''CREATE TABLE entities (
	        Entity TEXT,
	        Type TEXT,
	        TotalAppearances INTEGER,
	        NumberIndivDocs INTEGER)''')

def stanford_main():
	cur = db.cursor()
	init_db(cur)
	cur.execute("insert into entities values (?,?,?,?)",("none","none",0,0,))
	db.commit()
	cur.close()

	entityDict = {}
	x=0
	for filename in os.listdir(dataPath):
		entityList = structure_ne(stanford_tree(bio_tagger(stanford_tagger(process_text(filename)))))
		# string_tuple_list = [tuple(map(str,eachTuple)) for eachTuple in entityList]
		# print string_tuple_list

		docEntityDict = {}

		cur = db.cursor()
		entityFoundInDoc = 0

		for i in entityList:
			if i[0] in docEntityDict: #incriment count of that entity in the list
				docEntityDict[i[0]] += 1
				entityFoundInDoc = 1
			else: # add a new tuple to the list 
				docEntityDict[i[0]] = 1

			currentEntity = i[0]
			# print currentEntity
			entityType = i[1]
			cur.execute("select count(*) from entities where Entity = ?",(currentEntity,))
			result = list(cur)
			# print result[0][0]
			rows = result[0][0]
			if rows == 0:
				cur.execute("insert into entities values (?,?,?,?)",(currentEntity,entityType,1,1,))
				# print "insert"
			elif rows == 1:
				cur.execute("update entities set TotalAppearances = TotalAppearances + 1 WHERE Entity = ?",(currentEntity,))
				# print "update"

				if entityFoundInDoc == 0:
					cur.execute("update entities set NumberIndivDocs = NumberIndivDocs + 1 WHERE Entity = ?",(currentEntity,))
					# print "update"
					entityFoundInDoc = 1
			else:
				print("More than one copy of found in table")

			db.commit()
			entityDict[filename] = docEntityDict
			x+=1
			print "DOCUMENT "+ x 

	cur.execute("select * from entities")
	db.commit()
	allRows = cur.fetchall()
	csvWriter = csv.writer(open(savePath+'entityOverview.csv','w'))
	csvWriter.writerows(allRows)
	cur.close()	

	with open(savePath+'entityDictionary.csv','wb') as f:
		w = csv.writer(f)
		w.writerows(entityDict.items())

	print "-------DONE------------"

stanford_main()
