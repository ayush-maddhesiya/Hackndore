import os
import shutil
from InvoiceGenerator.pdf import SimpleInvoice
from tempfile import NamedTemporaryFile
from InvoiceGenerator.api import Invoice, Item, Client, Provider, Creator


class BillGenerators:
    @staticmethod
    def water_bill(bill_id,cust_id,amount):
        os.environ["INVOICE_LANG"] = "en"

        client = Client( f"bill_id={bill_id}", f"cust_id={cust_id}")
        provider = Provider('Indore Muncipal Coorperation', bank_account='2600420569', bank_code='2010')
        creator = Creator('Admin')

        invoice = Invoice(client, provider, creator)
        invoice.currency_locale = 'en_US.UTF-8'
        invoice.add_item(Item(1, int(amount), description="Water Tax",tax=18))
        pdf = SimpleInvoice(invoice)
        pdf.gen("invoice.pdf", generate_qr_code=True)
        os.chdir("all_bills/water")

    @staticmethod
    def property_bill(bill_id,cust_id,amount):
        os.environ["INVOICE_LANG"] = "en"

        client = Client( f"bill_id={bill_id}", f"cust_id={cust_id}")
        provider = Provider('Indore Muncipal Coorperation', bank_account='2600420569', bank_code='2010')
        creator = Creator('Admin')

        invoice = Invoice(client, provider, creator)
        invoice.currency_locale = 'en_US.UTF-8'
        invoice.add_item(Item(1, int(amount), description="Property Tax",tax=18))
        pdf = SimpleInvoice(invoice)
        pdf.gen("invoice.pdf", generate_qr_code=True)
        os.chdir("all_bills/property")


    @staticmethod
    def garbage_bill(bill_id,cust_id,amount):
        os.environ["INVOICE_LANG"] = "en"

        client = Client( f"bill_id={bill_id}", f"cust_id={cust_id}")
        provider = Provider('Indore Muncipal Coorperation', bank_account='2600420569', bank_code='2010')
        creator = Creator('Admin')

        invoice = Invoice(client, provider, creator)
        invoice.currency_locale = 'en_US.UTF-8'
        invoice.add_item(Item(1, int(amount), description="Garbage Tax",tax=18))
        pdf = SimpleInvoice(invoice)
        pdf.gen("invoice.pdf", generate_qr_code=True)

shutil.move("/home/admin1/Desktop/Hackndore/bill_generator/invoice.pdf", "/home/admin1/Desktop/Hackndore/bill_generator/all_bills/invoice.pdf")



        