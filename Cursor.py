import requests
from pymongo import MongoClient
from pymongo.errors import BulkWriteError
class Cursor:
    def __init__(self, mongo_uri:str, db_name:str):
        self.client = MongoClient(mongo_uri)
        self.db = self.client[db_name]
        self.collections = {}
        self.current_collection = None
    def setCollection(self,collection_name:str):
        try:
            return self.collections[collection_name]
        except:
            self.collections[collection_name]=self.db[collection_name]
            return self.collections[collection_name]
    
    def insert(self, collection_name):
        set_ = None
        collection = None
        if collection_name == "movies":
            collection = self.collections[collection_name]
            set = fetch_movie_genres(page)
        total_inserted = 0
        page = 1
        if set:
            try:
                result = collection.insert_many(set, ordered=False)
                total_inserted += len(result.inserted_ids)
                print(f"Inserted {len(result.inserted_ids)} genres. Total inserted: {total_inserted}")
            except BulkWriteError as bwe:
                print("BulkWriteError occurred", bwe.details)
        else:
            print(f"Failed to fetch movies for page {page}")
        page += 1