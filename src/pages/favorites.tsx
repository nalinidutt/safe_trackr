import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton } from '@ionic/react';
import React, { useState } from 'react';
import './styling/favorites.css';

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