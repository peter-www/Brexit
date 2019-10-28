from tweepy import API
from tweepy import Cursor
from tweepy.streaming import StreamListener
from tweepy import OAuthHandler
from tweepy import Stream
import json
import datetime
from datetime import date
import time
import tweepy
import re 
from textblob import TextBlob
import threading
import couchdb

date_start = datetime.datetime(2016, 6, 23, 0, 0, 0)
date_2016 = datetime.datetime(2016, 12, 31, 0, 0, 0)
date_2017 = datetime.datetime(2017, 12, 31, 0, 0, 0)
date_2018 = datetime.datetime(2018, 12, 31, 0, 0, 0)
date_2019 = datetime.datetime(2019, 10, 30, 0, 0, 0)

keywords = ["#Brexit","Brexit"]



class tweet_api():
    
    def __init__(self, consumer_key, consumer_secret, access_token, access_token_secret):
        self.auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
        self.auth.set_access_token(access_token, access_token_secret)
        self.api = tweepy.API(self.auth, wait_on_rate_limit=True)


UK_city = ['York, North Yorkshire',
 'Worcester, Worcestershire',
 'Winchester, Hampshire',
 'Wells, South West England',
 'Wakefield, West Yorkshire',
 'Truro, Cornwall',
 'Sunderland, North East',
 'Sheffield, South Yorkshire',
 'Salford, North West',
 'St. Davids, Wales',
 'St.Albans, Hertfordshire',
 'Ripon, North Yorkshire',
 'Portsmouth, Hampshire',
 'Perth, Scotland',
 'Nottingham',
 'Newry, Northern Ireland',
 'Newcastle upon Tyne, North East England',
 'Liverpool, Merseyside',
 'Lincoln, Lincolnshire',
 'Lichfield, Staffordshire',
 'Leicester, the East Midlands',
 'Lancaster, Lancashire',
 'Hereford, Herefordshire',
 'Gloucester, Gloucestershire',
 'Glasgow, Scotland',
 'Exeter',
 'Ely, Cambridgeshire',
 'Durham',
 'Dundee, Scotland',
 'Derry, Northern Ireland',
 'Derby, Derbyshire',
 'Coventry, West Midlands',
 'Chichester, West Sussex',
 'Chester, Chesire',
 'Chelmsford, Essex',
 'Carlisle, North West',
 'Canterbury, Kent',
 'Cambridge, Cambridgeshire',
 'Brighton & Hove, East Sussex',
 'Bradford, West Yorkshire',
 'Bath, Somerset',
 'Peterborough, Cambridgeshire',
 'Elgin, Scotland',
 'Stoke-on-Trent, Staffordshire',
 'Solihull, Birmingham',
 'Cardiff, Cardiff county',
 'Eastbourne, East Sussex',
 'Oxford, Oxfordshire',
 'London',
 'Swindon, Swindon']

UK_City = [['york', 'north yorkshire'],
 ['worcester', 'worcestershire'],
 ['winchester', 'hampshire'],
 ['wells', 'south west england'],
 ['wakefield', 'west yorkshire'],
 ['truro', 'cornwall'],
 ['sunderland', 'north east'],
 ['sheffield', 'south yorkshire'],
 ['salford', 'north west'],
 ['st. davids', 'wales'],
 ['st.albans', 'hertfordshire'],
 ['ripon', 'north yorkshire'],
 ['portsmouth', 'hampshire'],
 ['perth', 'scotland'],
 ['nottingham'],
 ['newry', 'northern ireland'],
 ['newcastle upon tyne', 'north east england'],
 ['liverpool', 'merseyside'],
 ['lincoln', 'lincolnshire'],
 ['lichfield', 'staffordshire'],
 ['leicester', 'the east midlands'],
 ['lancaster', 'lancashire'],
 ['hereford', 'herefordshire'],
 ['gloucester', 'gloucestershire'],
 ['glasgow', 'scotland'],
 ['exeter'],
 ['ely', 'cambridgeshire'],
 ['durham'],
 ['dundee', 'scotland'],
 ['derry', 'northern ireland'],
 ['derby', 'derbyshire'],
 ['coventry', 'west midlands'],
 ['chichester', 'west sussex'],
 ['chester', 'chesire'],
 ['chelmsford', 'essex'],
 ['carlisle', 'north west'],
 ['canterbury', 'kent'],
 ['cambridge', 'cambridgeshire'],
 ['brighton & hove', 'east sussex'],
 ['bradford', 'west yorkshire'],
 ['bath', 'somerset'],
 ['peterborough', 'cambridgeshire'],
 ['elgin', 'scotland'],
 ['stoke-on-trent', 'staffordshire'],
 ['solihull', 'birmingham'],
 ['cardiff', 'cardiff county'],
 ['eastbourne', 'east sussex'],
 ['oxford', 'oxfordshire'],
 ['london'],
 ['swindon', 'swindon']]

def check_location(location):
    if not location:
        return None
    index = None
    i = 0
    words = location.split(", ")
    for city in UK_City:
        for word in words:
            if word.lower() in city:
                index = i
        i += 1
    return index


Latitude_Longitude =[
 ('53.958332', '-1.080278'),
 ('52.192001', '-2.220000'),
 ('51.063202', '-1.308000'),
 ('51.209000', '-2.647000'),
 ('53.680000', '-1.490000'),
 ('50.259998', '-5.051000'),
 ('54.906101', '-1.381130'),
 ('53.383331', '-1.466667'),
 ('53.483002', '-2.293100'),
 ('51.882000', '-5.269000'),
 ('51.755001', '-0.336000'),
 ('54.138000', '-1.524000'),
 ('50.805832', '-1.087222'),
 ('56.396999', '-3.437000'),
 ('52.950001', '-1.150000'),
 ('54.175999', '-6.349000'),
 ('54.966667', '-1.600000'),
 ('53.400002', '-2.983333'),
 ('53.234444', '-0.538611'),
 ('52.683498', '-1.826530'),
 ('52.633331', '-1.133333'),
 ('54.047001', '-2.801000'),
 ('52.056499', '-2.716000'),
 ('51.864445', '-2.244444'),
 ('55.860916', '-4.251433'),
 ('50.716667', '-3.533333'),
 ('52.398056', '0.262222'),
 ('54.776100', '-1.573300'),
 ('56.462002', '-2.970700'),
 ('54.995800', '-7.307400'),
 ('52.916668', '-1.466667'),
 ('52.408054', '-1.510556'),
 ('50.836498', '-0.779200'),
 ('53.189999', '-2.890000'),
 ('51.736099', '0.479800'),
 ('54.890999', '-2.944000'),
 ('51.279999', '1.080000'),
 ('52.205276', '0.119167'),
 ('50.827778', '-0.152778'),
 ('53.799999', '-1.750000'),
 ('51.380001', '-2.360000'),
 ('52.573921', '-0.250830'),
 ('57.653484', '-3.335724'),
 ('53.002666', '-2.179404'),
 ('52.412811', '-1.778197'),
 ('51.481583', '-3.179090'),
 ('50.768036', '0.290472'),
 ('51.752022', '-1.257677'),
 ('51.509865', '-0.118092'),
 ('51.568535', '-1.772232')]

def get_Latitude_Longitude(index):
    if index == None:
        return None
    
    return Latitude_Longitude[index]


def analyze_sentiment(tweet):
    analysis = TextBlob(tweet)
    return analysis.sentiment.polarity
    #if analysis.sentiment.polarity > 0:
    #    return 1
    #elif analysis.sentiment.polarity == 0:
    #    return 0
    #else:
    #    return -1
    
    
#analyzer = SentimentIntensityAnalyzer()
#score = analyzer.polarity_scores(text)['compound']

#def analyze_sentiment_va(tweet):
#    return analyzer.polarity_scores(tweet)['compound']

def sum_s (sentiments):
    s = sum(sentiments)
    if s > 0:
        return 1
    elif s < 0:
        return -1
    return s
    

def get_quantity(result):
    q = 0
    for r in result:
        q += len(r)
    return q


def get_sentiments(ID, api):
    tweets_in_2019 = [] 
    tweets_in_2018 = []
    tweets_in_2017 = []
    tweets_in_2016 = []
    result = []

    tmpTweets = tweepy.Cursor(api.user_timeline, id=ID, tweet_mode='extended').items()
    key = True
    year = 2019
    

    for tweet in tmpTweets:
        
        text = tweet.full_text
        date = tweet.created_at
        
        if (any(key in text for key in keywords)):
            sentiment = analyze_sentiment(text)
            
            if date_2018 < date and date <= date_2019:
                if year == 2019:
                    print("processing tweet in 2019") 
                    year = 2018
                    
                tweets_in_2019.append(sentiment)
                
            elif date_2017 < date and date <= date_2018:
                if key:                                  # since tweets fetched at desc order
                    if (len(tweets_in_2019)) >= 3:       # if there were less 3 tweets #Brexit
                        key = False                      #this user was not active 
                    elif key:
                        break
                if year == 2018:
                    #print("sleep for 10 seconds")
                    #time.sleep(10)
                    print("processing tweet in 2018") 
                    year = 2017
                    
                tweets_in_2018.append(sentiment)

            elif date_2016 < date and date <= date_2017:
                
                if year == 2017:
                    #print("sleep for 10 seconds")
                    #time.sleep(10)
                    print("processing tweet in 2017") 
                    year = 2016

                tweets_in_2017.append(sentiment)
                
            elif date_start <= date and date <= date_2016:
                
                if year == 2016:
                    #print("sleep for 10 seconds")
                    #time.sleep(10)
                    print("processing tweet in 2016") 
                    year = 2015
                    
                tweets_in_2016.append(sentiment)
                
            else:
                break  

    result.append(tweets_in_2019)
    result.append(tweets_in_2018)
    result.append(tweets_in_2017)
    result.append(tweets_in_2016)

    return result



class MyCouchDB():
    def __init__(self, name):
        self.couchserver = couchdb.Server()
        self.db = self.accessDB(name)
        self.users = self.getUser()
    
    def accessDB(self, dbname):
        if dbname in self.couchserver:
            db = self.couchserver[dbname]
            print("this database exists")
            
        else:
            print("this database does not exist")
            print("please stop the program and manual add the database")
        print("--------")
        
        return db
    
    def getUser(self):
        try:
            doc = self.db["users_list"]
            users = doc["users"]
            print("users_list exist")
            #users = db["users"]
            #print(users)
        except BaseException as e:
            print("the document of users doest not exit")
            print("this is new start of fetching")
            print("users list is set up for empty")
            users = {}
            self.db["users_list"] = {'users': {}, "quantity": 0} #create a document 
        print("---------")  
        
        return users
        
    def udpateUsers(self):
        doc = self.db.get("users_list")
        doc['users'] = self.users
        self.db.save(doc)
        print("users list updated")
        print("---------")
    
    def udpateQuantity(self):
        doc = self.db.get("users_list")
        doc["quantity"] += 1
        self.db.save(doc)
        print("now have %s user" % doc["quantity"])
    


class MyStreamListener(StreamListener):
    
    def __init__(self, couch, api):
        self.couch = couch
        self.api = api

    def on_data(self, data):
        try:
            print("------------------")
            tweet = json.loads(data)
            user = tweet["user"]
            userID = user["id"]
            location = user["location"]

            # chech if an repeated user
            try:
                self.couch.users[str(userID)]
                print("%s has been recorded" % userID)
            except BaseException as b:
                print("%s is not recorded" % userID)

                # Check user location whehter has UK CT
                index = check_location(location)
                
                if index:
                    print("%s has proper location" % userID)
                    LL = get_Latitude_Longitude(index)
                    sentiments = get_sentiments(userID, self.api)

                    # if an active user then record
                    if len(sentiments[0]) >= 3:
                        num_rel_tweets = get_quantity(sentiments)
                        doc ={
                                "location": UK_city[index],
                                "LL": LL,
                                "latitude": LL[0],
                                "longitude": LL[1],
                                "num_rel_tweets": num_rel_tweets,
                                "year_2019": sum_s(sentiments[0]),
                                "year_2018": sum_s(sentiments[1]),
                                "year_2017": sum_s(sentiments[2]),
                                "year_2016": sum_s(sentiments[3]),
                                "created_date": str(date.today()),
                                "raw_2019": sentiments[0],
                                "raw_2018": sentiments[1],
                                "raw_2017": sentiments[2],
                                "raw_2016": sentiments[3]
                            }
                        
                        self.couch.db[str(userID)] = doc
                        self.couch.udpateQuantity()
                        
                        print("%s is relative" % userID)
                    else:
                        print("%s is NOT relative" % userID)
                        
                    # update user has proper location, but is not active user
                    self.couch.users[str(userID)] = 1
                    self.couch.udpateUsers()
                    print("sleep for 5 seconds")
                    time.sleep(5)
                else:
                    # do not update user have location avoid space occupied
                    print("%s this user has not proper location" % userID)

            return True
        
        except BaseException as e:
            print("NOTIFICATION: !!!! ERROR: %s" % str(e))
            print("sleep for 5 seconds")
            time.sleep(5)
        return True
    
    def on_error(self, data):
        if status == 420:
            #returning false on_data in case rate_limit occurs.
            time.sleep(100)
            print("OVER RATE_LIMIT: take 100 seconds rest")
        print(status)



class twitter_client():

    def __init__(self, check_list, couch, api):
    
        self.check_list = check_list
        self.couch = couch
        self.api = api
        #self.wait_list = []

            # 1. whether recorded
            # 2. check location:
            # 3. whether active user
            # 4. if yes, append into wait_list
            # 5. transfer wait_list into check list
            
    def get_followers_inUK(self, twitter_user):
        
        i = 0
        for follower in Cursor(self.api.followers, twitter_user).items():
            print("------------%sth follower-----------" % i)
            user = follower
            ID = user.id
            try:
                self.couch.users[str(ID)]
                print("%s has been recored" % ID)
            except BaseException as e:
                try:
                    print("Yes for record")
                    index = check_location(user.location)
                    if index:
                        print("location: YES")
                        self.collect_users([ID, index])
                    else:
                        print("location: NO")
                except BaseException as b:
                    print("NOTIFICATION: !!!! ERROR: %s" % str(e))
                    print("sleep for 10    seconds")
                    time.sleep(10)
            i += 1
                    
    
    
    def collect_users(self, user):
        
        userID = user[0]
        index = user[1]
        sentiments = get_sentiments(userID, self.api)

        # check whether an active user
        if len(sentiments[0]) >= 3:

            # write the user with its sentiments history to Brexit
            LL = get_Latitude_Longitude(index)
            num_rel_tweets = get_quantity(sentiments)

            doc ={
                    "location": UK_city[index],
                    "LL": LL,
                    "latitude": LL[0],
                    "longitude": LL[1],
                    "num_rel_tweets": num_rel_tweets,
                    "year_2019": sum_s(sentiments[0]),
                    "year_2018": sum_s(sentiments[1]),
                    "year_2017": sum_s(sentiments[2]),
                    "year_2016": sum_s(sentiments[3]),
                    "created_date": str(date.today()),
                    "raw_0": sentiments[0],
                    "raw_1": sentiments[1],
                    "raw_2": sentiments[2],
                    "raw_3": sentiments[3]   
                }

            self.couch.db[str(userID)] = doc
            self.couch.udpateQuantity()
            #self.wait_list.append(userID)
        else:
            print("%s is NOT active" % userID)

            # update user has proper location, but is not active user
        self.couch.users[str(userID)] = 1
        self.couch.udpateUsers()
        print("sleep for 5 seconds")
        time.sleep(5)
            
    
    def start_fetch(self):
        
        for user in self.check_list:
            self.get_followers_inUK(user)
            
            
def startStream(couch, api):

    while True:
        try:
            myStreamListener = MyStreamListener(couch, api)
            myStream = tweepy.Stream(auth = api.auth, listener=myStreamListener)
            #myStream.filter(locations = GEOBOX_BHAM )
            myStream.filter(track=['#brexit'])
        except BaseException as e:
            print("NOTIFICATION: !!!! ERROR: %s" % str(e))

        print("sleep for 600 seconds")
        time.sleep(600)

if __name__ == "__main__":

    consumer_key = "UPo671bZpYyTpi0Iy6gdkxs0e"
    consumer_secret = "QVA5YVNJFxe1Wr393eR9Ow8Pnno8hGhilcxC8CTokk3Rbdm4pe"
    access_token = "1156588481197613056-ZM2T5SnCDqe50GGGfsN3kVzhJcU2jw"
    access_token_secret = "D6GavezgylIQ2JnDmk8s1yY91qJzHK2PcY0abmm3x8N45"

    ck1 = '9g47vtbaoLrL6UdZpalP3wziI'
    cs1 = 'It8TB4S5WpcZTem8eK1a3yh3MuW49LIJgQcUT1E8VfMbO0JdOJ'
    at1 = '1127480596337266688-5rBAkBZS5u5nQWq9JrhNeYMVFDt7ro'
    as1 = '8cYbgEQUvcFdesxpiojDVp2ZqP9UPqnzDiSF2KjX7wGJ5'


    ck2 = "oFY1p72UPiLol61ITagJEvEcE"
    cs2 = "jJJRjLn747wF1MNsMGA8YExx9IjqRvXeSpmJuAHik43cCREz6a"
    at2 = "1121229845524959233-0VCTkzW11H4ALmEPFHAyFoVzUk0JBL"
    as2 = "WKTJT16jfijSvuRGFneHHbSdkCi35bQlXnYfWjPJ72QBL"

    ck3 = 'A5KRagrcPWbwUF7UkguySO5au'
    cs3 = 'yfKVPUWHrrtVmwvBzrGecZvBvISQwZ48xNkgvfweN8dYt3lmES'
    at3 = '1126754709421715458-Ttxz0zua58zI9EIAAVEuXgmX6c0m2F'
    as3 = 'PHQ1CZBLPP5xHNHr8Uvt0mLpzUrgoqojDJcc2Z6j5tHJi'

    api0 = tweet_api(consumer_key, consumer_secret, access_token, access_token_secret).api
    api1 = tweet_api(ck1,cs1,at1,as1).api
    api2 = tweet_api(ck2,cs2,at2,as2).api
    api3 = tweet_api(ck3,cs3,at3,as3).api
            
    print("---step 1---")
    couch = MyCouchDB('testdb')

    CP = ["theresa_may", "BorisJohnson", "David_Cameron"]    #conservative party
    LP = ["jeremycorbyn" ]   #Labour Party
    LDP = ["joswinson", "LibDems","vincecable", "David_Cameron"]  #Liberal Democrat Party

    tc_CP = twitter_client(CP, couch, api1)
    tc_LP = twitter_client(LP, couch, api2)
    tc_LDP = twitter_client(LDP, couch, api3)
    print("---step 2---")
    t0 = threading.Thread(target = startStream, args= [couch, api0], daemon=True)
    t1 = threading.Thread(target = tc_CP.start_fetch, daemon=True)
    t2 = threading.Thread(target = tc_LP.start_fetch, daemon=True)
    t3 = threading.Thread(target = tc_LDP.start_fetch, daemon=True)
    
    t0.start()
    t1.start()
    t2.start()
    t3.start()

    t0.join()
    t1.join()
    t2.join()
    t3.join()
    print("---step 3---")



