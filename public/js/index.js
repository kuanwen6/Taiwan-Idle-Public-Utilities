var citys = [
    ['台北市','新北市','基隆市','桃園市','新竹市','新竹縣','宜蘭縣','苗栗縣','台中市','彰化縣','南投縣','雲林縣','花蓮縣','台東縣','嘉義市','嘉義縣','台南市','高雄市','屏東縣','澎湖縣','金門縣','連江縣'],
    ['台北市','新北市','基隆市','桃園市','新竹市','新竹縣','宜蘭縣'],
    ['苗栗縣','台中市','彰化縣','南投縣','雲林縣'],
    ['花蓮縣','台東縣'],
    ['嘉義市','嘉義縣','台南市','高雄市','屏東縣','澎湖縣'],
    ['金門縣','連江縣']
]

var dataColumn =  ["name","address","supervisor","manager","date","cost","type"]


var mymap, globalData;
var markers = new L.LayerGroup();


var normalIcon = L.AwesomeMarkers.icon({ icon: 'home', markerColor: 'red', prefix: 'fa' });
var normalBuildingIcon = L.AwesomeMarkers.icon({ icon: 'industry', markerColor: 'orange', prefix: 'fa' });
var trafficIcon = L.AwesomeMarkers.icon({ icon: 'bus', markerColor: 'cadetblue', prefix: 'fa' });
var humanitieIcon = L.AwesomeMarkers.icon({ icon: 'users', markerColor: 'green', prefix: 'fa' });
var businessIcon = L.AwesomeMarkers.icon({ icon: 'suitcase', markerColor: 'blue', prefix: 'fa' });
var sightIcon = L.AwesomeMarkers.icon({ icon: 'flag', markerColor: 'darkgreen', prefix: 'fa' }); 
var militaryIcon = L.AwesomeMarkers.icon({ icon: 'bomb', markerColor: 'purple', prefix: 'fa' });
var marketIcon = L.AwesomeMarkers.icon({ icon: 'shopping-cart', markerColor: 'darkred', prefix: 'fa' });
var buyIcon  = L.AwesomeMarkers.icon({ icon: 'handshake-o', markerColor: 'darkpurple', prefix: 'fa' });
var sport = L.AwesomeMarkers.icon({ icon: 'building', markerColor: 'orange', prefix: 'fa' });

var icons = {
    '其他': {
        'color':'#d63e2a',
        'icon': 'fa fa-home',
        'marker': normalIcon
    } ,
    '社福設施暨活動中心': {
        'color':'#72af26',
        'icon': 'fa fa-users',
        'marker': humanitieIcon
    },
    '交通建設': {
        'color':'#436877',
        'icon': 'fa fa-bus',
        'marker': trafficIcon
    },
    '工商園區': {
        'color':'#38a7d9',
        'icon': 'fa fa-suitcase',
        'marker': businessIcon
    },
    '體育場館': {
        'color':'#f2942f',
        'icon': 'fa fa-building',
        'marker': sport
    },
    '產業展售場館暨直銷中心': {
        'color':'#5b3a6a',
        'icon': 'fa fa-handshake-o',
        'marker': buyIcon
    },
    '工程設施': {
        'color':'#f2942f',
        'icon': 'fa fa-industry',
        'marker': normalBuildingIcon
    },
    '軍事設施': {
        'color':'#d252b9',
        'icon': 'fa fa-bomb',
        'marker': militaryIcon
    },
    '市場': {
        'color':'#a23336',
        'icon': 'fa fa-shopping-cart',
        'marker': marketIcon
    },
    '休閒育樂設施': {
        'color':'#718225',
        'icon': 'fa fa-flag',
        'marker': sightIcon
    }
}

var keys = Object.keys(icons);

function openNav() {
    document.getElementById("mySidenav").style.width = "390px";
    document.getElementById("mySidenav").style.boxShadow="4px 4px 12px 4px rgba(20%,20%,40%,0.5)";
    document.getElementById("main").style.marginLeft = "190px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("mySidenav").style.boxShadow="none";
    document.getElementById("main").style.marginLeft = "0";
}

function openFullNav() {
    document.getElementById("mySidenav2").style.width = "100%";
}

function closeFullNav() {
    document.getElementById("mySidenav2").style.width = "0";
}

function sortNumber(a,b) {
    return a - b;
}

function openPlot(plot) {
    openFullNav();

    if (plot == 'type') {
        $('#plot-title').html('<i class="fa fa-list-ol"></i>&nbsp;&nbsp;&nbsp;&nbsp;閒置公共設施類型分佈');
        $('.bulleted > .item').html('閒置公共設施類型分佈/個數長條圖');
        $('.plot-content').html('<p class="sec-title">-哪種類型的蚊子館分佈最多呢？文教？社福建設？-</p>' +
                                                '<div class="plot-description"><span>閒置公共設施有各式各樣的類型，</span><br>' +
                                                '<span>舉凡體育場館、社福機構、軍事設施甚至是廁所都可能是蚊子館，</span><br>' +
                                                '<span>其中又是在哪個類型興建的最多呢？</span><br>' +
                                                '<span>到底是什麼東西可以讓政府如此樂此不疲的加蓋呢？讓我們一起來看看吧！<span></div><br><div class="ui segment"><div class="plot-table" style="padding: 1rem 1rem 1rem 1rem;"></div></div>');

        $('.plot-table').html('<div id="plot-area2" style="margin: 0 auto;width: 220px;text-align: center;"></div>');

        var type_count = {};
        for (var i=0; i<keys.length; i++) {
            type_count[keys[i]] = 0;
        }

        globalData.forEach(function(place) {
            if (place.type in type_count) {
                type_count[place.type] = type_count[place.type] + 1;
            } else {
                type_count['其他'] = type_count['其他'] + 1;
            }
        })

        var columnsData = ['閒置公共設施類型'];
        for (var i=0; i<keys.length; i++) {
            columnsData.push(type_count[keys[i]]);
        }

        console.log(type_count);

        var chart = c3.generate({
            bindto: '#plot-area',
            data: {
                columns: [
                    columnsData,
                ],
                type: 'bar'
            },
            bar: {
                width: {
                    ratio: 0.5 // this makes bar width 50% of length between ticks
                }
                // or
                //width: 100 // this makes bar width 100px
            },
            axis: {
                x: {
                    type: 'category',
                    categories: keys,
                    tick: {
                        rotate: -30,
                        multiline: false
                    },
                }
            },
            tooltip: {
                format: {
                    title: function (d) { return keys[d]; },
                    value: function (value, ratio, id) {
                        return value.toString() + ' 個';
                    }
                }
            }
        });

        var resizeChart = setInterval(function(){
            chart.resize();
        },50)

        setTimeout(function(){
            clearInterval(resizeChart);
        },800)

        var columnsData2 = [];
        for (var j=0; j<keys.length; j++) {
            columnsData2.push([keys[j], type_count[keys[j]]]);
        }

        var chart2 = c3.generate({
            bindto: '#plot-area2',
            data: {
                columns: columnsData2,
                type : 'donut',
                onclick: function (d, i) { console.log("onclick", d, i); },
                onmouseover: function (d, i) { console.log("onmouseover", d, i); },
                onmouseout: function (d, i) { console.log("onmouseout", d, i); }
            },
            donut: {
                title: "蚊子館類型分佈"
            }
        });

        var resizeChart2 = setInterval(function(){
            chart2.resize();
        },50)

        setTimeout(function(){
            clearInterval(resizeChart2);
        },800)

        $('.plot-table').append('<p style="color:red;font-weight:bold;">＊ 點擊圖標可篩選所選類別</p>');
        
    } else if (plot == 'build') {
        var count = [0,0,0,0,0,0,0]
        globalData.forEach(function(place) {
            if (place.startYear != null) {
                y = place.startYear;
                index = Math.floor((y - 1950) / 10);
                if (index < 0)
                    index=0;
                count[index] = count[index] + 1;
            }
        })

        
        var tmp = count.slice();
        tmp.sort(sortNumber);
            

        $('#plot-title').html('<i class="fa fa-calendar"></i>&nbsp;&nbsp;&nbsp;&nbsp;設施開工年份分佈');
        $('.bulleted > .item').html('設施開工年份分佈/個數折線圖');
        $('.plot-content').html('<p class="sec-title">-政府到底是從哪一年開始建造這些蚊子館的呢？-</p>' +
                                                '<div class="plot-description"><span>閒置公共設施每年隨著時間不斷的增加，</span><br>' +
                                                '<span>那怕舉債累累，政府卻依舊好似沒有看見一般，不斷的在各地興建所謂的「蚊子館」。</span><br>' +
                                                '<span>其中又是在哪個年份興建最多呢？</span><br>' +
                                                '<span>其中是否有些緣由？讓我們一起來看看吧！<span></div><br><div class="ui segment"><div class="plot-table" style="padding: 1rem 1rem 1rem 1rem;"></div></div>')

        $('.plot-table').html('<table class="ui very basic collapsing celled table" style="margin: 0 auto;width: 220px;text-align: center;">' +
        '<thead>'+
          '<tr><th>年代</th><th>數目</th>'+
        '</tr></thead>'+
        '<tbody class="plot-table-body">'+

        '</tbody>'+
      '</table>')

      for (var i=0; i<7; i++) {
        switch (count[i]) {
            case tmp[6]:
                img_url = '<img src="img/first.svg" class="ui mini rounded image">';
                break;
            case tmp[5]:
                img_url = '<img src="img/second.svg" class="ui mini rounded image">';
                break;
            case tmp[4]:
                img_url = '<img src="img/third.svg" class="ui mini rounded image">';
                break;
            default:
                img_url = '<i class="ellipsis horizontal icon ui mini rounded" style="width: 30px;"></i>';
        }

        $('.plot-table-body').append('<tr><td>'+
                '<h4 class="ui image header">'+
                img_url +
                '<div class="content">'+
                    (1950+i*10)+' 年代'+
                '</div>'+
                '</div>'+
            '</h4></td>'+
            '<td>'+
                count[i]+
            '</td></tr>')
      }

        var chart = c3.generate({
            bindto: '#plot-area',
            data: {
                columns: [
                    ['閒置公共設施數目', count[0], count[1], count[2], count[3], count[4], count[5], count[6]],
                ], 
                //type: 'area',
            },
            axis: {
                x: {
                    type: 'category',
                    categories: ['~1950s', '1960s', '1970s', '1980s', '1990s', '2000s', '2010s']
                }
            },
            tooltip: {
                format: {
                    title: function (d) { return  (1950 + d*10).toString() + ' 年代'; },
                    value: function (value, ratio, id) {
                        return value.toString() + ' 個';
                    }
                }
            }
        });

        var resizeChart = setInterval(function(){
            chart.resize();
        },50)

        setTimeout(function(){
            clearInterval(resizeChart);
        },800)
    } else if (plot == 'location') {
        var count = [0,0,0,0,0,0,0]
        globalData.forEach(function(place) {
            y = place.startYear;
            index = Math.floor((y - 1950) / 10);
            count[index] = count[index] + 1
        })

        
        var tmp = count.slice();
        tmp.sort(sortNumber);
            

        $('#plot-title').html('<i class="fa fa-map"></i>&nbsp;&nbsp;&nbsp;&nbsp;各地區閒置公共設施數目統計');
        $('.bulleted > .item').html('各地區閒置公共設施/個數長條圖');
        $('.plot-content').html('<p class="sec-title">-是哪個縣市蓋了最多的蚊子館呢？-</p>' +
                                                '<div class="plot-description"><span>閒置公共設施分布在各個縣市，</span><br>' +
                                                '<span>從台北、新竹...到高雄，甚至是金馬外島都有。</span><br>' +
                                                '<span>其中又是在哪個縣市興建的最多呢？</span><br>' +
                                                '<span>到底是哪個縣市有這個閒錢呢？讓我們一起來看看吧！<span></div><br><div class="ui segment"><div class="plot-table" style="padding: 1rem 1rem 1rem 1rem;"></div></div>');

        $('.plot-table').html('<div id="plot-area2" style="margin: 0 auto;width: 220px;text-align: center;"></div>');

        var place_count = {};
        for (var i=0; i<citys[0].length; i++) {
            place_count[citys[0][i]] = 0;
        }

        globalData.forEach(function(place) {
            place_count[place.location] = place_count[place.location] + 1;
        })

        var columnsData = ['閒置公共設施所在地區'];
        for (var i=0; i<citys[0].length; i++) {
            columnsData.push(place_count[citys[0][i]]);
        }

        var chart = c3.generate({
            bindto: '#plot-area',
            data: {
                columns: [
                    columnsData,
                ],
                type: 'bar'
            },
            bar: {
                width: {
                    ratio: 0.5 // this makes bar width 50% of length between ticks
                }
                // or
                //width: 100 // this makes bar width 100px
            },
            axis: {
                x: {
                    type: 'category',
                    categories: citys[0],
                },
                rotated: true,
                y : {
                    tick: {
                        format: function(x) { return x % 1 === 0 ? x : ''; }
                    }
                }
            },
            tooltip: {
                format: {
                    title: function (d) { return citys[0][d]; },
                    value: function (value, ratio, id) {
                        return value.toString() + ' 個';
                    }
                }
            }
        });

        var resizeChart = setInterval(function(){
            chart.resize();
        },50)

        setTimeout(function(){
            clearInterval(resizeChart);
        },800)

        var columnsData2 = [];
        for (var j=0; j<keys.length; j++) {
            columnsData2.push([citys[0][j], place_count[citys[0][j]]]);
        }

        var chart2 = c3.generate({
            bindto: '#plot-area2',
            data: {
                columns: columnsData2,
                type : 'donut',
                onclick: function (d, i) { console.log("onclick", d, i); },
                onmouseover: function (d, i) { console.log("onmouseover", d, i); },
                onmouseout: function (d, i) { console.log("onmouseout", d, i); }
            },
            donut: {
                title: "蚊子館地區分佈"
            }
        });

        var resizeChart2 = setInterval(function(){
            chart2.resize();
        },50)

        setTimeout(function(){
            clearInterval(resizeChart2);
        },800)

        $('.plot-table').append('<p style="color:red;font-weight:bold;">＊ 點擊圖標可篩選所選類別</p>');

        /*
        var keysSorted = Object.keys(place_count).sort(function(a,b){return place_count[b]-place_count[a]});
        var pureCount = columnsData.splice(1, columnsData.length);
        var countSorted = pureCount.sort(function (a, b) {  return b - a;  });
        */
    }
}

function search() {
    mymap.setView([23.5971,121.0126], 8);
    mymap.removeLayer(markers);

    markers = new L.LayerGroup();

    $('.info-seg').css('display', 'none');
    $('#info-name').html('尚未選取地點');
    $('#info-image').html('');

    var f = [];
    $('.icon-disabled').each(function(i, obj) {
        var idx = parseInt(obj.id.substring(2))
        f.push(keys[idx]);
    });

    var zoneNum = $('.zone.ui.dropdown').dropdown('get value');
    var cityNum = $('.city.ui.dropdown').dropdown('get value');
    if (zoneNum == 0) {
        filterData = globalData;
    } else {
        if (cityNum == 0) {
            filterData = globalData.filter(function(item, index, array){
                return citys[zoneNum].includes(item.location);
            });
        } else {
            filterData = globalData.filter(function(item, index, array){
                return item.location == citys[0][cityNum-1];
            });
        }
    }
    filterData.forEach(function(place){
        if (f.includes(place.type)) { return }

        var i = icons[place.type];
        if (typeof i === "undefined") {
            i = normalIcon;
            if (f.includes('其他')) { return }
        } else {
            i = icons[place.type]['marker'];
        }

        L.marker(place.coordinate, {icon: i}).addTo(markers).on('click', function(){
            $('.info-seg').css('display', 'block');
            openNav();
            
            // change to INFO tab
            $('.ui.menu > .item').removeClass('active');
            $('.ui.menu > .item[data-tab="info"]').addClass('active');
            $('.ui.tab').removeClass('active');
            $('.ui.tab[data-tab="info"]').addClass('active');
    
            $('.tab[data-tab="info"] .sub.header').show();
    
            dataColumn.forEach(function(col){
                document.getElementById('info-'+col).innerHTML = place[col];
            })
            document.getElementById('info-image').innerHTML = '<img class="ui rounded image" src="'+ place["image"] +'" style="width:100%;object-fit: cover;margin-top: 18px; height: 30vh;">';
            mymap.setView(place.coordinate);
        });
    })
    mymap.addLayer(markers);

    
}

$(document).ready(function() {
    openNav();
    $('.ui.long.modal').modal('show');
    mymap = L.map('main').setView([23.5971,121.0126], 8);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
            '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="http://mapbox.com">Mapbox</a>',
        id: 'mapbox.streets'
    }).addTo(mymap);

    L.easyButton({
        states: [{
            stateName: 'open-nav',
            icon: 'fa-angle-double-right',
            title: '展開側欄',
            onClick: function(control) {
            openNav();
            control.state('close-nav');
            }
        }]
    }).addTo(mymap);

    $('.menu .item').tab();
    $('.zone.ui.dropdown').dropdown('set selected', "0");
    $('.zone.ui.dropdown').dropdown({
        onChange: function(value, text, $selectedItem) {
            switch (value) {
                case '0':
                  $('#city-dropdown').css('display','none');
                  break;
                case '1':
                    $('#city-dropdown').css('display','initial');
                    $('.city.ui.dropdown')
                        .dropdown({
                            values: [{
                                name: '全部區域',
                                value: 0,
                            },{
                                name: '台北市',
                                value: 1,
                            },{
                                name: '新北市',
                                value: 2,
                            },{ 
                                name: '基隆市',
                                value: 3,
                            },{
                                name: '桃園市',
                                value: 4,
                            },{
                                name: '新竹市',
                                value: 5,
                            },{
                                name: '新竹縣',
                                value: 6,
                            },{
                                name: '宜蘭縣',
                                value: 7,
                            }]
                        });
                    $('.city.ui.dropdown').dropdown('set selected', "0");
                    break;
                case '2':
                    $('#city-dropdown').css('display','initial');
                    $('.city.ui.dropdown')
                        .dropdown({
                            values: [{
                                name: '全部區域',
                                value: 0,
                            },{
                                name: '苗栗縣',
                                value: 8,
                            },{
                                name: '台中市',
                                value: 9,
                            },{ 
                                name: '彰化縣',
                                value: 10,
                            },{
                                name: '南投縣',
                                value: 11,
                            },{
                                name: '雲林縣',
                                value: 12,
                            }]
                        });
                    $('.city.ui.dropdown').dropdown('set selected', "0");
                    break;
                case '3':

                    $('#city-dropdown').css('display','initial');
                    $('.city.ui.dropdown')
                        .dropdown({
                            values: [{
                                name: '全部區域',
                                value: 0,
                            },{
                                name: '花蓮縣',
                                value: 13,
                            },{
                                name: '台東縣',
                                value: 14,
                            }]
                        });
                    $('.city.ui.dropdown').dropdown('set selected', "0");
                    break;
                case '4':
                    $('#city-dropdown').css('display','initial');
                    $('.city.ui.dropdown')
                        .dropdown({
                            values: [{
                                name: '全部區域',
                                value: 0,
                            },{
                                name: '嘉義市',
                                value: 15,
                            },{
                                name: '嘉義縣',
                                value: 16,
                            },{ 
                                name: '台南市',
                                value: 17,
                            },{
                                name: '高雄市',
                                value: 18,
                            },{
                                name: '屏東縣',
                                value: 19,
                            },{
                                name: '澎湖縣',
                                value: 20,
                            }]
                        });
                    $('.city.ui.dropdown').dropdown('set selected', "0");
                    break;
                case '5':
                    $('#city-dropdown').css('display','initial');
                    $('.city.ui.dropdown')
                        .dropdown({
                            values: [{
                                name: '全部區域',
                                value: 0,
                            },{
                                name: '金門縣',
                                value: 21,
                            },{
                                name: '連江縣',
                                value: 22,
                            }]
                        });
                    $('.city.ui.dropdown').dropdown('set selected', "0");
                    break;
                  break;
                default:
                  $('#city-dropdown').css('display','none');
            }
          }
      });
    
    for (var i=0 ; i<keys.length ; i++) {
      if (keys[i] == '產業展售場館暨直銷中心') {
        $('#c-'+(i)).html('<button class="circular ui icon button" style="padding: .78571429em .64341429em .78571429em;background-color:'+ icons[keys[i]]['color'] +' ;color:white">' +
        '<i class="' + icons[keys[i]]['icon'] + '"></i>' +
        '</button>');
      } else {
        $('#c-'+(i)).html('<button class="circular ui icon button" style="background-color:'+ icons[keys[i]]['color'] +' ;color:white">' +
        '<i class="' + icons[keys[i]]['icon'] + '"></i>' +
        '</button>');
      }
      
      $('#c-'+i).attr("data-content", keys[i]);
    }
    
    $('.fliter-btn').popup();

    $('.tab[data-tab="info"] .sub.header').hide();

    $.getJSON("new_data.json", function(data) {
        globalData = data;
        data.forEach((place, index) => {
            var ic = icons[place.type];
            if (typeof ic === "undefined") {
                ic = normalIcon;
            } else {
                ic = icons[place.type]['marker'];
            }

            L.marker(place.coordinate, {icon: ic}).addTo(markers).on('click', function(){
                $('.info-seg').css('display', 'block');
                openNav();
                
                // change to INFO tab
                $('.ui.menu > .item').removeClass('active');
                $('.ui.menu > .item[data-tab="info"]').addClass('active');
                $('.ui.tab').removeClass('active');
                $('.ui.tab[data-tab="info"]').addClass('active');

                $('.tab[data-tab="info"] .sub.header').show();

                dataColumn.forEach(function(col){
                    document.getElementById('info-'+col).innerHTML = place[col];
                })
                document.getElementById('info-image').innerHTML = '<img class="ui rounded image" src="'+ place["image"] +'" style="width:100%;object-fit: cover;margin-top: 18px; height: 30vh;">';
                mymap.setView(place.coordinate);
            });
        });
    })

    mymap.addLayer(markers);
    
    $('.fliter-btn').on('click', function() {
        if ($(this).hasClass('icon-disabled')) {
            $(this).removeClass('icon-disabled');
        } else {
            $(this).addClass('icon-disabled');
        } 
    })
})