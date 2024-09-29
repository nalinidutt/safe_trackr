import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import { useHistory } from 'react-router';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonInput, IonModal, IonList, IonItem, IonIcon } from '@ionic/react';
import { closeCircleOutline } from 'ionicons/icons'; // For the "X" icon
import './styling/home.css';

const mapContainerStyle = {
  width: '100%',
  height: '100%', // Full height to ensure it takes up the remaining space
};

const center = {
  lat: 33.7501,  // Latitude
  lng: -84.3885  // Longitude
};

const Home: React.FC = () => {
  const history = useHistory();
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [destination, setDestination] = useState<string>('');
  const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error('Error getting location', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const calculateRoute = () => {
    if (!currentLocation || !destination) {
      alert("Please enter a destination.");
      return;
    }

    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
      {
        origin: new google.maps.LatLng(currentLocation.lat, currentLocation.lng),
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING, // You can change this to WALKING, BICYCLING, etc.
        waypoints: [
          { location: new google.maps.LatLng(33.77297392970823, -84.39517238971182) },
          { location: new google.maps.LatLng(33.773865756089805, -84.39481833813646) },
        ],
        optimizeWaypoints: true,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirectionsResponse(result);
        } else {
          alert('Could not calculate route: ' + status);
        }
      }
    );
  };

  useEffect(() => {
    getCurrentLocation(); // Fetch the user's current location when the component mounts
  }, []);

  useEffect(() => {
    if (currentLocation) {
      console.log("Current location set:", currentLocation); // Log updated location
    }
  }, [currentLocation]);

  useEffect(() => {
    if (currentLocation && map) {
      console.log("Current location updated:", currentLocation); // Log the updated location
      const locationLatLng = new google.maps.LatLng(currentLocation.lat, currentLocation.lng);
      map.setCenter(locationLatLng); // Center the map on the current location
    }
  }, [currentLocation, map]);

  const navigateToReportForm = () => {
    history.push('/report_form');
  };

  const [people, setPeople] = useState([
    { name: 'User 1', score: 14, location: 'Home Park', time: '9:15pm' },
    { name: 'User 2', score: 56, location: 'Scheller', time: '8:47pm' },
  ]);

  const [personName, setPersonName] = useState('');
  const [showInputModal, setShowInputModal] = useState(false);  // Controls the modal visibility
  const [showSOSModal, setShowSOSModal] = useState(false);  // Controls the SOS modal visibility

  const addPerson = () => {
    if (personName.trim()) {
      const newPerson = {
        name: personName,
        score: Math.floor(Math.random() * 101), // Score between 0-100
        location: 'Random Location', // Replace with your random location logic
        time: new Date().toLocaleTimeString(), // Current time
      };
      setPeople([...people, newPerson]);
      setPersonName(''); // Reset input field
      setShowInputModal(false); // Hide modal after adding person
    }
  };

  const getScoreColor = (score: number) => {
    if (score <= 33) return 'red';
    if (score <= 67) return 'orange';
    return 'green';
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="iphone13">
          <div className="map-controls" style={{ display: 'flex', alignItems: 'center' }}>
            <IonInput
              placeholder="Enter destination"
              value={destination}
              onIonChange={(e) => setDestination(e.detail.value!)}
              clearInput
              style={{ flex: 1, marginRight: '8px', marginTop: '20px', marginLeft: '10px', width: '70%' }} // Shortened width
            />
            <IonButton 
              expand="block" 
              onClick={calculateRoute} 
              style={{ width: '30%', marginTop: '20px' }} // Smaller width
            >
              Go
            </IonButton>
          </div>

          <div className="map-container">
            <LoadScript googleMapsApiKey="AIzaSyCM36RA6FKHrmxRn9gvafknRc7738HwXNo">
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={15}
                options={{
                  zoomControl: true,
                  mapTypeControl: false,
                  fullscreenControl: false,
                }}
                onLoad={(loadedMap) => setMap(loadedMap)}
              >
                {directionsResponse && (
                  <DirectionsRenderer directions={directionsResponse} />
                )}
              </GoogleMap>
            </LoadScript>
          </div>

          <div className="button-container" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
  <IonButton expand="full" onClick={navigateToReportForm} style={{ marginRight: '4px' }}>
    Report an Event
  </IonButton>

  <IonButton expand="full" color="danger" onClick={() => setShowSOSModal(true)} style={{ marginLeft: '4px' }}>
    SOS
  </IonButton>
</div>

          <div className="people-section">
            <div className="people-title">
              People
            </div>
            <hr />
            {people.map((person, index) => (
              <div className="person-row" key={index}>
                <div className="profile-pic"></div>
                <div className="person-info">
                  <div className="person-name"><h4>{person.name}</h4></div>
                  <div className="person-details">
                    Safety Score:
                    <span style={{ color: getScoreColor(person.score) }}> {person.score}</span>
                    | Last Location: {person.location}
                    | Last Marked: {person.time}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Name Input Modal */}
          <IonModal isOpen={showInputModal} onDidDismiss={() => setShowInputModal(false)} className='small-modal'>
            <IonContent>
              <div style={{ padding: '10px', textAlign: 'center' }}>
                <IonIcon
                  icon={closeCircleOutline}
                  style={{ fontSize: '30px', cursor: 'pointer', position: 'absolute', top: '10px', right: '10px' }}
                  onClick={() => setShowInputModal(false)}  // Close the modal
                />
                <IonInput
                  value={personName}
                  placeholder="Enter name"
                  onIonChange={(e) => setPersonName(e.detail.value!)}
                  style={{ marginBottom: '10px', padding: '5px', border: '1px solid gray', borderRadius: '5px', width: '80%' }}
                />
                <IonButton onClick={addPerson} size="small">Add</IonButton>
              </div>
            </IonContent>
          </IonModal>

          {/* SOS Modal */}
          <IonModal isOpen={showSOSModal} onDidDismiss={() => setShowSOSModal(false)}>
            <IonContent>
              <h2>Emergency Contacts</h2>
              <IonList>
                <IonItem button onClick={() => alert('Calling Emergency Contact 1...')}>
                  Call Emergency Contact 1
                </IonItem>
                <IonItem button onClick={() => alert('Calling Emergency Contact 2...')}>
                  Call Emergency Contact 2
                </IonItem>
              </IonList>
              <IonButton expand="full" onClick={() => setShowSOSModal(false)}>
                Close
              </IonButton>
            </IonContent>
          </IonModal>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;