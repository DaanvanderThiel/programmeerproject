# Python standard library imports
import os
import sys
import csv
import codecs
import cStringIO
import errno
BEGINJAAR = 1965
HEDEN = 2016
WEKENPERJAAR = 54
# Third party library imports:
import pattern
from pattern.web import URL, DOM

from pattern.web import abs
for (int i = BEGINJAAR; i< HEDEN ; i++):
    for(int w = 0; w < WEKENPERJAAR; w++):
        if ( ) #als de url niet bestaat
        url = URL("http://www.top40.nl/top40/2016/week-1")
        dom = DOM(url.download(cached = True))
        # geeft de week
        i = 1
        for week in dom.by_class("weeknr")[1:2]:
            print week.content
        # de lijst van de top 40 selecteren

        for l in dom.by_tag("ol.top40")[:1]:
            # per nummer selecteren

            for e in l.by_tag("div.clearfix")[0:40]:
                #positie in de top 40
                print i , 'positie'
                i = i+1 # opletten met resetten
                # de artiest selecteren
                for artiest in e.by_class("credit"):
                    print artiest.content
                # titel,aantal weken, hoogste notering, aantal punten, jaar
                for inner in e.by_tag("strong"):
                    print inner.content.strip()
                    inner.encode("utf-8")
