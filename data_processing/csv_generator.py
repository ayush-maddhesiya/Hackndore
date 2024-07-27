import pymongo
import pymongo.mongo_client
import pandas as pd

def data_fetch():
    if __name__ == "__main__":
        client=pymongo.MongoClient( "mongodb+srv://ayush:ayush123@cluster0.9h4qgcg.mongodb.net/")
        print(client)
        db=client["Revenue_Collection"]
        garb_taxes=db["garbagetaxes"]
        water_tax=db["watertaxes"]
        garb_tax_list=list(garb_taxes.find())
        water_tax_list=list(water_tax.find())
        print(garb_tax_list,water_tax_list)

data_fetch()        