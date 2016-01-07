import io
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
        with io.open("allmusic.csv", "w",charset = "utf8") as f:
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
                    for artiest in e.by_class("credit"):
                        muziekGegevens += artiest.content + ","
                    #positie
                    for inner in e.by_tag("strong")[1:2]:
                        print inner.content , "1:2"
                        muziekGegevens += inner.content + ","
                    # hoogste notering
                    for inner in e.by_tag("strong")[2:3]:
                        print inner.content , "2:3"
                        muziekGegevens += inner.content + ","
                    # aantal punten
                    for inner in e.by_tag("strong")[3:4]:
                        print inner.content , "3:4"
                        muziekGegevens += inner.content + ","
                    # jaar van het nummer
                    for inner in e.by_tag("strong")[4:5]:
                        print inner.content.strip() , "4:5"
                        muziekGegevens += inner.content + ","
                    h = HTMLParser.HTMLParser()
                    muziekGegevens = h.unescape(muziekGegevens)
                    f.write(muziekGegevens)
f.close
urls.close
