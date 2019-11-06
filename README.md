README.md

Demonstration via youtube link in the report.

Steps:
start web server:
1. cd Brexit
2. cd web_Brexit
3. node app

create http tunnel:
1. cd Brexit 
2. ./ngrok http -region au 3000

web_Brexit: scripts for maintain website for data visualization.
py_Brexit: scipts for fetching twitter users/ create views for couchDB.

note: account and password are removed for confidential purpose.
      and ngrok is not in github. it required install and indentifcation in terminal 
      
      
06/10/2019: since my ngrok account is free (cannot have my own domain - eacn time start ngrok with random url 
when working with nohup &, no log print out -> no random url show up (cannot find url with free ngrok account)
therefore, each time open the visualization website, need to mannual depoly ngrok in ubutun).
