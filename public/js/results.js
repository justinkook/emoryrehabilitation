/**
 * gets two string inputs from index.html then stores to session storage
 * @param {String} searchIndexInput - catagory searchInput
 * @param {String} locationIndexInput - location locationInput
 */

let searchIndexInput = sessionStorage.getItem('searchTag');
let locationIndexInput = sessionStorage.getItem('locationTag');

let _businessData = {};

const renderResults = function (data, page) {
  let htmlstr = '';

  const initial = (10 * (page - 1)) + 1;
  count = initial - 1;

  for (let i = initial; i < initial + 10 && i < data.length; i++) {
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
        let addressComponents = data.results[0].address_components;
        callAddressCityIndex(addressComponents[0].short_name)
      })

      .catch(function (err) {
        console.log(err);
      })

  };
  geocode();
  /**
   * @param {string} shortNameIndex - uncapitalized alias of location ex. atlanta
   * @param {string} cityStateIndex - Properly formatted city, state ex. Atlanta, GA, USA
   * @return {object} businessData - filtered business by tag and location
   */

  const callAddressCityIndex = function (shortNameIndex) {
    const newSearchIndex = {
      searchInput: sessionStorage.getItem('searchTag'),
      locationInput: shortNameIndex,
    };

    $.post('/api/search', newSearchIndex)
      .then(function (businessData) {
        _businessData = businessData;
        renderResults(businessData, 1);

        for (let i = 2; i <= Math.ceil((businessData.length - 1) / 10); i++) {
          $('footer').append(`<a>${i}</a>`);
        }
      })

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
            var pos = {
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
  let locationTag = $('#locationInput').val().trim();
  sessionStorage.setItem('locationTag', `${locationTag}`);
  const geocode = () => {
    let location = sessionStorage.getItem('locationTag');
    const queryURL = 'api/geocode/' + location;
    $.get(queryURL)
      .then(function (res) {
        let addressComponents = res.results[0].address_components;
        callAddressCity(addressComponents[0].short_name)
      })

      .catch(function (err) {
        console.log(err);
      })

  };
  geocode();
  const callAddressCity = function (shortName) {
    const newSearch = {
      searchInput: sessionStorage.getItem('searchTag'),
      locationInput: shortName,
    };

    $.post('/api/search', newSearch)
      .then(function (businessData) {
        _businessData = businessData;
        renderResults(businessData, 1);

        for (let i = 2; i <= Math.ceil((businessData.length - 1) / 10); i++) {
          $('footer').append(`<a>${i}</a>`);
        }
      })

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
            var pos = {
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
