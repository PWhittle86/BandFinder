const _ = require("lodash");

const makeAPIRequest = function(url, callback){
  const request = new XMLHttpRequest();
  request.open('GET', url);
  request.addEventListener('load', callback);
  request.send();
 }

const bandInfoRequestComplete = function(apiResponse){
	const json = JSON.parse(apiResponse.target.response);
	populateBandInfo(json);
}

const populateBandInfo = function(json){
	const bandInfo = document.getElementById('bandinfo');

	const bandName = document.createElement('h3');
	bandName.innerText = json.name;
	const bandImage = document.createElement('img');
	bandImage.src = json.image_url;

	bandInfo.appendChild(bandImage);
	bandInfo.appendChild(bandName);
}

const eventInfoRequestComplete = function(apiResponse){
	const json = JSON.parse(apiResponse.target.response);
	
	populateEventInfo(json);
}

const populateEventInfo = function(json){
	const gigInfo = document.getElementById('giginfo');

	debugger;

	const eventHeading = document.createElement('h3');
	eventHeading.innerText = 'Upcoming Gigs'

	gigInfo.appendChild(eventHeading);

	for(event of json){
		const eventList = document.createElement('ul')

		const sortedDateTime = _.split(event.datetime, 'T');

		debugger;

		const eventDateTime = document.createElement('li');
		eventDateTime.innerText = event.datetime;

		const eventVenueName = document.createElement('li');
		eventVenueName.innerText = 'Venue: ' + event.venue.name;
		const eventCity = document.createElement('li');
		eventCity.innerText = 'City: ' + event.venue.city;
		const eventCountry = document.createElement('li');
		eventCountry.innerText = 'Country: ' + event.venue.country;

		eventList.appendChild(eventDateTime);
		eventList.appendChild(eventVenueName);
		eventList.appendChild(eventCity);
		eventList.appendChild(eventCountry);

		gigInfo.appendChild(eventList);
	}
	
}

window.addEventListener('load', function(){

  const mapWrapper = new MapWrapper('map', 49, 21, 4);
  const bandSearch = document.getElementById('bandsearch');

  bandSearch.addEventListener('submit', function(event){
  	event.preventDefault();
  	artist = this[0].value;
	const artistRequestURL = `https://rest.bandsintown.com/artists/${artist}?app_id=c2e0e956ade5fc346816b8ce83d0b444`;
	const eventRequestURL = `https://rest.bandsintown.com/artists/${artist}/events?app_id=c2e0e956ade5fc346816b8ce83d0b444`;
	makeAPIRequest(artistRequestURL, bandInfoRequestComplete);
	makeAPIRequest(eventRequestURL, eventInfoRequestComplete);
	})
	
});