<<<<<<< HEAD
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'; 
import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
=======
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import './styling/home.css';
>>>>>>> master

const mapContainerStyle = {
  width: '100%',
  height: '100%', // Full height to ensure it takes up the remaining space
};

const center = {
  lat: 33.7501,  // Latitude
  lng: 84.3885  // Longitude
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
    "Perth, WA",
    "Sydney, NSW",
    directionsService,
    directionsRenderer
  );
}

function displayRoute(
  origin: string,
  destination: string,
  service: google.maps.DirectionsService,
  display: google.maps.DirectionsRenderer
) {
  service
    .route({
      origin: origin,
      destination: destination,
      waypoints: [
        { location: "Adelaide, SA" },
        { location: "Broken Hill, NSW" },
      ],
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
<<<<<<< HEAD
        <style>{`
          .iphone13 {
            width: 390px;  /* iPhone 13 width */
            height: 844px; /* iPhone 13 height */
            margin: 0 auto;
            border: 1px solid #ccc;
            border-radius: 30px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            display: flex;
            flex-direction: column;
            position: relative; /* Use relative positioning */
          }

          .search-bar {
            width: calc(100% - 20px);
            padding: 10px;
            margin: 10px;
            border-radius: 5px;
            border: 1px solid #ccc;
            position: absolute; /* Position search bar at the top */
            top: 10px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 2; /* Make sure it's above the map */
            background-color: white;
          }

          .map-container {
            flex-grow: 1;
            margin: 10px;
            border-radius: 5px;
            overflow: hidden;
            margin-top: 60px; /* Add margin to clear the search bar */
            position: relative;
            height: calc(100% - 270px); /* Remaining space after search bar and people section */
          }

          .people-section {
            padding: 10px;
            background: #f8f8f8; /* Light gray background */
            border-top: 1px solid #ccc;
            height: 200px; /* Fixed height for the people section */
            overflow-y: auto; /* Allow vertical scrolling */
          }

          .people-title {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 5px;
          }

          .person-row {
            display: flex;
            align-items: center;
            margin: 5px 0;
          }

          .profile-pic {
            width: 30px;
            height: 30px;
            background: #ccc; /* Gray circle for profile picture */
            border-radius: 50%;
            margin-right: 10px;
          }

          .person-info {
            display: flex;
            flex-direction: column;
          }

          .person-name {
            font-weight: bold;
          }

          .person-details {
            font-size: 14px;
            color: #666;
          }

        `}</style>

=======
>>>>>>> master
        <div className="iphone13">
          <input className="search-bar" type="text" placeholder="Search..." />

          <div className="map-container">
            <LoadScript googleMapsApiKey="AIzaSyCM36RA6FKHrmxRn9gvafknRc7738HwXNo">
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={10}
              >
<<<<<<< HEAD
                {/* Add any markers or other components here */}
=======
                initMap();
>>>>>>> master
              </GoogleMap>
            </LoadScript>
          </div>

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