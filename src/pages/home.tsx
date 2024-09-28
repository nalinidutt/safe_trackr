import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer, useJsApiLoader } from '@react-google-maps/api';
import './styling/home.css';

/*
import dotenv from 'dotenv';
const apiKey = process.env.REACT_APP_API_KEY;
console.log(apiKey);
*/

const mapContainerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 33.7501,  // Latitude
  lng: -84.3885  // Longitude
};

const [currentLocation, setCurrentLocation] = useState<google.maps.LatLng | null>(null);

const getCurrentLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const currentLatLng = new google.maps.LatLng(latitude, longitude);
        setCurrentLocation(currentLatLng);
      },
      (error) => {
        console.error('Error getting location', error);
      }
    );
  } else {
    console.error('Geolocation is not supported by this browser.');
  }
};

/*
const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(null);

const handleDirections = useCallback(() => {
  if (window.google) {
    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: 'New York, NY',
        destination: 'Los Angeles, CA',
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirectionsResponse(result);
        } else {
          console.error(`Error fetching directions ${result}`);
        }
      }
    );
  }
}, []);

useEffect(() => {
  handleDirections();
}, [handleDirections]);
*/

useEffect(() => {
  getCurrentLocation(); // Fetch the user's current location when the component mounts
}, []);

function initMap(): void {
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();

  directionsRenderer.addListener("directions_changed", () => {
    const directions = directionsRenderer.getDirections();

    if (directions) {
      computeTotalDistance(directions);
    }
  });

  displayRoute(
    new google.maps.LatLng(33.77077999730102, -84.39188936601316),
    new google.maps.LatLng(33.77437409297337, -84.39620235793099),
    directionsService,
    directionsRenderer
  );
}

function displayRoute(
  origin: google.maps.LatLng,
  destination: google.maps.LatLng,
  service: google.maps.DirectionsService,
  display: google.maps.DirectionsRenderer
) {
  service
    .route({
      origin: origin,
      destination: destination,
      waypoints: [
        { location: new google.maps.LatLng(33.77297392970823, -84.39517238971182) },
        { location: new google.maps.LatLng(33.773865756089805, -84.39481833813646) },
      ],
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.WALKING,
    })
    .then((result: google.maps.DirectionsResult) => {
      display.setDirections(result);
    })
    .catch((e) => {
      alert("Could not display directions due to: " + e);
    });
}

function computeTotalDistance(result: google.maps.DirectionsResult) {
  let total = 0;
  const myroute = result.routes[0];

  if (!myroute) {
    return;
  }

  for (let i = 0; i < myroute.legs.length; i++) {
    total += myroute.legs[i]!.distance!.value;
  }

  total = total / 1000;

  return total;
}

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="iphone13">
          <input className="search-bar" type="text" placeholder="Search..." />
          {
          <div className="map-container">
              <LoadScript googleMapsApiKey="AIzaSyCM36RA6FKHrmxRn9gvafknRc7738HwXNo">
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={ currentLocation || center }
                zoom={10}
              >
                initMap();
              </GoogleMap>
            </LoadScript>
          </div>
          }
          <div className="people-section">
            <div className="people-title">People</div>
            <hr />
            <div className="person-row">
              <div className="profile-pic"></div>
              <div className="person-info">
                <div className="person-name">Kripa Kannan</div>
                <div className="person-details">Safety Score: 93 | Last Location: Home Park | Last Marked: 9:15pm</div>
              </div>
            </div>
            <div className="person-row">
              <div className="profile-pic"></div>
              <div className="person-info">
                <div className="person-name">Nalini Dutt</div>
                <div className="person-details">Safety Score: 14 | Last Location: Scheller | Last Marked: 8:47pm</div>
              </div>
            </div>
            <div className="person-row">
              <div className="profile-pic"></div>
              <div className="person-info">
                <div className="person-name">Diya Kaimal</div>
                <div className="person-details">Safety Score: 56 | Last Location: Tech Square | Last Marked: 9:00pm</div>
              </div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;