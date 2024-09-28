import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
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
  const [currentLocation, setCurrentLocation] = useState<google.maps.LatLng | null>(null);
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
                center={currentLocation || center}
                zoom={10}
              />
            </LoadScript>
          </div>

          {/* Flex container for buttons, moved up slightly */}
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: '0px 0', marginTop: '-20px' }}>
            <IonButton expand="full" onClick={navigateToReportForm} style={{ flex: 1, marginRight: '5px' }}>
              Report an Event
            </IonButton>

            <IonButton expand="full" color="danger" onClick={() => setShowSOSModal(true)} style={{ flex: 1, marginLeft: '5px' }}>
              SOS
            </IonButton>
          </div>

          {/* Adjusting the People Section position */}
          <PeopleSection people={people} getScoreColor={getScoreColor} setShowInputModal={setShowInputModal} />

          <NameInputModal
            isOpen={showInputModal}
            onClose={() => setShowInputModal(false)}
            personName={personName}
            setPersonName={setPersonName}
            addPerson={addPerson}
          />

          <SOSModal isOpen={showSOSModal} onClose={() => setShowSOSModal(false)} />
        </div>
      </IonContent>
    </IonPage>
  );
};

const PeopleSection: React.FC<{ people: Person[]; getScoreColor: (score: number) => string; setShowInputModal: (show: boolean) => void; }> = ({ people, getScoreColor, setShowInputModal }) => (
  <div className="people-section">
    <div className="people-title">
      People
      <IonButton
        onClick={() => setShowInputModal(true)}
        style={{
          backgroundColor: 'white', // Set background to white
          color: 'gray',
          fontSize: '20px',
          padding: 0,
          marginLeft: 'auto',
          border: '1px solid gray', // Optional: add a border for better visibility
        }}
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
);

const NameInputModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  personName: string;
  setPersonName: (name: string) => void;
  addPerson: () => void;
}> = ({ isOpen, onClose, personName, setPersonName, addPerson }) => (
  <IonModal isOpen={isOpen} onDidDismiss={onClose} className='confirmation-overlay'>
    <IonContent className='confirmation-box'>
      <IonToolbar>
        <IonTitle>Add Person</IonTitle>
        <IonButton slot="end" onClick={onClose} fill="clear">
          <IonIcon icon={closeCircleOutline} />
        </IonButton>
      </IonToolbar>
      <div style={{ marginBottom: '10px', padding: '20px' }}>
        <IonInput
          value={personName}
          placeholder="Enter name"
          onIonChange={(e) => setPersonName(e.detail.value!)}
          style={{
            padding: '10px',
            border: '1px solid gray',
            borderRadius: '5px',
            width: '100%',
          }}
        />
      </div>
      <IonButton expand="block" onClick={addPerson}>Add</IonButton>
    </IonContent>
  </IonModal>
);

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