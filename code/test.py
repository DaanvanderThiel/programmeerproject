                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       import os
import sys
import csv
import codecs
import cStringIO
import errno
import time
import random
sites =[]
# Third party library imports:
import pattern
from pattern.web import URL, DOM
from pattern.web import abs

url = URL("http://www.top40.nl/top40/2016/week-1")
dom = DOM(url.download(cached = True))
# geeft de week
sites.append("http://www.top40.nl/top40/2016/week-1")
for x in range(0,100):
    time.sleep(random.randrange(0,10))
    url = URL(sites[-1])
    dom = DOM(url.download(cached = True))
    for link in dom.by_tag("div.pull-left prev")[:1]:
        for link in link('a'):
            sites.append(abs(link.attributes.get('href',''), base=url.redirect or url.string))
            print sites
    # url = URL("http://www.top40.nl/top40/2016/week-1")
# dom = DOM(url.download(cached = True))
    # for link in dom.by_class()
# for link, source in crawl('http://www.top40.nl/top40/2016/week-1',delay=3, throttle=3):
#     print link.url
#     if link:
#         print link
        # root dir
