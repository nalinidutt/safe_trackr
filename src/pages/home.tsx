import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer, useJsApiLoader, MarkerF, InfoWindowF } from '@react-google-maps/api';
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
import  ReportForm from './report';
import axios from 'axios';

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
  const [suggestions, setSuggestions] = useState<any[]>([]); // To hold the suggestions
  const [selectedPlace, setSelectedPlace] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedCrime, setSelectedCrime] = useState<{ lat: number; long: number; crimeType: string; description: string } | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const [crimes, setCrimes] = useState<Array<{ location: { lat: number; long: number }; crimeType: string; description: string }>>([]);


  const fetchCrimes = async () => {
    try {
      const response = await axios.get('http://localhost:3000/reports'); 
      setCrimes(response.data); 
    } catch (error) {
      console.error('Error fetching crimes:', error);
    }
  };

  useEffect(() => {
    fetchCrimes(); 
  }, []);

  
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
          const currentLatLng = { lat: latitude, lng: longitude };
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

  const calculateRoute = () => {
    if (!currentLocation || !selectedPlace) {
      alert("Please enter a destination.");
      return;
    }

    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
      {
        origin: new google.maps.LatLng(currentLocation.lat, currentLocation.lng),
        destination: new google.maps.LatLng(selectedPlace.lat, selectedPlace.lng),
        travelMode: google.maps.TravelMode.WALKING, // You can change this to WALKING, BICYCLING, etc.
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

  const handleAutocomplete = (input: string) => {
    if (input.length < 3) {
      setSuggestions([]);
      return;
    }
  
    const autocompleteService = new google.maps.places.AutocompleteService();
    autocompleteService.getPlacePredictions({ input }, (predictions, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
        setSuggestions(predictions);
      }
    });
  };  

  const geocodeAddress = (address: string) => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address }, (results, status) => {
      // Add null checks for results and results[0]
      if (status === google.maps.GeocoderStatus.OK && results && results[0] && results[0].geometry.location) {
        const location = results[0].geometry.location;
        setSelectedPlace({ lat: location.lat(), lng: location.lng() });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  };
  

  // When a suggestion is selected
  const handleSelectSuggestion = (placeId: string) => {
    const placesService = new google.maps.places.PlacesService(document.createElement('div'));
  
    placesService.getDetails({ placeId }, (place, status) => {
      // Check if the status is OK and place is not null
      if (status === google.maps.places.PlacesServiceStatus.OK && place) {
        // Check if place has geometry and location
        if (place.geometry && place.geometry.location) {
          const { lat, lng } = place.geometry.location;
          setSelectedPlace({ lat: lat(), lng: lng() });
          setDestination(place.formatted_address || '');
          setSuggestions([]); // Clear suggestions after selecting a place
        } else {
          console.error("Place geometry or location is not available.");
        }
      } else {
        console.error("Place details could not be retrieved: ", status);
      }
    });
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
  });

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

  // Function to add a new person with a custom name
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
      setShowInputModal(false); // Hide modal after adding person
    }
  };

  // Function to get score color based on value
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

            {/* Places Autocomplete Search */}
            <div className="search-bar">
              <IonInput
                value={destination}
                onIonChange={(e) => {
                  setDestination(e.detail.value!);
                  handleAutocomplete(e.detail.value!);
                }}
                placeholder="Search..."
                style={{ width: '100%', padding: '10px', marginTop: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
              />

              {/* Render the autocomplete suggestions */}
              <div className="suggestion-box">
                {suggestions.map((suggestion) => (
                  <div
                    key={suggestion.place_id}
                    onClick={() => handleSelectSuggestion(suggestion.place_id)}
                    style={{
                      padding: '10px',
                      borderBottom: '1px solid #eee',
                      cursor: 'pointer',
                      backgroundColor: '#fff',
                    }}
                  >
                    {suggestion.description}
                  </div>
                ))}
              </div>
            </div>

            <div className="map-container">
              <LoadScript googleMapsApiKey="AIzaSyCM36RA6FKHrmxRn9gvafknRc7738HwXNo" libraries={['places']}>
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
                {crimes.map((crime, index) => (
                  <MarkerF
                    key={index}
                    position={{ lat: crime.location.lat, lng: crime.location.long }}
                    icon = '\media\yellow_MarkerA.png'
                    onMouseOver={() => {
                      const hoverTimeout = setTimeout(() => {
                      setSelectedCrime({ lat: crime.location.lat, long: crime.location.long, crimeType: crime.crimeType, description: crime.description });
                      }, 100);
                      return () => clearTimeout(hoverTimeout);
                    }}
                    onMouseOut={() => setSelectedCrime(null)}
                  />
                  ))}
                  {selectedCrime && (
                  <InfoWindowF
                    position={{ lat: selectedCrime.lat, lng: selectedCrime.long }}
                    onCloseClick={() => setSelectedCrime(null)}
                   >
                    <div>
                      <h4>{selectedCrime.crimeType}</h4>
                      <p>{selectedCrime.description}</p>
                    </div>
                  </InfoWindowF>
                )}
                  {directionsResponse && (
                    <DirectionsRenderer directions={directionsResponse} />
                  )}
                </GoogleMap>
              </LoadScript>
            </div>

            <div className="controls">
              <IonInput
                placeholder="Enter coordinates"
                value={destination}
                onIonChange={(e) => setDestination(e.detail.value!)}
                clearInput
              />
              <IonButton expand="block" onClick={calculateRoute}>
                Get Route
              </IonButton>
            
              <IonButton expand="block" color="danger" onClick={() => setShowSOSModal(true)}>
                SOS
              </IonButton>
            </div>

            <IonButton expand="full" onClick={openModal}>Report a Crime</IonButton>
        
            <ReportForm isOpen={isModalOpen} onClose={closeModal} />

            <div className="people-section">
              <div className="people-title">
                People
                <IonButton
                  onClick={() => setShowInputModal(true)}  // Open name input modal
                  style={{ backgroundColor: 'transparent', color: 'white', fontSize: '20px', padding: 0, marginLeft: 'auto' }} // Style for the "+" button
                >
                  +
                </IonButton>
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