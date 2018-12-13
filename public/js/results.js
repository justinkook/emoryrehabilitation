/**
 * gets two string inputs from index.html then stores to session storage
 * @param {String} searchIndexInput - catagory searchInput
 * @param {String} locationIndexInput - location locationInput
 */

let searchIndexInput = sessionStorage.getItem('searchTag');
let locationIndexInput = sessionStorage.getItem('locationTag');
let _businessData = {};
let coordsList = [];

/**
 * gets two coordinate inputs from api/search then calculates distance in miles
 * @param {Object} coord1 - location input coordinates {lat: 30, lng: -84}
 * @param {Object} coord2 - business data coordinates {latitude: 30, longitude: -84}
 */
const calcDistance = (coord1, coord2) => {
  Number.prototype.toRad = function() {
    return this * Math.PI / 180;
 }
 let lat2 = coord2.latitude;
 let lon2 = coord2.longitude 
 let lat1 = coord1.lat;
 let lon1 = coord1.lng;
 
 let R = 6371; // km 
 //has a problem with the .toRad() method below.
 let x1 = lat2-lat1;
 let dLat = x1.toRad();  
 let x2 = lon2-lon1;
 let dLon = x2.toRad();
 
 let a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
                 Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
                 Math.sin(dLon/2) * Math.sin(dLon/2);  
 let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
 let d = R * c; 
 let miles = d * 0.62137;
 coordsList.push(Math.round(miles * 10) / 10);
}

const renderResults = function (data, page) {
  let htmlstr = '';
  const initial = (10 * (page - 1)) + 1;
  count = initial - 1;
  data.sort(function(a, b) {
    return a[0] - b[0];
  });
  _businessData = data;
  for (let i = count; i < initial + 9 && i < data.length; i++) {
    let e = data[i];
    htmlstr += build.businessBlock(e);
  }
  $('#holder').html(htmlstr);
};

if (locationIndexInput !== null) {
  // Calls Google Geocoding API with location param as LocationIndexInput
  const geocode = () => {
    let location = locationIndexInput;
    const queryURL = 'api/geocode/' + location;
    $.get(queryURL)
      .then(function (data) {
        let centerCoord = data.results[0].geometry.location;
        let formattedAddress = data.results[0].formatted_address;
        let addressComponents = data.results[0].address_components;
        let locationOptions = addressComponents.map(e => e.short_name);
        let locationIndex = locationOptions.length - 2;
        callAddressCityIndex(locationOptions[locationIndex], formattedAddress, centerCoord);
      })
  };
  geocode();
  /**
   * @param {string} shortNameIndex - uncapitalized alias of location ex. atlanta
   * @param {string} cityStateIndex - Properly formatted city, state ex. Atlanta, GA, USA
   * @return {object} businessData - filtered business by tag and location
   */

  const callAddressCityIndex = function (shortNameIndex, cityState, centerCoord) {
    const newSearchIndex = {
      searchInput: sessionStorage.getItem('searchTag'),
      locationInput: shortNameIndex,
    };

    $.post('/api/search', newSearchIndex)
      .then(function (businessData) {
        for (i=0; i<businessData.length; i++) {
        calcDistance(centerCoord, businessData[i].coordinates)
        Array.prototype.push.apply(businessData[i], [coordsList[i]]);
        }
        renderResults(businessData, 1);

        for (let i = 2; i <= Math.ceil((businessData.length - 1) / 10); i++) {
          $('footer').append(`<a>${i}</a>`);
        }
      })

      $('#locationInput').val(cityState);

    /**
     * -Google Maps API, Use returned restaurant lat/lon to add 10 pins to the map.
     * -Ajax returns all resturants JSON from database
     * -Get all the ID's from the resturants returned from search results
     * -Filter empty/blank array elements
     * -Push matched ID results to list array
     * -Create Google Map, with center on first result of search, 
     *   loop through list array create pin for each one
     */

    function initMap() {
      $.ajax({
        url: '/api/location',
        method: 'GET',
        dataType: 'json'
      }).then(function (data) {
        const resultsId = [];
        $('.biz-attributes a').map(function () {
          resultsId.push(this.id)
        });

        const resultsIdFiltered = resultsId.filter(function (e) {
          return e != "";
        });

        const list = [];
        data.map(function (obj) {
          if (resultsIdFiltered.includes(obj.id)) {
            list.push(obj)
          }
        })

        const map = new google.maps.Map(document.getElementById('map'), {
          zoom: 10,
          zoomControl: true,
          zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_BOTTOM,
          },
          tilt: 45,
          disableDefaultUI: true
        })
        
        for (let i = 0; i<list.length; i++) {
          const marker = new google.maps.Marker({
            position: {
              lat: list[i].coordinates.latitude,
              lng: list[i].coordinates.longitude
            },
            map: map,
            title: list[i].name,
            label: {
              text: `${i}`,
              fontSize: '10px',
            }

          })
        }
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function (position) {
            let pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            map.setCenter(pos);
          }, function () {
            handleLocationError(true, map.getCenter());
          });
        } else {
          handleLocationError(false, map.getCenter());
        }

      });
    }
    initMap();
  }
}

$('#submit').on('click', function (event) {
  event.preventDefault();
  count = 0;
  let locationEnter = $('#locationInput').val().trim();
  sessionStorage.setItem('locationTag', locationEnter);
  const geocode = () => {
    let location = sessionStorage.getItem('locationTag');
    const queryURL = 'api/geocode/' + location;
    $.get(queryURL)
      .then(function (res) {
        let centerCoord = res.results[0].geometry.location;
        let formattedAddress = res.results[0].formatted_address;
        let addressComponents = res.results[0].address_components;
        let locationOptions = addressComponents.map(e => e.short_name);
        let locationIndex = locationOptions.length - 2;
        callAddressCity(locationOptions[locationIndex], formattedAddress, centerCoord)
      })
  };
  geocode();
  const callAddressCity = function (shortName, cityStateIndex, centerCoord) {
    const newSearch = {
      searchInput: sessionStorage.getItem('searchTag'),
      locationInput: shortName,
    };

    $.post('/api/search', newSearch)
      .then(function (businessData) {
        for (i=0; i<businessData.length; i++) {
          calcDistance(centerCoord, businessData[i].coordinates)
          Array.prototype.push.apply(businessData[i], [coordsList[i]]);
          }
        renderResults(businessData, 1);

        for (let i = 2; i <= Math.ceil((businessData.length - 1) / 10); i++) {
          $('footer').append(`<a>${i}</a>`);
        }
      })

      $('#locationInput').val(`${cityStateIndex}`);

    function initMap() {
      $.ajax({
        url: '/api/location',
        method: 'GET',
        dataType: 'json'
      }).then(function (data) {
        const resultsId = [];

        $('.biz-attributes a').map(function () {
          resultsId.push(this.id)
        })
        const resultsIdFiltered = resultsId.filter(function (e) {
          return e != "";
        })

        const list = [];
        data.map(function (obj) {
          if (resultsIdFiltered.includes(obj.id)) {
            list.push(obj)
          }
        })
        const map = new google.maps.Map(document.getElementById('map'), {
          zoom: 10,
          zoomControl: true,
          zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_BOTTOM,
          },
          tilt: 45,
          disableDefaultUI: true
        })
        for (let i = 0; i < list.length; i++) {
          const marker = new google.maps.Marker({
            position: {
              lat: list[i].coordinates.latitude,
              lng: list[i].coordinates.longitude
            },
            map: map,
            title: list[i].name,
            label: {
              text: 'Emory',
              fontSize: '10px',
            }
          })
        }

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function (position) {
            let pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            map.setCenter(pos);
          }, function () {
            handleLocationError(true, map.getCenter());
          });
        } else {
          handleLocationError(false, map.getCenter());
        }

      });
    }
    initMap();
  };
})

/*
 * -Google Maps API, Use to find your location if no results are found
 */
let map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 33.7490,
      lng: -84.3880
    },
    zoom: 18,
    zoomControl: true,
    zoomControlOptions: {
      position: google.maps.ControlPosition.RIGHT_BOTTOM,
    },
    tilt: 45,
    disableDefaultUI: true
  });
  let marker = new google.maps.Marker({
    position: {
      lat: 33.7490,
      lng: -84.3880
    },
    map: map,
    title: "You are here!",
    animation: google.maps.Animation.BOUNCE
  });
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      map.setCenter(pos);
      marker.setPosition(pos);
    }, function () {
      handleLocationError(true, map.getCenter());
    });
  } else {
    handleLocationError(false, map.getCenter());
  }
}

$('footer').on('click', 'a', function (e) {
  $('footer a').each(function () {
    $(this).removeClass('active');
  });

  $(this).addClass('active');

  renderResults(_businessData, $(this).text());
});
