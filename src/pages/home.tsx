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
  const [showReportModal, setShowReportModal] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const [crimes, setCrimes] = useState<Array<{ location: { lat: number; long: number }; crimeType: string; description: string }>>([]);

  const findSafestRoute = async (routesList: any) => {
    try {
      const response = await axios.post('http://localhost:5000/process', routesList);
      console.log(response.data.result);
    } catch (error) {
        console.error('Error:', error);
    }
  }

  const openReportModal = () => {
    setShowReportModal(true);
  };

  const closeReportModal = () => {
    setShowReportModal(false);
  };

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
        provideRouteAlternatives: true,
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
    if (input.length < 1) {
      setSuggestions([]);
      return;
    }
  
    const autocompleteService = new google.maps.places.AutocompleteService();
    autocompleteService.getPlacePredictions({ input }, (predictions, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
        setSuggestions(predictions);
      } else {
        setSuggestions([]);
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

  /*
  const calculateScoreForRoute = (route) => {

  }

  const findSafestRoute = (routesList) => {


    for (let index = 0; index < routesList.routes.length; index++) {
      const element = array[index];
    }
  }
  */

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
    }
  }, [currentLocation, map]);

  const navigateToReportForm = () => {
    history.push('/report_form');
  };

  const [people, setPeople] = useState([
    { name: 'User 1', score: 14, location: 'Home Park', time: '9:15pm' },
    { name: 'User 2', score: 56, location: 'Scheller', time: '8:47pm' },
  ]);

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
              onIonChange={(e) => {
                setDestination(e.detail.value!);
                handleAutocomplete(e.detail.value!);
              }}
              clearInput
              style={{ flex: 1, marginRight: '8px', marginTop: '20px', marginLeft: '10px', width: '70%' }} // Shortened width
            />
            <IonButton 
              expand="block" 
              onClick={findSafestRoute} 
              style={{ width: '30%', marginTop: '20px' }} // Smaller width
            >
              Go
            </IonButton>
          </div>

          {suggestions.length > 0 && (
            <IonList className="suggestions-box">
              {suggestions.map((suggestion, index) => (
                <IonItem
                  key={index}
                  button
                  onClick={() => handleSelectSuggestion(suggestion.place_id)} // Handle suggestion click
                >
                  {suggestion.description}
                </IonItem>
              ))}
            </IonList>
          )}

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

          <div className="button-container" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
            <IonButton expand="full" onClick={openReportModal} style={{ marginRight: '4px' }}>
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

          <ReportForm isOpen={showReportModal} onClose={closeReportModal} />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;