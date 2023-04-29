import requests, json, time
from random import randint
from tqdm import tqdm

class Anime:
    def __init__(self, raw):
        self.raw = raw
        self.title = self.raw['title']
        self.genres = get_info(self.raw, 'genres', 'name').append(get_info(self.raw, 'themes', 'name'))
        self.type = self.raw['type']
        self.score = self.raw['score']
        self.rating = self.raw['rating'].split(" -")[0]
        self.producers = get_info(self.raw, 'producers', 'name')
        self.link = self.raw['url']

        self.aired = {'from': (self.raw['aired']['from'] or "").split("T")[0], 'to': (self.raw['aired']['to'] or "").split("T")[0]}

    def __str__(self):
        return self.title

#Makes a request to the Jikan API with the specified parameters.
def get_request(params):
    req = requests.get("https://api.jikan.moe/v4/" + params)
    return json.loads(req.text)

#Returns a dictionary with all of the anime genres in the Jikan API and their respective mal_id.
def get_genre_ids():
    genres = {}
    data = get_request("genres/anime")['data']
    for genre in data:
        genres.update({str(genre['mal_id']): genre['name'].lower()})
    return genres

#Returns the specified key value of all objects inside an array inside an object.
#Example: get_info(anime, 'genres', 'name') would return all the names of each genre in the specified anime object.
def get_info(obj, container_name, info_name):
    info_list = []

    for sub_container in obj[container_name]:
        info_list.append(sub_container[info_name])  

    return info_list

#Returns an anime from a page using the specified parameters.
def get_anime(**kwargs):
    #If False is passed to the raw argument, returns a formatted string with the anime info.
    raw = kwargs.get('raw', True)
    #If a anime number is not specified, it is generated randomly if needed.
    num = kwargs.get('num', None)
    #If the page number is not specified, a random anime is returned and Num is disregarded.
    page = kwargs.get('page', None)

    genres = ""
    if(page == None):
        while(len(genres) < 1):
            anime = get_request("random/anime")['data']
    elif(num == None):
        anime = page[randint(0, len(page))]
    else:
        anime = page[int(num)]
   
    #If raw, return an anime object, else return a string with the info.
    if raw:
        return Anime(anime)
    else:
        genres = get_info(anime, 'genres', 'name') + ", " + get_info(anime, 'themes', 'name')
        return f"Anime: {anime['title']}\nGenres: {', '.join(genres)}"


# Returns the anime page corresponding with the number and filters passed.
# If nothing is passed, the first page of /anime is returned.
def get_anime_page(num=1, **kwargs):
    genre_filter = kwargs.get('genres', None)
    genre_ids = kwargs.get('genre_ids', get_genre_ids())
    
    req = f"anime?page={num}"

    if genre_filter: 
        genre_filter = genre_filter.replace(" ", "").split(",")

        to_remove = []
        for genre in genre_filter:
            if(genre.lower() in genre_ids.values()):
                for ID in list(genre_ids.keys()):
                    if(genre.lower() == genre_ids[ID]):
                        genre_filter[genre_filter.index(genre)] = str(ID);
                        break;
            else:
                to_remove.append(genre_filter.index(genre))
                
        for i in to_remove:
            genre_filter.pop(i)

        req += "&genres=" + ",".join(genre_filter)

    return get_request(req)


# Returns True if the Anime passed has ALL the genres passed.
# Takes an anime element and a string of genres separated by a comma.
def filter_anime_by_genre(anime, genres):
    genre_filter = genres
    genre_filter = genre_filter.split(",")

    anime_genres = anime['genres']
    
    for genre in genre_filter:
        if(not(genre.capitalize() in anime_genres)):
            return False
        else:
            return True

# Returns all of the Anime with the specified parameters.
# If no parameter is passed, this function will return all Anime in the Jikan API (that will take some time!)
def get_all_anime(**kwargs):
    genre_filter = kwargs.get('genres', None)
    genre_exclusion_filter = kwargs.get('genres_exclude', None) # TODO
    sfw = kwargs.get('sfw', False) # TODO
    min_score_filter = kwargs.get('min_score', None) # TODO
    max_score_filter = kwargs.get('max_score', None) # TODO
    status_filter = kwargs.get('status', None) # TODO
    type_filter = kwargs.get('types', None) # TODO

    if(max_score_filter or min_score_filter or status_filter or type_filter or genre_exclusion_filter or sfw):
        raise NotImplementedError("No code for this yet!\nThese filters are not yet implemented.")

    animes = []
    pages = []
    page_num = 1
    next_page = True

    #This is only used for TQDM and can be commented or removed if more performance is needed. (just remember to comment/remove the progress_bar.update and progress_bar.close functions too!)
    expected_end_page = int(get_anime_page(page_num, genres=genre_filter, min_score=min_score_filter, status=status_filter, types=type_filter)['pagination']['last_visible_page'])
    progress_bar = tqdm(total=expected_end_page)

    while(next_page == True):
        start_time = time.time()
        page = get_anime_page(page_num, genres=genre_filter, min_score=min_score_filter, status=status_filter, types=type_filter)
        next_page = page['pagination']['has_next_page']
        pages.append(page['data'])
        
        page_num += 1
        exec_time = time.time() - start_time
        time.sleep(3 - exec_time)
        progress_bar.update(1)
    progress_bar.close()

    for page in pages:
        for i, anime in enumerate(page):
            animes.append(get_anime(page=page, num=i))
    
    return animes
