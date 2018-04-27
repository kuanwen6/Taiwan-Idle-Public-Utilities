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
    $('.ui.dropdown').dropdown('set selected', "0");
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
                    console.log(col);
                    document.getElementById('info-'+col).innerHTML = place[col];
                })
                mymap.setView(place.coordinate, 9);
            });
        });
    })
})