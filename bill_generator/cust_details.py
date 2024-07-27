import pymongo
import pymongo.mongo_client
import pandas as pd
from bill_gen import BillGenerators

class Get_data:
    @staticmethod
    def selectdata(bill_no):
       
            client=pymongo.MongoClient( "mongodb+srv://ayush:ayush123@cluster0.9h4qgcg.mongodb.net/")
           
            db=client["Revenue_Collection"]
            collection_user=db['users']
            
            collection=db["payments"]
            a=collection.find_one({'billNumber':bill_no})
            #user=collection_user.find_one({'_id':a['user']})
            try:
                if a['bill']=="propertytax":
                    BillGenerators.property_bill(a['_id'],a['billNumber'],a['amountPaid'])
                elif a['bill']=="watertax":
                    BillGenerators.water_bill(a['_id'],a['billNumber'],a['amountPaid'])
                elif a['bill']=="garbagetax":
                    BillGenerators.garbage_bill(a['_id'],a['billNumber'],a['amountPaid'])
      
            except:
                 print("Enter a valid bill number.")

            

