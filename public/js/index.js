var citys = [
    ['臺北市','新北市','基隆市','桃園市','新竹市','新竹縣','宜蘭縣','苗栗縣','臺中市','彰化縣','南投縣','雲林縣','花蓮縣','臺東縣','嘉義市','嘉義縣','臺南市','高雄市','屏東縣','澎湖縣','金門縣','連江縣'],
    ['臺北市','新北市','基隆市','桃園市','新竹市','新竹縣','宜蘭縣'],
    ['苗栗縣','臺中市','彰化縣','南投縣','雲林縣'],
    ['花蓮縣','臺東縣'],
    ['嘉義市','嘉義縣','臺南市','高雄市','屏東縣','澎湖縣'],
    ['金門縣','連江縣']
]

var dataColumn =  ["name","address","supervisor","manager","date","cost","type"]

var mymap, globalData;
var markers = new L.LayerGroup();

var normalIcon = L.icon({ iconUrl: 'img/markers/一般.png', iconSize: [52, 56] });
var normalBuildingIcon = L.icon({ iconUrl: 'img/markers/一般建築.png', iconSize: [48, 50] });
var trafficIcon = L.icon({ iconUrl: 'img/markers/交通.png', iconSize: [46, 58] });
var humanitieIcon = L.icon({ iconUrl: 'img/markers/人文.png', iconSize: [58, 68] });
var businessIcon = L.icon({ iconUrl: 'img/markers/商業.png', iconSize: [50, 56] });
var sightIcon = L.icon({ iconUrl: 'img/markers/觀光.png', iconSize: [44, 58] });
var militaryIcon = L.icon({ iconUrl: 'img/markers/特殊(軍事).png', iconSize: [46, 56] });
var marketIcon = L.icon({ iconUrl: 'img/markers/餐飲.png', iconSize: [50, 54] });
var buyIcon = L.icon({ iconUrl: 'img/markers/購物.png', iconSize: [40, 58] });

var icons = {
    '一般': normalIcon,
    '社福設施暨活動中心': humanitieIcon,
    '交通建設': trafficIcon,
    '工商園區': businessIcon, 
    //'體育場館': 
    '產業展售場館暨直銷中心': buyIcon,
    '工程設施': normalBuildingIcon,
    '軍事設施': militaryIcon,
    '市場': marketIcon,
    '休閒育樂設施': sightIcon,
}


function openNav() {
    document.getElementById("mySidenav").style.width = "380px";
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

function openPlot(plot) {
    openFullNav();

    if (plot == 'type') {
        var chart = c3.generate({
            bindto: '#plot-area',
            data: {
                columns: [
                    ['data1', 30, 200, 100, 400, 150, 250],
                    ['data2', 130, 100, 140, 200, 150, 50]
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
        });

        var resizeChart = setInterval(function(){
            chart.resize();
        },50)

        setTimeout(function(){
            clearInterval(resizeChart);
        },800)
        
    }
}

function search() {
    mymap.setView([23.5971,121.0126], 8);
    mymap.removeLayer(markers);

    markers = new L.LayerGroup();

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
    console.log(filterData);
    filterData.forEach(function(place){
        var i = icons[place.type];
        if (typeof i === "undefined") {
            i = normalIcon;
        }

        L.marker(place.coordinate, {icon: i}).addTo(markers).on('click', function(){
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
            mymap.setView(place.coordinate);
        });
    })
    mymap.addLayer(markers);
}

$(document).ready(function() {
    openNav();
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
                                name: '臺北市',
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
                                name: '臺中市',
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
                                name: '臺東縣',
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
                                name: '臺南市',
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

    $('.tab[data-tab="info"] .sub.header').hide();

    $.getJSON("data.json", function(data) {
        globalData = data;
        data.forEach((place, index) => {
            //console.log()
            var i = icons[place.type];
            if (typeof i === "undefined") {
                i = normalIcon;
            }

            L.marker(place.coordinate, {icon: i}).addTo(markers).on('click', function(){
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
                mymap.setView(place.coordinate);
            });
        });
    })

    mymap.addLayer(markers);

    $('#sport-icon').on('click', function() {
        if ($('#sport-icon').hasClass('icon-disabled')) {
            console.log('y');
            $('#sport-icon').removeClass('icon-disabled');
        } else {
            console.log('n');
            $('#sport-icon').addClass('icon-disabled');
        }    
    })

})