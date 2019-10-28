const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const request = require('request');
const fs = require('fs')

const app = express();

var port = 3000;

let dbname = 'testdb'

let processed_dbname = 'testdb'
let host_name = 'localhost'

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use(express.static(__dirname));
app.use(express.static('views'));




app.get('/',function(req, resp){

    positive = {};
    negative = {};
    result = {};

    location_positive = {};
    location_negative = {};

    location_positive_2016 = {};
    location_positive_2017 = {};
    location_positive_2018 = {};
    location_positive_2019 = {};

    location_negative_2016 = {};
    location_negative_2017 = {};
    location_negative_2018 = {};
    location_negative_2019 = {};



    // ---- 2016 p
    request('http://127.0.0.1:5984/testdb/_design/Support/_view/Sup2016', (err, res, body)=>{
        if (err) {console.log(err);}
        // console.log("2016 p:" + JSON.parse(body).total_rows);


        var pos_2016 = JSON.parse(body).total_rows;
        positive["sup_2016"] = pos_2016;

        accounts = JSON.parse(body).rows
        accounts.forEach(function(account){
            key = account.value.location
            if (location_positive_2016[key] == undefined){
                location_positive_2016[key] = 1;
            }else{
                location_positive_2016[key] += 1;
            };

            key = account.value.location
            if (location_positive_2016[key] == undefined){
                location_positive_2016[key] = 1;
            }else{
                location_positive_2016[key] += 1;
            };

        })

        // ---- 2017 p
        request('http://127.0.0.1:5984/testdb/_design/Support/_view/Sup2017', (err, res, body)=>{
            if (err) {console.log(err);}
            // console.log("2017 p:" + JSON.parse(body).total_rows);
            var pos_2017 = JSON.parse(body).total_rows;
            positive["sup_2017"] = pos_2017;


            accounts = JSON.parse(body).rows
            accounts.forEach(function(account){
                key = account.value.location
                if (location_positive_2017[key] == undefined){
                    location_positive_2017[key] = 1;
                }else{
                    location_positive_2017[key] += 1;
                };

            })

            // ---- 2018 p
            request('http://127.0.0.1:5984/testdb/_design/Support/_view/Sup2018', (err, res, body)=>{
                if (err) {console.log(err);}
                // console.log("2018 p:" + JSON.parse(body).total_rows);
                var pos_2018 = JSON.parse(body).total_rows;
                positive["sup_2018"] = pos_2018;


                accounts = JSON.parse(body).rows
                accounts.forEach(function(account){
                    key = account.value.location
                    if (location_positive_2018[key] == undefined){
                        location_positive_2018[key] = 1;
                    }else{
                        location_positive_2018[key] += 1;
                    };
                })

                //---- 2019 p
                request('http://127.0.0.1:5984/testdb/_design/Support/_view/Sup2019', (err, res, body)=>{
                    if (err) {console.log(err);}
                    // console.log("2019 p:" + JSON.parse(body).total_rows);
                    var pos_2019 = JSON.parse(body).total_rows;
                    positive["sup_2019"] = pos_2019;



                    accounts = JSON.parse(body).rows
                    accounts.forEach(function(account){
                        key = account.value.location
                        if (location_positive_2019[key] == undefined){
                            location_positive_2019[key] = 1;
                        }else{
                            location_positive_2019[key] += 1;
                        };
                    })

                    // ---- 2016 n
                    request('http://127.0.0.1:5984/testdb/_design/Oppose/_view/Ops2016', (err, res, body)=>{
                        if (err) {console.log(err);}
                        //console.log("2016 n:" + JSON.parse(body).total_rows);
                        var neg_2016 = JSON.parse(body).total_rows;
                        negative["ops_2016"] = neg_2016;

                        accounts = JSON.parse(body).rows
                        accounts.forEach(function(account){
                            key = account.value.location
                            if (location_negative_2016[key] == undefined){
                                location_negative_2016[key] = 1;
                            }else{
                                location_negative_2016[key] += 1;
                            };
                        })                        

                        // ---- 2017 n
                        request('http://127.0.0.1:5984/testdb/_design/Oppose/_view/Ops2017', (err, res, body)=>{
                            if (err) {console.log(err);}
                            // console.log("2017 n:" + JSON.parse(body).total_rows);
                            var neg_2017 = JSON.parse(body).total_rows;
                            negative["ops_2017"] = neg_2017;


                            accounts = JSON.parse(body).rows
                            accounts.forEach(function(account){
                                key = account.value.location
                                if (location_negative_2017[key] == undefined){
                                    location_negative_2017[key] = 1;
                                }else{
                                    location_negative_2017[key] += 1;
                                };
                            })     


                            // ---- 2018 n
                            request('http://127.0.0.1:5984/testdb/_design/Oppose/_view/Ops2018', (err, res, body)=>{
                                if (err) {console.log(err);}

                                // console.log("2018 n:" + JSON.parse(body).total_rows);
                                var neg_2018 = JSON.parse(body).total_rows;
                                negative["ops_2018"] = neg_2018;

                                accounts = JSON.parse(body).rows
                                accounts.forEach(function(account){
                                    key = account.value.location
                                    if (location_negative_2018[key] == undefined){
                                        location_negative_2018[key] = 1;
                                    }else{
                                        location_negative_2018[key] += 1;
                                    };
                                })                              

                                // ---- 2019 n
                                request('http://127.0.0.1:5984/testdb/_design/Oppose/_view/Ops2019', (err, res, body)=>{
                                    if (err) {console.log(err);}

                                    // console.log("2019 n:" + JSON.parse(body).total_rows);
                                    var neg_2019 = JSON.parse(body).total_rows;
                                    negative["ops_2019"] = neg_2019;


                                    accounts = JSON.parse(body).rows
                                    accounts.forEach(function(account){
                                        key = account.value.location
                                        if (location_negative_2019[key] == undefined){
                                            location_negative_2019[key] = 1;
                                        }else{
                                            location_negative_2019[key] += 1;
                                        };
                                    })    


                                    location_positive["sup_2016"] = location_positive_2016;
                                    location_positive["sup_2017"] = location_positive_2017;
                                    location_positive["sup_2018"] = location_positive_2018;
                                    location_positive["sup_2019"] = location_positive_2019;


                                    location_negative["ops_2016"] = location_negative_2016;
                                    location_negative["ops_2017"] = location_negative_2017;
                                    location_negative["ops_2018"] = location_negative_2018;
                                    location_negative["ops_2019"] = location_negative_2019;

                                    result["positive"] = JSON.stringify(positive);
                                    result["negative"] = JSON.stringify(negative);

                                    console.log("one request");


                                    result["location_positive"] = JSON.stringify(location_positive);
                                    result["location_negative"] = JSON.stringify(location_negative);    



                                    // console.log(result);
                                    resp.render('index', result);  
                                    //resp.sendFile(path.join(__dirname, "views/dv.js"))  
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});


app.listen(port, function(){
    console.log('app running');
});
        
