#Design document
Daan van der Thiel
500694621
## Minimum viable product
Het minimale product dat ik wil leveren is het makkelijk door verschillende hitlijsten gaan van verschillende weken.
Ook wil ik de zoekfunctie implementeren en het mogelijk maken om op een nummer te klikken en zo naar een nummer toe te gaan. 
Dit moet moet dan een overzicht geven van de weken dat dit nummer in de hitlijst is geweest en de positie.
Ook moet je hier op de verschillende weken kunnen drukken en zo de hitlijsten van verschillende weken zichtbaar maken.
Verder zou het nog mogelijk moeten zijn om een toplijst te maken met nummers die het hoogste aantal punten hebben.

## Framework mapping
in het eerste venster wil ik 3 top 40 lijsten weergeven waarbij met kleuren veranderingen aangegeven worden. waarbij blauw een stijger of daler weergeeft en rood een nieuw nummer in de lijst. ik wil de data van de top 40 opslaan in het volgende formaat:
araray
object ->
nummer
artiest(en)
punten
weken in de lijst
jaartal
hoogste notering
positie deze week
week
door dit zo op te slaan denk ik de data makkelijk om te kunnen zetten zodat ik de data voor verschillende functies op kan splitsen.
Ik zal eerst een fucntie moeten maken die het hoofdscherm maakt waarbij de data van de huidige week weergeven wordt. Vervolens verschillende boxen die je kan invullen: jaartal,maand,week zodat er genavigeerd kan worden tussen verschillende periodes. De maand zal ik zelf omrekenen naar weken.
Er moet ook een zoekfunctie gemaakt worden zodat er makkelijk gezocht kan worden naar verschillende nummers. Als er dan op een nummer gezocht wordt of er wordt een nummer geselecteerd dan moet er een lijn grafiek zijn met het verloop over de weken. Hierbij moet ik een aparte array maken of de data juist filteren op het nummer. 
Ook zal ik een functie maken die de top lijst geeft met nummers die het hoogste aantal punten behaald hebben. Hiervoor moet ik een functie maken die de layout veranderd. 
