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

// Function to generate random values
const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

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

const Home: React.FC = () => {
  const history = useHistory();
  
  const navigateToReportForm = () => {
    history.push('/report_form');
  };

  const [people, setPeople] = useState([
    { name: 'Kripa Kannan', score: 93, location: 'Home Park', time: '9:15pm' },
    { name: 'Nalini Dutt', score: 14, location: 'Scheller', time: '8:47pm' },
    { name: 'Diya Kaimal', score: 56, location: 'Tech Square', time: '9:00pm' },
  ]);

  const [personName, setPersonName] = useState('');
  const [showInputModal, setShowInputModal] = useState(false);  // Controls the modal visibility
  const [showSOSModal, setShowSOSModal] = useState(false);  // Controls the SOS modal visibility

  // Function to add a new person with a custom name
  const addPerson = () => {
    if (personName.trim()) {
      const newPerson = {
        name: personName,
        score: getRandomNumber(0, 100),
        location: getRandomLocation(),
        time: getRandomTime(),
      };
      setPeople([...people, newPerson]);
      setPersonName(''); // Reset input field
      setShowInputModal(false); // Hide modal after adding person
    }
  };

  // Function to get score color based on value
  const getScoreColor = (score) => {
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
                center={center}
                zoom={10}
              />
            </LoadScript>
          </div>
          
          <IonButton expand="block" onClick={navigateToReportForm}>
          Report an Event
          </IonButton>
        
          <IonButton expand="block" color="danger" onClick={() => setShowSOSModal(true)}>
            SOS
          </IonButton>

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
          <IonModal isOpen={showInputModal} onDidDismiss={() => setShowInputModal(false)} cssClass='small-modal'>
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
              <IonButton onClick={() => setShowSOSModal(false)}>Close</IonButton>
            </IonContent>
          </IonModal>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;