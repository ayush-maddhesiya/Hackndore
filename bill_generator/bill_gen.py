import os
from InvoiceGenerator.pdf import SimpleInvoice

from tempfile import NamedTemporaryFile

from InvoiceGenerator.api import Invoice, Item, Client, Provider, Creator
import pymongo
import pymongo.mongo_client




class BillGenerators:
    @staticmethod
    def water_bill(name,bill_id,cust_id,amount):
        os.environ["INVOICE_LANG"] = "en"

        client = Client(name, f"bill_id={bill_id}", f"cust_id={cust_id}")
        provider = Provider('Indore Muncipal Coorperation', bank_account='2600420569', bank_code='2010')
        creator = Creator('Admin')

        invoice = Invoice(client, provider, creator)
        invoice.currency_locale = 'en_US.UTF-8'
        invoice.add_item(Item(1, amount, description="Water Tax",tax=18))
        pdf = SimpleInvoice(invoice)
        pdf.gen("invoice.pdf", generate_qr_code=True)

    @staticmethod
    def property_bill(name,bill_id,cust_id,amount):
        os.environ["INVOICE_LANG"] = "en"

        client = Client(name, f"bill_id={bill_id}", f"cust_id={cust_id}")
        provider = Provider('Indore Muncipal Coorperation', bank_account='2600420569', bank_code='2010')
        creator = Creator('Admin')

        invoice = Invoice(client, provider, creator)
        invoice.currency_locale = 'en_US.UTF-8'
        invoice.add_item(Item(1, amount, description="Property Tax",tax=18))
        pdf = SimpleInvoice(invoice)
        pdf.gen("invoice.pdf", generate_qr_code=True) 

    @staticmethod
    def garbage_bill(name,bill_id,cust_id,amount):
        os.environ["INVOICE_LANG"] = "en"

        client = Client(name, f"bill_id={bill_id}", f"cust_id={cust_id}")
        provider = Provider('Indore Muncipal Coorperation', bank_account='2600420569', bank_code='2010')
        creator = Creator('Admin')

        invoice = Invoice(client, provider, creator)
        invoice.currency_locale = 'en_US.UTF-8'
        invoice.add_item(Item(1, amount, description="Garbage Tax",tax=18))
        pdf = SimpleInvoice(invoice)
        pdf.gen("invoice.pdf", generate_qr_code=True)   

        