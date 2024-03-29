
// ------- data loading --- and processing data ------ 

var positive = <%- result.positive %>;
var negative = <%- result.negative %>;

var total_sup_2016 = positive["sup_2016"];
var total_sup_2017 = positive["sup_2017"];
var total_sup_2018 = positive["sup_2018"];
var total_sup_2019 = positive["sup_2019"];

var total_ops_2016 = negative["ops_2016"];
var total_ops_2017 = negative["ops_2017"];
var total_ops_2018 = negative["ops_2018"];
var total_ops_2019 = negative["ops_2019"];

var positive_total = []
positive_total.push(total_sup_2016, total_sup_2017, total_sup_2018, total_sup_2019);
console.log(positive_total)

var negative_total = []
negative_total.push(total_ops_2016, total_ops_2017, total_ops_2018, total_ops_2019);

var city_to_LL = {'York, North Yorkshire': ['53.958332', '-1.080278'], 'Worcester, Worcestershire': ['52.192001', '-2.220000'], 'Winchester, Hampshire': ['51.063202', '-1.308000'], 'Wells, South West England': ['51.209000', '-2.647000'], 'Wakefield, West Yorkshire': ['53.680000', '-1.490000'], 'Truro, Cornwall': ['50.259998', '-5.051000'], 'Sunderland, North East': ['54.906101', '-1.381130'], 'Sheffield, South Yorkshire': ['53.383331', '-1.466667'], 'Salford, North West': ['53.483002', '-2.293100'], 'St. Davids, Wales': ['51.882000', '-5.269000'], 'St.Albans, Hertfordshire': ['51.755001', '-0.336000'], 'Ripon, North Yorkshire': ['54.138000', '-1.524000'], 'Portsmouth, Hampshire': ['50.805832', '-1.087222'], 'Perth, Scotland': ['56.396999', '-3.437000'], 'Nottingham': ['52.950001', '-1.150000'], 'Newry, Northern Ireland': ['54.175999', '-6.349000'], 'Newcastle upon Tyne, North East England': ['54.966667', '-1.600000'], 'Liverpool, Merseyside': ['53.400002', '-2.983333'], 'Lincoln, Lincolnshire': ['53.234444', '-0.538611'], 'Lichfield, Staffordshire': ['52.683498', '-1.826530'], 'Leicester, the East Midlands': ['52.633331', '-1.133333'], 'Lancaster, Lancashire': ['54.047001', '-2.801000'], 'Hereford, Herefordshire': ['52.056499', '-2.716000'], 'Gloucester, Gloucestershire': ['51.864445', '-2.244444'], 'Glasgow, Scotland': ['55.860916', '-4.251433'], 'Exeter': ['50.716667', '-3.533333'], 'Ely, Cambridgeshire': ['52.398056', '0.262222'], 'Durham': ['54.776100', '-1.573300'], 'Dundee, Scotland': ['56.462002', '-2.970700'], 'Derry, Northern Ireland': ['54.995800', '-7.307400'], 'Derby, Derbyshire': ['52.916668', '-1.466667'], 'Coventry, West Midlands': ['52.408054', '-1.510556'], 'Chichester, West Sussex': ['50.836498', '-0.779200'], 'Chester, Chesire': ['53.189999', '-2.890000'], 'Chelmsford, Essex': ['51.736099', '0.479800'], 'Carlisle, North West': ['54.890999', '-2.944000'], 'Canterbury, Kent': ['51.279999', '1.080000'], 'Cambridge, Cambridgeshire': ['52.205276', '0.119167'], 'Brighton & Hove, East Sussex': ['50.827778', '-0.152778'], 'Bradford, West Yorkshire': ['53.799999', '-1.750000'], 'Bath, Somerset': ['51.380001', '-2.360000'], 'Peterborough, Cambridgeshire': ['52.573921', '-0.250830'], 'Elgin, Scotland': ['57.653484', '-3.335724'], 'Stoke-on-Trent, Staffordshire': ['53.002666', '-2.179404'], 'Solihull, Birmingham': ['52.412811', '-1.778197'], 'Cardiff, Cardiff county': ['51.481583', '-3.179090'], 'Eastbourne, East Sussex': ['50.768036', '0.290472'], 'Oxford, Oxfordshire': ['51.752022', '-1.257677'], 'London': ['51.509865', '-0.118092'], 'Swindon, Swindon': ['51.568535', '-1.772232']}

var majorCities = ['York, North Yorkshire', 'Worcester, Worcestershire', 'Winchester, Hampshire', 'Wells, South West England', 'Wakefield, West Yorkshire', 'Truro, Cornwall', 'Sunderland, North East', 'Sheffield, South Yorkshire', 'Salford, North West', 'St. Davids, Wales', 'St.Albans, Hertfordshire', 'Ripon, North Yorkshire', 'Portsmouth, Hampshire', 'Perth, Scotland', 'Nottingham', 'Newry, Northern Ireland', 'Newcastle upon Tyne, North East England', 'Liverpool, Merseyside', 'Lincoln, Lincolnshire', 'Lichfield, Staffordshire', 'Leicester, the East Midlands', 'Lancaster, Lancashire', 'Hereford, Herefordshire', 'Gloucester, Gloucestershire', 'Glasgow, Scotland', 'Exeter', 'Ely, Cambridgeshire', 'Durham', 'Dundee, Scotland', 'Derry, Northern Ireland', 'Derby, Derbyshire', 'Coventry, West Midlands', 'Chichester, West Sussex', 'Chester, Chesire', 'Chelmsford, Essex', 'Carlisle, North West', 'Canterbury, Kent', 'Cambridge, Cambridgeshire', 'Brighton & Hove, East Sussex', 'Bradford, West Yorkshire', 'Bath, Somerset', 'Peterborough, Cambridgeshire', 'Elgin, Scotland', 'Stoke-on-Trent, Staffordshire', 'Solihull, Birmingham', 'Cardiff, Cardiff county', 'Eastbourne, East Sussex', 'Oxford, Oxfordshire', 'London', 'Swindon, Swindon'];


var positive_location = <%- result.location_positive %>;
var negative_location = <%- result.location_negative %>; 


var positive_location_total = {};
var negative_location_total = {};


var sup_2016 = [];
var sup_2017 = [];
var sup_2018 = [];
var sup_2019 = [];



var ops_2016 = [];
var ops_2017 = [];
var ops_2018 = [];
var ops_2019 = [];




majorCities.forEach(function(city){

    console.log(city);
    // positive

    if (positive_location.sup_2016[city] == undefined){
        sup_2016.push(0);
    }else{
        sup_2016.push(positive_location.sup_2016[city]);
    };

    if (positive_location.sup_2017[city] == undefined){
        sup_2017.push(0);
    }else{
        sup_2017.push(positive_location.sup_2017[city]);
    };

    if (positive_location.sup_2018[city] == undefined){
        sup_2018.push(0);
    }else{
        sup_2018.push(positive_location.sup_2018[city]);
    };

    if (positive_location.sup_2019[city] == undefined){
        sup_2019.push(0);
    }else{
        sup_2019.push(positive_location.sup_2019[city]);
    };


    // negative


    if (negative_location.ops_2016[city] == undefined){
        ops_2016.push(0);
    }else{
        ops_2016.push(negative_location.ops_2016[city]);
    };

    if (negative_location.ops_2017[city] == undefined){
        ops_2017.push(0);
    }else{
        ops_2017.push(negative_location.ops_2017[city]);
    };

    if (negative_location.ops_2018[city] == undefined){
        ops_2018.push(0);
    }else{
        ops_2018.push(negative_location.ops_2018[city]);
    };

    if (negative_location.ops_2019[city] == undefined){
        ops_2019.push(0);
    }else{
        ops_2019.push(negative_location.ops_2019[city]);
    };

});




// ------ heatmap -------- //


function initMap() {

    // set up map
    var map_sup_2016 = new google.maps.Map(document.getElementById('map_sup_2016'), {
        zoom: 5,
        center: {lat: 50.736129, lng: -1.988229},
        mapTypeId: 'terrain'
    });

    var map_sup_2017 = new google.maps.Map(document.getElementById('map_sup_2017'), {
        zoom: 5,
        center: {lat: 50.736129, lng: -1.988229},
        mapTypeId: 'terrain'
    });

    var map_sup_2018 = new google.maps.Map(document.getElementById('map_sup_2018'), {
        zoom: 5,
        center: {lat: 50.736129, lng: -1.988229},
        mapTypeId: 'terrain'
    });

    var map_sup_2019 = new google.maps.Map(document.getElementById('map_sup_2019'), {
        zoom: 5,
        center: {lat: 50.736129, lng: -1.988229},
        mapTypeId: 'terrain'
    });


    var map_ops_2016 = new google.maps.Map(document.getElementById('map_ops_2016'), {
        zoom: 5,
        center: {lat: 50.736129, lng: -1.988229},
        mapTypeId: 'terrain'
    });

    var map_ops_2017 = new google.maps.Map(document.getElementById('map_ops_2017'), {
        zoom: 5,
        center: {lat: 50.736129, lng: -1.988229},
        mapTypeId: 'terrain'
    });

    var map_ops_2018 = new google.maps.Map(document.getElementById('map_ops_2018'), {
        zoom: 5,
        center: {lat: 50.736129, lng: -1.988229},
        mapTypeId: 'terrain'
    });

    var map_ops_2019 = new google.maps.Map(document.getElementById('map_ops_2019'), {
        zoom: 5,
        center: {lat: 50.736129, lng: -1.988229},
        mapTypeId: 'terrain'
    });


    // get heat map data


    var heatmapData_sup_2016 = [];
    var heatmapData_sup_2017 = [];
    var heatmapData_sup_2018 = [];
    var heatmapData_sup_2019 = [];

    var heatmapData_ops_2016 = [];
    var heatmapData_ops_2017 = [];
    var heatmapData_ops_2018 = [];
    var heatmapData_ops_2019 = [];

    for (var i = 0; i < majorCities.length; i++){
        var location = majorCities[i];
        var lat = city_to_LL[location][0];
        var lng = city_to_LL[location][1];

        heatmapData_sup_2016.push({location: new google.maps.LatLng(lat, lng), weight: sup_2016[i]});
        heatmapData_sup_2017.push({location: new google.maps.LatLng(lat, lng), weight: sup_2017[i]});
        heatmapData_sup_2018.push({location: new google.maps.LatLng(lat, lng), weight: sup_2018[i]});
        heatmapData_sup_2019.push({location: new google.maps.LatLng(lat, lng), weight: sup_2019[i]});

        heatmapData_ops_2016.push({location: new google.maps.LatLng(lat, lng), weight: ops_2016[i]});
        heatmapData_ops_2017.push({location: new google.maps.LatLng(lat, lng), weight: ops_2017[i]});
        heatmapData_ops_2018.push({location: new google.maps.LatLng(lat, lng), weight: ops_2018[i]});
        heatmapData_ops_2019.push({location: new google.maps.LatLng(lat, lng), weight: ops_2019[i]});
    };



    var heatmap_sup_2016 = new google.maps.visualization.HeatmapLayer({
        data: heatmapData_sup_2016,
        dissipating: true,
        maxIntensity: 20,
        opacity: 0.8,
        map: map_sup_2016
    });

    var heatmap_sup_2017 = new google.maps.visualization.HeatmapLayer({
        data: heatmapData_sup_2017,
        dissipating: true,
        maxIntensity: 20,
        opacity: 0.8,
        map: map_sup_2017
    });

    var heatmap_sup_2018 = new google.maps.visualization.HeatmapLayer({
        data: heatmapData_sup_2018,
        dissipating: true,
        maxIntensity: 20,
        opacity: 0.8,
        map: map_sup_2018
    });

    var heatmap_sup_2019 = new google.maps.visualization.HeatmapLayer({
        data: heatmapData_sup_2019,
        dissipating: true,
        maxIntensity: 20,
        opacity: 0.8,
        map: map_sup_2019
    });

    var heatmap_ops_2016 = new google.maps.visualization.HeatmapLayer({
        data: heatmapData_ops_2016,
        dissipating: true,
        maxIntensity: 20,
        opacity: 0.8,
        map: map_ops_2016
    });

    var heatmap_ops_2017 = new google.maps.visualization.HeatmapLayer({
        data: heatmapData_ops_2017,
        dissipating: true,
        maxIntensity: 20,
        opacity: 0.8,
        map: map_ops_2017
    });

    var heatmap_ops_2018 = new google.maps.visualization.HeatmapLayer({
        data: heatmapData_sup_2018,
        dissipating: true,
        maxIntensity: 20,
        opacity: 0.8,
        map: map_ops_2018
    });

    var heatmap_ops_2019 = new google.maps.visualization.HeatmapLayer({
        data: heatmapData_sup_2019,
        dissipating: true,
        maxIntensity: 20,
        opacity: 0.8,
        map: map_ops_2019
    });


}





// ----- Overall -----//


Highcharts.chart('total_trend', {

    title: {
        text: 'Number of Support Brexit twitter users, 2016-2019'
    },

    yAxis: {
        title: {
            text: 'Semtiment change'
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },

    plotOptions: {
        series: {
            label: {
                connectorAllowed: false
            },
            pointStart: 2016
        }
    },

    series: [{
        name: 'Support',
        data: positive_total
    }, {
        name: 'Oppose',
        data: negative_total
    }],

    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }

});



    // ------ 2016 -------


Highcharts.chart('location_situation_2016', {
    chart: {
        type: 'bar'
    },
    title: {
        text: 'Historic World Population by Region'
    },
    xAxis: {
        categories: majorCities,
        title: {
            text: "London"
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Population',
            align: 'median'
        },
        labels: {
            overflow: 'justify'
        }
    },  
    plotOptions: {
        bar: {
            dataLabels: {
                enabled: true
            }
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 80,
        floating: true,
        borderWidth: 1,
        backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
        shadow: true
    },
    credits: {
        enabled: false
    },


    series: [{
            name: 'Support at 2016',
            data: sup_2016
        },

        {
            name: 'Oppose at 2016',
            data: ops_2016
        }
    ]
});



// ------ 2017 -------


Highcharts.chart('location_situation_2017', {
    chart: {
        type: 'bar'
    },
    title: {
        text: 'Historic World Population by Region'
    },
    xAxis: {
        categories: majorCities,
        title: {
            text: "London"
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Population',
            align: 'median'
        },
        labels: {
            overflow: 'justify'
        }
    },  
    plotOptions: {
        bar: {
            dataLabels: {
                enabled: true
            }
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 80,
        floating: true,
        borderWidth: 1,
        backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
        shadow: true
    },
    credits: {
        enabled: false
    },


    series: [
        {
            name: 'Support at 2017',
            data: sup_2017
        },

        {
            name: 'Oppose at 2017',
            data: ops_2017
        },
    ]
});




    // ------ 2018 -------


Highcharts.chart('location_situation_2018', {
    chart: {
        type: 'bar'
    },
    title: {
        text: 'Historic World Population by Region'
    },
    xAxis: {
        categories: majorCities,
        title: {
            text: "London"
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Population',
            align: 'median'
        },
        labels: {
            overflow: 'justify'
        }
    },  
    plotOptions: {
        bar: {
            dataLabels: {
                enabled: true
            }
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 80,
        floating: true,
        borderWidth: 1,
        backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
        shadow: true
    },
    credits: {
        enabled: false
    },


    series: [
        {
            name: 'Support at 2018',
            data: sup_2018
        },

        {
            name: 'Oppose at 2018',
            data: ops_2018
        }
    ]
});



// ------ 2019 -------

Highcharts.chart('location_situation_2019', {
    chart: {
        type: 'bar'
    },
    title: {
        text: 'Historic World Population by Region'
    },
    xAxis: {
        categories: majorCities,
        title: {
            text: "London"
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Population',
            align: 'median'
        },
        labels: {
            overflow: 'justify'
        }
    },  
    plotOptions: {
        bar: {
            dataLabels: {
                enabled: true
            }
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 80,
        floating: true,
        borderWidth: 1,
        backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
        shadow: true
    },
    credits: {
        enabled: false
    },


    series: [
        {
            name: 'Support at 2019',
            data: sup_2019
        },
        {
            name: 'Oppose at 2019',
            data: ops_2019
        }
    ]
});
