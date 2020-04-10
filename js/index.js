
window.onload = ()=> {
  // displayStores();
  // setOnCLickListener();
}
      var map;
      var markers = [];
      var infoWindow;

function initMap() {
      var losAngeles  = {
        lat: 34.063380,
        lng: -118.358080
       };
       //document.getElementById('map')  'map in there is the Id of an html container'

      map = new google.maps.Map(document.getElementById('map'), {
        center: losAngeles ,
        zoom: 13,
        mapTypeId: 'roadmap',
        styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#263c3f'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#6b9a76'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#17263c'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#515c6d'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            }
          ]
      });
      infoWindow = new google.maps.InfoWindow();
      // showStoreMarkers();
      searchStores();
      // google.maps.event.trigger(markers[0], 'click');// purpose nito is nitrigger niya yung infowindow ng marker.
      // console.log(markers);
    }


function searchStores(){
  var foundStores = [];
  var zipCode = document.getElementById("zip-code-input").value; //fetch the value in search bar in html

  if(zipCode){
    for(let store of stores){
    var postal = store['address']['postalCode'].substring(0,5);
    // console.log(postal);
    if(postal === zipCode){
      foundStores.push(store);
      }
    // console.log(foundStores);
    }
  } else{
    foundStores = stores;
  }

  clearLocations();
  displayStores(foundStores);
  showStoreMarkers(foundStores);
  setOnCLickListener();
  // console.log(zipCode);
}

function clearLocations() {
       infoWindow.close();
       for (var i = 0; i < markers.length; i++) {
         markers[i].setMap(null);
       }
       markers.length = 0;
     }

function setOnCLickListener(){
    var storeElements = document.querySelectorAll('.store-container')//returns in array
          for(let [index,store] of storeElements.entries()){//may for loop dito para maccess natin yung kada index ng array
            store.addEventListener('click', function(){
              google.maps.event.trigger(markers[index], 'click');
            });
          }
    // console.log(storeElements);

}

function showStoreMarkers(stores){
    var bounds = new google.maps.LatLngBounds();
    for(let [index,store] of stores.entries()){ //index is to get
      var name = store["name"];
      var address = store["addressLines"][0];
      var latlng = new google.maps.LatLng(
                  store["coordinates"]["latitude"],
                  store["coordinates"]["longitude"]);
      var openStatusText = store["openStatusText"];
      var phoneNumber = store["phoneNumber"];

      bounds.extend(latlng);
      createMarker(latlng,name,address,openStatusText,phoneNumber, index+1);
    }
    map.fitBounds(bounds);
}
function createMarker(latlng, name, address,openStatusText,phoneNumber,index) {
          var html = `
              <div class="store-info-window">
                <div class="store-info-name">
                  ${name}
                </div>
                <div class= "store-info-status">
                  ${openStatusText}
                </div>
                <div class = "store-info-address">
                  <div class= "icon-background">
                    <i class="fas fa-map-marked-alt" style="padding: 5px;"></i>
                  </div>
                  ${address}
                </div>
                <div class="store-info-phone">
                  <div class= "icon-background">
                    <i class="fas fa-mobile-alt" style="padding: 5px;font-size: 18px;margin-top: 2px;"></i>
                  </div>
                  ${phoneNumber}
                </div>
              </div>
          `;

        var marker = new google.maps.Marker({
            map: map,
            position: latlng,
            label: index.toString()
          });
          google.maps.event.addListener(marker, 'click', function() {
            infoWindow.setContent(html);
            infoWindow.open(map, marker);
          });
          markers.push(marker);
        }


const displayStores = (stores) =>{
          // stores.map(()=>{
          //   // for(var store of stores){
          //   //   console.log(store)
          //   }
          var storesHtml = '';

            for(let [index,store] of stores.entries()){
              var address = store['addressLines'];
              var phonenum = store['phoneNumber'];
              storesHtml += `
            <div class="store-container-background">
              <div class="store-container">
                <div class="store-info-container">
                  <div class="store-address">
                      <span>${address[0]}</span>
                      <span>${address[1]}</span>
                  </div>
                        <div class="store-phone-number">${phonenum}</div>
                </div>

                <div class="store-number-container">
                  <div class="store-number">${index+1}</div>
                </div>
              </div>
            </div>`

              document.querySelector('.store-list').innerHTML = storesHtml;
                                    //^^is the class in html you target

          }
        }
