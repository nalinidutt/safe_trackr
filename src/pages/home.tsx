import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
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
                center={center}
                zoom={10}
                >
                {/* Add any markers or other components here */}
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