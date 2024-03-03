# -*- coding: utf-8 -*-

import requests
from pymongo import MongoClient
from pymongo.errors import BulkWriteError

mongo_uri = 'mongodb+srv://admin:admin@cluster0.9y482gd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
db_name = "filmy"
collection_name = "movies"

client = MongoClient(mongo_uri)
db = client[db_name]
collection = db[collection_name]

# def fetch_movies(page):
#     url = "https://api.themoviedb.org/3/discover/movie?"
#     params = {
#         "include_video": "true",
#         "page": page,
#         "api_key": "2dec075a5d5b7fcfb11d1ba3f2ab9e9d",
#         "language": "es",
#         "include_image_language": "es,en"
#     }
#     response = requests.get(url, params=params)
#     if response.status_code == 200:
#         return response.json().get("results", [])
#     else:
#         return None

def fetch_movie_credits(movie_id):
    url = f"https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=2dec075a5d5b7fcfb11d1ba3f2ab9e9d&language=es&include_image_language=es"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        return None

def insert_movies():
    total_inserted = 0
    page = 1
    while total_inserted < 10000:
        movies = discover_tv_shows(page)
        if movies:
            enriched_movies = []
            for movie in movies:
                credits = fetch_movie_credits(movie['id'])
                if credits:
                    movie['cast'] = credits.get('cast', [])
                    enriched_movies.append(movie)
            try:
                if enriched_movies:
                    result = collection.insert_many(enriched_movies, ordered=False)
                    total_inserted += len(result.inserted_ids)
                    print(f"Inserted {len(result.inserted_ids)} movies with credits. Total inserted: {total_inserted}")
            except BulkWriteError as bwe:
                print("BulkWriteError occurred", bwe.details)
                break
        else:
            print(f"Failed to fetch movies for page {page}")
            break
        page += 1



# def fetch_top_rated_movies(page):
#     url_base = "https://api.themoviedb.org/3/movie/top_rated?"
#     api_key = "2dec075a5d5b7fcfb11d1ba3f2ab9e9d"
    
#     params = {
#         "api_key": api_key,
#         "language": "es",
#         "include_video": "true",
#         "page": page,
#         "include_image_language": "es,en"
#     }
    
#     response = requests.get(url_base, params=params)
    
#     if response.status_code == 200:
#         return response.json().get("results", [])
#     else:
#         return None

# def fetch_upcoming_movies(page):
#     url_base = "https://api.themoviedb.org/3/movie/upcoming?"
#     api_key = "2dec075a5d5b7fcfb11d1ba3f2ab9e9d"
    
#     params = {
#         "api_key": api_key,
#         "language": "es",
#         "include_video": "true",
#         "page": page,
#         "include_image_language": "es,en"
#     }
    
#     response = requests.get(url_base, params=params)
    
#     if response.status_code == 200:
#         return response.json().get("results", [])
#     else:
#         return none

# def fetch_trending_movies_week(page):
#     url = "https://api.themoviedb.org/3/trending/movie/week"
#     api_key = "2dec075a5d5b7fcfb11d1ba3f2ab9e9d"
    
#     params = {
#         "api_key": api_key,
#         "language": "es",
#         "include_video": "true",
#         "page": page,
#         "include_image_language": "es,en"
#     }
    
#     response = requests.get(url, params=params)
    
#     if response.status_code == 200:
#         return response.json().get("results", [])
#     else:
#         return None


# def fetch_now_playing_movies(page=1):
#     url = "https://api.themoviedb.org/3/movie/now_playing"
#     api_key = "2dec075a5d5b7fcfb11d1ba3f2ab9e9d"
#     params = {
#         "api_key": api_key,
#         "language": "es",
#          "include_video": "true",
#          "page": page,
#          "include_image_language": "es,en"
#     }
#     response = requests.get(url, params=params)
#     if response.status_code == 200:
#         return response.json().get("results", [])
#     else:
#         return None


def discover_tv_shows(sort_by="popularity.desc", page=1, genre=None):
    url = "https://api.themoviedb.org/3/discover/tv"
    api_key = "2dec075a5d5b7fcfb11d1ba3f2ab9e9d"
    params = {
        "api_key": api_key,
        "language": "es",
        "sort_by": sort_by,
        "page": page,
        "with_genres": genre
    }
    response = requests.get(url, params=params)
    if response.status_code == 200:
        return response.json().get("results", [])
    else:
        return None


# def discover_sci_fi_movies_from_2020():
#     url = "https://api.themoviedb.org/3/discover/movie"
#     api_key = "2dec075a5d5b7fcfb11d1ba3f2ab9e9d"
#     params = {
#         "api_key": api_key,
#         "language": "es",
#         "sort_by": "vote_average.desc",
#         "year": 2020,
#         "with_genres": "878",
#         "vote_count.gte": 100
#     }
#     response = requests.get(url, params=params)
#     if response.status_code == 200:
#         return response.json().get("results", [])
#     else:
#         return None
    

# def fetch_movie_genres(page=1):
#     url = "https://api.themoviedb.org/3/genre/movie/list"
#     api_key = "2dec075a5d5b7fcfb11d1ba3f2ab9e9d"
#     params = {
#         "api_key": api_key,
#         "language": "es",
#         "page": page,
#     }
#     response = requests.get(url, params=params)
#     if response.status_code == 200:
#         return response.json().get("genres", [])
#     else:
#         return None

       

# def insert_genres():
#     total_inserted = 0
#     page = 1
#     movies = fetch_movie_genres(page)
#     if movies:
#         try:
#             result = collection.insert_many(movies, ordered=False)
#             total_inserted += len(result.inserted_ids)
#             print(f"Inserted {len(result.inserted_ids)} genres. Total inserted: {total_inserted}")
#         except BulkWriteError as bwe:
#             print("BulkWriteError occurred", bwe.details)
#     else:
#         print(f"Failed to fetch movies for page {page}")
#     page += 1


insert_movies()

# insert_genres()        
