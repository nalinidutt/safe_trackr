import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

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
        <style>{`
          .iphone13 {
            width: 390px;  /* iPhone 13 width */
            height: 844px; /* iPhone 13 height */
            margin: 0 auto;
            border: 1px solid #ccc;
            border-radius: 30px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            position: relative;
          }

          .search-bar {
            width: calc(100% - 20px);
            padding: 10px;
            margin: 10px;
            border-radius: 5px;
            border: 1px solid #ccc;
            position: absolute; /* Position it absolutely */
            top: 10px; /* Distance from top */
            left: 10px; /* Center it */
          }

          .map-container {
            height: calc(75% - 50px); /* 3/4 of the page height minus search bar */
            margin: 60px 10px 0; /* Adjust margins to account for search bar */
          }

          .people-section {
            padding: 10px;
            background: #f8f8f8; /* Light gray background */
            border-top: 1px solid #ccc;
            height: 25%; /* Set fixed height for scrollable area */
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