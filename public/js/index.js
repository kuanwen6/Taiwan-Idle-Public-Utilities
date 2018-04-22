function openNav() {
    document.getElementById("mySidenav").style.width = "380px";
    document.getElementById("mySidenav").style.boxShadow="4px 4px 12px 4px rgba(20%,20%,40%,0.5)";
    document.getElementById("main").style.marginLeft = "380px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("mySidenav").style.boxShadow="none";
    document.getElementById("main").style.marginLeft = "0";
}

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
        icon: 'fa-map-marker',
        title: '展開側欄',
        onClick: function(control) {
          openNav();
          control.state('close-nav');
        }
      }, {
        icon: 'fa-undo',
        stateName: 'close-nav',
        onClick: function(control) {
          closeNav();
          control.state('open-nav');
        },
        title: '縮小側欄'
      }]
}).addTo(mymap);

function openTab(evt, tabName) {
    // Declare all variables
    console.log(evt)
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}