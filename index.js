const locationImport = import("./locations.json", {
    with: { type: 'json' }
});

// Initialize and add the map
let map;

async function initMap(locationsFromImport) {
  const centerOfTheMapBudapest = { lat: 47.4810954, lng: 18.9654951 };
	
  // The locations
  const locations = locationsFromImport;
  
  // Request needed libraries.
  //@ts-ignore
  // Request needed libraries.
  const { Map, InfoWindow } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary(
    "marker",
  );

  // The map, centered at Uluru
  map = new Map(document.getElementById("map"), {
    zoom: 7,
    center: centerOfTheMapBudapest,
    mapId: "DEMO_MAP_ID",
  });
  
  function markerTicked(event) {
	  if (event.type === "click") {
		
	  } else {
		/* handle an error */
	  }
  }

  // Create an info window to share between markers.
  const infoWindow = new InfoWindow();
	  
  locations.forEach(({position, title, content, mapLink, links}, i) => {
	  
	  const pin = new PinElement({
		  scale: 1.5,
	  });
	  
	  const marker = new AdvancedMarkerElement({
		map: map,
		position: position,
		title: title,
		content: pin.element,
		gmpClickable: true
	  });
	  
	  // Add a click listener for each marker, and set up the info window.
	  marker.addListener("click", ({ domEvent, latLng }) => {
		const { target } = domEvent;

		let contentString = "<p><b>" + marker.title + "</b></p>" +
			"<p>" + content + "</p>" +
			'<p><b>Hivatkozások</b>';
		if (mapLink == undefined) {
			contentString += '<li><a href="https://www.google.com/maps/place/' + position.lat + ',' + position.lng + '" target="_blank">Nagyobb térképen</a>';
		} else {
			contentString += '<li><a href="' + mapLink + '" target="_blank">Nagyobb térképen</a>';
		}
		links.forEach((link, i) => {
			contentString += '<li><a href="' + link + '" target="_blank">' + link + '</a></li>';
		});
		contentString += "</p>";

		infoWindow.close();
		infoWindow.setContent(contentString);
		infoWindow.open(marker.map, marker);
	  });
  });
}

locationImport.then(data => {
	initMap(data.default);
});
