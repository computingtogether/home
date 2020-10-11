const mymap = L.map('map').setView([39.99, -82.9988], 11);

const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, {
  attribution
});
tiles.addTo(mymap);

var blueIcon = L.icon({
  iconUrl: 'images/blueIcon.jpg',
  iconSize: [19.55, 30]
});

var redIcon = L.icon({
  iconUrl: 'images/redIcon.jpg',
  iconSize: [19.55, 30]
});


var hoyo = makeMarker(40.0886, -82.9484, 'http://hoyoskitchen.com/', 'hoyoskitchen.com',
  'images/hoyoOwner.jpg', 'images/hoyoFood.jpg', 'Hoyo\'s Kitchen',
  'Somali Cuisine');

var upperCupOTE = makeMarker(39.9626, -82.9819, 'http://www.uppercupcoffee.com/', 'uppercupcoffee.com',
  'images/upperCupOwner.jpg', 'images/upperCupFood.jpg',
  'Upper Cup Coffee - Old Town East', 'Cafe and Coffee Shop');

var upperCupG = makeMarker(40.0211, -82.8796, 'http://www.uppercupcoffee.com/', 'uppercupcoffee.com',
  'images/upperCupOwner.jpg', 'images/upperCupFood.jpg',
  'Upper Cup Coffee - Gahanna', 'Cafe and Coffee Shop');

var africanParadiseW = makeMarker(39.9533, -83.1003, 'https://www.yelp.com/biz/african-paradise-restaurant-columbus-2?osq=african+paradise',
  'yelp page',
  'images/africanParadiseVibe.jpg', 'images/africanParadiseFood.jpg',
  'African Paradise - West', 'Somali Restaurant');

var africanParadiseNorthland = makeMarker(40.0588, -82.9587, 'https://www.yelp.com/biz/african-paradise-restaurant-columbus-2?osq=african+paradise',
  'yelp page',
  'images/africanParadiseVibe.jpg', 'images/africanParadiseFood.jpg',
  'African Paradise - Northland', 'Somali Restaurant');

var lalibela = makeMarker(39.9534, -82.8780, 'http://lalibelarestaurant.net/',
  'lalibelarestaurant.net',
  'images/lalibela.jpg', 'images/lalibelaFood.jpg',
  'Lalibela', 'Ethiopian Restaurant');

  var thePit = makeMarker(40.0401, -82.9629, 'http://www.thepitcolumbus.com/',
    'thepitcolumbus.com',
    'images/thePitOwner.jpg', 'images/thePitFood.jpg',
    'The Pit BBQ Grille', 'BBQ Restaurant');





var markers = [];

markers.push(hoyo);
markers.push(upperCupG);
markers.push(upperCupOTE);
markers.push(africanParadiseW);
markers.push(africanParadiseNorthland);
markers.push(lalibela);
markers.push(thePit);


function makeMarker(lat, lng, fullSite, shortSite, ownerPic, foodPic, name, description) {

  return L.marker([lat, lng], {
    icon: blueIcon
  }).addTo(mymap).on('click', function(e) {

    for (var r = 0; r < markers.length; r++) {
      markers[r].setIcon(blueIcon);
    }

    e.target.setIcon(redIcon);
    document.getElementById('infoName').textContent = name;
    document.getElementById('infoOwner').src = ownerPic;
    document.getElementById('infoDesciption').textContent = description;
    document.getElementById('infoSite').href = fullSite;
    document.getElementById('infoSite').textContent = shortSite;
    document.getElementById('infoFood').src = foodPic;

  });
}
