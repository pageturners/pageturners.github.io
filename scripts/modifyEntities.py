#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Wed Apr 18 12:58:55 2018

@author: emilywall
"""

import csv
import json
import sys

if __name__ == '__main__': 
    entity_file = open('/Users/emilywall/git/pageturners.github.io/csv/entityOverview.csv', 'rb')
    entity_reader = csv.reader(entity_file)
    entity_list = []
                 
    first_row = True
    for row in entity_reader:
        if (first_row == True):
            first_row = False
        else:
            entity_list.append(row[0])
    entity_file.close()
    
    
    
    entity_dict_file = open('/Users/emilywall/git/pageturners.github.io/csv/entityDictionary.csv', 'rb')
    entity_dict_reader = csv.reader(entity_dict_file)
    entity_dict_out_file = open('/Users/emilywall/git/pageturners.github.io/csv/entityDictionary2.csv', 'w+')
    
    first_row = True
    for row in entity_dict_reader: 
        if (first_row == True):
            first_row = False
            entity_dict_out_file.write('filename,entitydictionary\n')
        else: 
            row_parsed = json.loads(row[1].replace("'", '"'))
            new_dict = {}
            for entity in row_parsed: 
                if (entity in entity_list): # only add in the entities that remain in the overview file
                    new_dict[entity] = row_parsed[entity]
            entity_dict_out_file.write(row[0] + ',"' + json.dumps(new_dict).replace('"', "'") + '"\n')
    
    entity_dict_file.close()
    entity_dict_out_file.close()