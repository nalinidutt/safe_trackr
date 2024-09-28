import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer, useJsApiLoader } from '@react-google-maps/api';
import { useHistory } from 'react-router';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonInput,
  IonModal,
  IonList,
  IonItem,
  IonIcon,
} from '@ionic/react';
import { closeCircleOutline } from 'ionicons/icons';
import './styling/home.css';

const mapContainerStyle = {
  width: '100%',
  height: '90%',
};

const center = {
  lat: 33.7501,
  lng: -84.3885,
};

// Person type definition
interface Person {
  name: string;
  score: number;
  location: string;
  time: string;
}

const Home: React.FC = () => {
  const history = useHistory();
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [destination, setDestination] = useState<string>('');
  const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [people, setPeople] = useState<Person[]>([
    { name: 'Kripa Kannan', score: 93, location: 'Home Park', time: '9:15pm' },
    { name: 'Nalini Dutt', score: 14, location: 'Scheller', time: '8:47pm' },
    { name: 'Diya Kaimal', score: 56, location: 'Tech Square', time: '9:00pm' },
  ]);
  const [personName, setPersonName] = useState('');
  const [showInputModal, setShowInputModal] = useState(false);
  const [showSOSModal, setShowSOSModal] = useState(false);

  useEffect(() => {
    getCurrentLocation();
  }, []);

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

      // Create the AdvancedMarkerElement to show the current location
      /*
      new google.maps.marker.AdvancedMarkerElement({
        position: locationLatLng,
        map: map,
      });
      */
    }
  }, [currentLocation, map]);


  // Function to generate random values
  const getRandomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
  const addPerson = () => {
    if (personName.trim()) {
      const newPerson: Person = {
        name: personName,
        score: getRandomNumber(0, 100),
        location: getRandomLocation(),
        time: getRandomTime(),
      };
      setPeople((prevPeople) => [...prevPeople, newPerson]);
      setPersonName('');
      setShowInputModal(false);
    }
  };

  const getRandomNumber = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const getRandomTime = () => {
    const hour = getRandomNumber(1, 12);
    const minutes = getRandomNumber(0, 59).toString().padStart(2, '0');
    const period = getRandomNumber(0, 1) === 0 ? 'am' : 'pm';
    return `${hour}:${minutes}${period}`;
  };

  const getRandomLocation = () => {
    const locations = ['Home Park', 'Tech Square', 'Scheller', 'Piedmont Park', 'Tin Drum', 'Klaus Computing', 'College of Computing', 'Clough Commons'];
    return locations[getRandomNumber(0, locations.length - 1)];
  };

  const navigateToReportForm = () => {
    history.push('/report_form');
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
          <input className="search-bar" type="text" placeholder="Search..." />

            <div className="map-container">
              <LoadScript googleMapsApiKey="AIzaSyCM36RA6FKHrmxRn9gvafknRc7738HwXNo">
                  <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={ center }
                  zoom={20}
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

            <div className="controls">
              <IonInput
                placeholder="Enter destination"
                value={destination}
                onIonChange={(e) => setDestination(e.detail.value!)}
                clearInput
              />
              <IonButton expand="block" onClick={calculateRoute}>
                Get Route
              </IonButton>

              <IonButton expand="block" onClick={navigateToReportForm}>
                Report an Event
              </IonButton>
            
              <IonButton expand="block" color="danger" onClick={() => setShowSOSModal(true)}>
                SOS
              </IonButton>
            </div>
            
            

            <div className="people-section">
              <div className="people-title">
                People
                <IonButton
                  onClick={() => setShowInputModal(true)}  // Open name input modal
                  style={{ backgroundColor: 'transparent', color: 'gray', fontSize: '20px', padding: 0, marginLeft: 'auto' }} // Style for the "+" button
                >
                  +
                </IonButton>
              </div>
              <hr />
              {people.map((person, index) => (
                <div className="person-row" key={index}>
                  <div className="profile-pic"></div>
                  <div className="person-info">
                    <div className="person-name">{person.name}</div>
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

const SOSModal: React.FC<{ isOpen: boolean; onClose: () => void; }> = ({ isOpen, onClose }) => (
  <IonModal isOpen={isOpen} onDidDismiss={onClose}>
    <IonContent>
      <h2>Emergency Contacts</h2>
      <IonList>
        <IonItem button onClick={() => alert('Calling 911...')}>
          Call 911
        </IonItem>
        <IonItem button onClick={() => alert('Calling Emergency Contact 1...')}>
          Call Emergency Contact 1
        </IonItem>
        <IonItem button onClick={() => alert('Calling Emergency Contact 2...')}>
          Call Emergency Contact 2
        </IonItem>
      </IonList>
      <IonButton onClick={onClose}>Close</IonButton>
    </IonContent>
  </IonModal>
);

export default Home;