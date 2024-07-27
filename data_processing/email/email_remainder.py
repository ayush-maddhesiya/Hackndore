from pymongo import MongoClient
from datetime import datetime, timedelta
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 465
SMTP_USER = "tanishjain184@gmail.com"
SMTP_PASSWORD = "xugi istm gocq bota"  

def get_users_with_end_date_in_30_days():
    client = MongoClient("mongodb+srv://ayush:ayush123@cluster0.9h4qgcg.mongodb.net/")
    db = client["Revenue_Collection"]
    collection = db['users']
    
   
    target_date = (datetime.now() - timedelta(days=30)).strftime("%Y-%m-%d")
    
    

    users = collection.find()
    c=[]
    for user in users:
        if datetime.date(user['updatedAt'])==target_date:
            c.append(user['email'])
    return c        
            

def send_email(to_email, subject, body):
    msg = MIMEMultipart()
    msg['From'] = SMTP_USER
    msg['To'] = to_email
    msg['Subject'] = subject

    msg.attach(MIMEText(body, 'plain'))

    with smtplib.SMTP_SSL(SMTP_SERVER, SMTP_PORT) as server:
        server.login(SMTP_USER, SMTP_PASSWORD)
        server.sendmail(SMTP_USER, to_email, msg.as_string())

def main():
    users = get_users_with_end_date_in_30_days()
    for i in users:
        email = i
       
        subject = "Payment Reminder"
        body = f"Dear person ,\n\nThis is a reminder that your payment of Xrs. is due on today .\n\nThank you!"
        
        send_email(email, subject, body)
        print(f"Email sent to {email}")

if __name__ == "__main__":
    main()
