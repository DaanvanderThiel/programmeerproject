                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       import os
import sys
import csv
import codecs
import cStringIO
import errno
import time
import random
import csv
sites =[]
# Third party library imports:
import pattern
from pattern.web import URL, DOM
from pattern.web import abs

url = URL("http://www.top40.nl/top40/2016/week-1")
dom = DOM(url.download(cached = True))
# geeft de week
with open("alleUrls.csv", 'wb') as f:
    site ="http://www.top40.nl/top40/2016/week-1"
    for x in range(0,2754):
        url = URL(site)
        dom = DOM(url.download(cached = True))
        for link in dom.by_tag("div.pull-left prev")[:1]:
            for link in link('a'):
                site = abs(link.attributes.get('href',''), base=url.redirect or url.string)
                writer = csv.writer(f)
                f.write(site)
                f.write("\n")

f.close()


# schrijf elke sites naar een file
