import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton } from '@ionic/react';
import React, { useState } from 'react';

const Favorites: React.FC = () => {
    const [locations, setLocations] = useState<{ name: string; address: string }[]>([]);
    const [contacts, setContacts] = useState<{ name: string; phone: string }[]>([]);
    
    const [locationName, setLocationName] = useState('');
    const [locationAddress, setLocationAddress] = useState('');
    const [contactName, setContactName] = useState('');
    const [contactPhone, setContactPhone] = useState('');

    const handleAddLocation = () => {
        if (locationName && locationAddress) {
            setLocations([...locations, { name: locationName, address: locationAddress }]);
            setLocationName('');
            setLocationAddress('');
        }
    };

    const handleAddContact = () => {
        if (contactName && contactPhone) {
            setContacts([...contacts, { name: contactName, phone: contactPhone }]);
            setContactName('');
            setContactPhone('');
        }
    };

    return (
<<<<<<< HEAD
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
=======
>>>>>>> master
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Favorites</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <style>{`
                    .iphone-wrapper {
                        width: 390px;
                        height: 844px;
                        border: 1px solid #ccc;
                        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
                        border-radius: 30px;
                        margin: 50px auto;
                        overflow: hidden;
                    }

                    .section {
                        padding: 16px;
                        font-size: 16px;
                    }

                    .blue-background {
                        background-color: #3F7C85;
                        color: white;
                        padding: 8px; /* Smaller padding */
                        border-radius: 5px;
                        text-align: center;
                        margin-bottom: 12px;
                        font-size: 18px; /* Smaller font size */
                    }

                    .locations-container, .contacts-container {
                        display: flex;
                        flex-direction: column;
                        gap: 8px; /* Smaller gap */
                        max-height: 150px; /* Height for multiple cards to fit */
                        overflow-y: auto; /* Enable vertical scrolling */
                        padding-right: 5px; /* Padding for scroll bar */
                        scrollbar-width: thin; /* For Firefox */
                    }

                    .locations-container::-webkit-scrollbar,
                    .contacts-container::-webkit-scrollbar {
                        width: 8px; /* Width of the scrollbar */
                    }

                    .locations-container::-webkit-scrollbar-thumb,
                    .contacts-container::-webkit-scrollbar-thumb {
                        background-color: #3F7C85; /* Color of the scrollbar thumb */
                        border-radius: 10px; /* Rounded corners for the scrollbar */
                    }

                    .location-card, .contact-card {
                        border: 2px solid #3F7C85; /* Blue border */
                        border-radius: 5px;
                        padding: 12px; /* Comfortable padding */
                        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
                        font-size: 14px; /* Smaller font size */
                    }

                    ion-input {
                        margin-bottom: 12px;
                    }

                    .add-button {
                        background-color: #3F7C85;
                        color: white;
                        margin-bottom: 20px;
                    }

                    .resources-title {
                        margin-top: 30px;
                        font-size: 24px;
                        text-align: center;
                    }
                `}</style>

                <div className="iphone-wrapper">
                    <div className="section">
                        <h1 className="resources-title">Favorites</h1>
                        <h2 className="blue-background">Saved Locations</h2>
                        <IonInput
                            placeholder="Location Name"
                            value={locationName}
                            onIonChange={(e) => setLocationName(e.detail.value!)}
                        />
                        <IonInput
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
                            placeholder="Contact Name"
                            value={contactName}
                            onIonChange={(e) => setContactName(e.detail.value!)}
                        />
                        <IonInput
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
            </IonContent>
        </IonPage>
    );
};

export default Favorites;