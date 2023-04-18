import requests
import random
from bs4 import BeautifulSoup


def filterLink(link):
    filters = ["/Categoria:", "/Portal:", "/Ajuda:", "/Ficheiro:", "/Especial:", "/Wikip%C3%A9dia:"];
    for filter in filters:
        if(filter in link):
            return True;
    return False;

r = requests.get("https://pt.wikipedia.org/wiki/Adam_Eckfeldt");

while(True):
    s = BeautifulSoup(r.text, 'html.parser')
    links = [];
    i = -1;
    for hyperlink in s.find_all('a', href=True):
        i += 1;
        if("/wiki/" in hyperlink.get('href')[0:6]):
            links.append(hyperlink.get('href'))


        
        
    
    print(s.title.string.replace(" – Wikipédia, a enciclopédia livre", ''));
    print(r.url + "\n");

    if(len(links) > 0):
        l = ("https://pt.wikipedia.org/"+links[ random.randint(0, len(links) - 1) ] )
        while(filterLink(l)):
            l = ("https://pt.wikipedia.org/"+links[ random.randint(0, len(links) - 1) ] )
        r = requests.get(l)
    else: break

print("No more links found")
