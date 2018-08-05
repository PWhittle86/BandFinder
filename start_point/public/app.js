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
	const bandImageWrapper = document.getElementById('bandImage');
	const bandImage = document.createElement('img');
	bandImage.src = json.image_url;

	const imageTextWrapper = document.getElementById('imageText');
	imageTextWrapper.innerText = json.name;

	bandImageWrapper.appendChild(bandImage);
}

const eventInfoRequestComplete = function(apiResponse){
	const json = JSON.parse(apiResponse.target.response);
	populateEventInfo(json);
}

const populateEventInfo = function(json){
	const mapWrapper = new MapWrapper('map', 22, 0, 2);
	const gigInfo = document.getElementById('events');

	const eventHeading = document.createElement('h3');
	eventHeading.innerText = 'Upcoming Gigs'

	gigInfo.appendChild(eventHeading);

	for(event of json){
		const eventList = document.createElement('ul')

		const sortedDateTime = _.split(event.datetime, 'T');

		const eventTime = document.createElement('li');
		eventTime.innerText = "Date: " + sortedDateTime[0];
		const eventDate = document.createElement('li');
		eventDate.innerText = "Time: " + sortedDateTime[1];
		const eventVenueName = document.createElement('li');
		eventVenueName.innerText = 'Venue: ' + event.venue.name;
		const eventCity = document.createElement('li');
		eventCity.innerText = 'City: ' + event.venue.city;
		const eventCountry = document.createElement('li');
		eventCountry.innerText = 'Country: ' + event.venue.country;

		eventList.appendChild(eventTime);
		eventList.appendChild(eventDate);
		eventList.appendChild(eventVenueName);
		eventList.appendChild(eventCity);
		eventList.appendChild(eventCountry);

		gigInfo.appendChild(eventList);

		mapWrapper.addMarker(event.venue.latitude, event.venue.longitude, function(){
			return sortedDateTime[0] + '<br>' + sortedDateTime[1] + '<br>' + eventVenueName.innerText + '<br>' + eventCity.innerText;
		});
	}
}

window.addEventListener('load', function(){

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

