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


$(document).ready(function() {
    openNav();
    var mymap = L.map('main').setView([23.5971,121.0126], 8);

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

    var dataColumn =  ["name","address","supervisor","manager","date","cost","type"]

    $('.menu .item').tab();
    $('.zone.ui.dropdown').dropdown('set selected', "0");
    $('.zone.ui.dropdown').dropdown({
        onChange: function(value, text, $selectedItem) {
            console.log(value);
            console.log(text);
            //display: initial;
            
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
                                value: 1,
                            },{
                                name: '連江縣',
                                value: 2,
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
        data.forEach((place, index) => {
            L.marker(place.coordinate).addTo(mymap).on('click', function(){
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
                mymap.setView(place.coordinate, 9);
            });
        });
    })

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