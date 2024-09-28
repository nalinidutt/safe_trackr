import {
    IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonModal, IonList, IonItem
  } from '@ionic/react';
  import React, { useState } from 'react';
  import { GoogleMap, LoadScript } from '@react-google-maps/api';
  import './styling/home.css';
  
  const mapContainerStyle = {
    width: '100%',
    height: '100%',
  };
  
  const center = {
    lat: 33.7501,
    lng: -84.3885,
  };
  
  // Function to generate random values
  const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  
  const getRandomTime = () => {
    const hour = getRandomNumber(1, 12);
    const minutes = getRandomNumber(0, 59).toString().padStart(2, '0');
    const period = getRandomNumber(0, 1) === 0 ? 'am' : 'pm';
    return `${hour}:${minutes}${period}`;
  };
  
  const getRandomLocation = () => {
    const locations = ['Home Park', 'Tech Square', 'Scheller', 'Piedmont Park', 'Clough Commons'];
    return locations[getRandomNumber(0, locations.length - 1)];
  };
  
  const Home: React.FC = () => {
    const [people, setPeople] = useState([
      { name: 'Kripa Kannan', score: 93, location: 'Home Park', time: '9:15pm' },
      { name: 'Nalini Dutt', score: 14, location: 'Scheller', time: '8:47pm' },
      { name: 'Diya Kaimal', score: 56, location: 'Tech Square', time: '9:00pm' },
    ]);
  
    const [personName, setPersonName] = useState('');
    const [showInput, setShowInput] = useState(false);  // Controls the name input visibility
  
    const [showModal, setShowModal] = useState(false);  // Controls the SOS modal visibility
  
    // Function to add a new person
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
        setShowInput(false); // Hide input after adding person
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
              <LoadScript googleMapsApiKey="YOUR_API_KEY">
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={center}
                  zoom={10}
                />
              </LoadScript>
            </div>
  
            <div className="people-section">
              <div className="people-title">
                People
                <IonButton
                  onClick={() => setShowInput(!showInput)}  // Toggle input visibility
                  style={{ backgroundColor: 'transparent', color: 'gray', fontSize: '24px', padding: 0, marginLeft: '10px' }}
                >
                  +
                </IonButton>
              </div>
              <hr />
              {showInput && (
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  <IonInput
                    value={personName}
                    placeholder="Enter person name"
                    onIonChange={(e) => setPersonName(e.detail.value!)}
                    style={{ marginRight: '10px', padding: '5px', border: '1px solid gray', borderRadius: '5px' }}
                  />
                  <IonButton onClick={addPerson}>Add</IonButton>
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Favorites</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <div className="iphone-wrapper">
                    <div className="section">
                        <h1 className="resources-title">Favorites</h1>
                        <h2 className="blue-background">Saved Locations</h2>
                        <IonInput
                            className="custom-input"
                            placeholder="Location Name"
                            value={locationName}
                            onIonChange={(e) => setLocationName(e.detail.value!)}
                        />
                        <IonInput
                            className="custom-input"
                            placeholder="Address, City, State, Zip Code"
                            value={locationAddress}
                            onIonChange={(e) => setLocationAddress(e.detail.value!)}
                        />
                        <IonButton expand="block" className="add-button" onClick={handleAddLocation}>Add Location</IonButton>
                        <div className="locations-container">
                            {locations.map((location, index) => (
                                <div key={index} className="location-card">
                                    <h3>{location.name}</h3>
                                    <p>{location.address}</p>
                                </div>
                            ))}
                        </div>

                        <h2 className="blue-background">Emergency Contacts</h2>
                        <IonInput
                            className="custom-input"
                            placeholder="Contact Name"
                            value={contactName}
                            onIonChange={(e) => setContactName(e.detail.value!)}
                        />
                        <IonInput
                            className="custom-input"
                            placeholder="Phone Number"
                            value={contactPhone}
                            onIonChange={(e) => setContactPhone(e.detail.value!)}
                        />
                        <IonButton expand="block" className="add-button" onClick={handleAddContact}>Add Contact</IonButton>
                        <div className="contacts-container">
                            {contacts.map((contact, index) => (
                                <div key={index} className="contact-card">
                                    <h3>{contact.name}</h3>
                                    <p>{contact.phone}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
              )}
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
  
            <IonButton expand="block" color="danger" onClick={() => setShowModal(true)}>
              SOS
            </IonButton>
  
            <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
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
                <IonButton onClick={() => setShowModal(false)}>Close</IonButton>
              </IonContent>
            </IonModal>
          </div>
        </IonContent>
      </IonPage>
    );
  };
  
  export default Home;  