import pymongo
import pymongo.mongo_client
import pandas as pd

def data_export():
    if __name__ == "__main__":
        client=pymongo.MongoClient( "mongodb+srv://ayush:ayush123@cluster0.9h4qgcg.mongodb.net/")
        print(client)
        db=client["Revenue_Collection"]
        garb_taxes=db["garbagetaxes"]
        water_tax=db["watertaxes"]
        property_tax=db["propertytaxes"]

        garb_tax_list=list(garb_taxes.find())
        water_tax_list=list(water_tax.find())
        prop_tax_list=list(property_tax.find())

        garb_df=pd.DataFrame(garb_tax_list)
        water_df=pd.DataFrame(water_tax_list)
        prop_df=pd.DataFrame(prop_tax_list)
        
        if '_id' in garb_df:
            del garb_df['_id']
        if '_id' in water_df:
            del water_df['_id']
        if '_id' in prop_df:
            del prop_df['_id']

        garb_df.to_csv("garbage_tax.csv")
        water_df.to_csv("water_tax.csv")
        prop_df.to_csv("property_tax.csv")
       
        

data_export()   
   