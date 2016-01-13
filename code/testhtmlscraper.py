from somefile import scrape
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
with io.open("allMusicOneWeek.csv", "w",encoding = "utf8") as f:
    with open("alleUrls.csv", "r") as urls:
        for url in urls:
            print url
            scrape(url,f)

#                     1 positie
# week-45
# ,1,
# Traceback (most recent call last):
#   File "testhtmlscraper.py", line 58, in <module>
#     f.write(muziekGegevens + "\n")
# TypeError: must be unicode, not str ???
urls.close
f.close
