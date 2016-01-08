import io
import os
import sys
import csv
import codecs
import cStringIO
import errno
def whatisthis(s):
    if isinstance(s, str):
        return False
    elif isinstance(s, unicode):
        return True

# Third party library imports:
import pattern
from pattern.web import URL, DOM
import HTMLParser
from pattern.web import abs
with io.open("allMusic.csv", "w",encoding = "utf8") as f:
    with open("alleUrls.csv", "r") as urls:
        for url in urls:
            print url
            week = url.split("/")
            week = week[-1]
            url = URL(url)
            dom = DOM(url.download(cached = True))

            # geeft de week
            i = 1


            # de lijst van de top 40 selecteren

            for l in dom.by_tag("ol.top40")[:1]:
                # per nummer selecteren=
                print "lijst top 40"
                for e in l.by_tag("div.clearfix")[0:40]:
                    muziekGegevens = ""
                    #positie in de top 40
                    muziekGegevens += str(i) + ","
                    print i , 'positie'
                    i += 1 # opletten met resetten
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
                        muziekGegevens += inner.content.strip()
                    h = HTMLParser.HTMLParser()
                    muziekGegevens = h.unescape(muziekGegevens)

                    if not whatisthis(muziekGegevens):
                        muziekGegevens = unicode(muziekGegevens, "utf-8")
                        print 'lajdsflkejwflejwfoiewjfwjfldskjfoewijf'
                        f.write(muziekGegevens + "\n")
                    else:
                        f.write(muziekGegevens + "\n")


#                     1 positie
# week-45
# ,1,
# Traceback (most recent call last):
#   File "testhtmlscraper.py", line 58, in <module>
#     f.write(muziekGegevens + "\n")
# TypeError: must be unicode, not str ???
f.close
urls.close
