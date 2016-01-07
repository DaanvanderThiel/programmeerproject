
import os
import sys
import csv
import codecs
import cStringIO
import errno

# Third party library imports:
import pattern
from pattern.web import URL, DOM
import HTMLParser
from pattern.web import abs
with open("alleUrls.csv", "r") as urls:
    for url in urls:
        url = URL(url)
        dom = DOM(url.download(cached = True))
        # geeft de week
        i = 1
        with open("allmusic.csv", "wb") as f:
            for week in dom.by_class("weeknr")[1:2]:
                print week.content
            # de lijst van de top 40 selecteren

            for l in dom.by_tag("ol.top40")[:1]:
                # per nummer selecteren

                for e in l.by_tag("div.clearfix")[0:40]:
                    muziekGegevens = ""
                    #positie in de top 40
                    print i , 'positie'
                    i = i+1 # opletten met resetten
                    # de artiest selecteren
                    # for artiest in e.by_class("credit"):
                    #     #print artiest
                    for inner in e.by_tag("strong")[1:2]:
                        print inner , "1:2"
                    for inner in e.by_tag("strong")[2:3]:
                        print inner , "2:3"
                    for inner in e.by_tag("strong")[3:4]:
                        print inner , "3:4"
                    for inner in e.by_tag("strong")[4:5]:
                        print inner , "4:5"
                    for inner in e.by_tag("strong")[5:6]:
                        print inner , "5:6"
                    h = HTMLParser.HTMLParser()
                    h.unescape(muziekGegevens)
f.close
urls.close
