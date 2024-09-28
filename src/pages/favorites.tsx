import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton } from '@ionic/react';
import React, { useState } from 'react';

interface FavoritesProps {
    locations: { name: string; address: string }[];
    addLocation: (name: string, address: string) => void;
}

// Function to fetch geocoded address from a geocoding API
const geocodeAddress = async (address: string): Promise<string | null> => {
    const apiKey = 'YOUR_GEOCODING_API_KEY'; // Replace with your geocoding API key
    const response = await fetch(`https://api.geocoding-service.com/v1/geocode?address=${encodeURIComponent(address)}&key=${apiKey}`);

    if (response.ok) {
        const data = await response.json();
        if (data.results && data.results.length > 0) {
            return data.results[0].formatted_address; // Return the formatted address
        }
    }
    return null; // Return null if not found
};

const Favorites: React.FC<FavoritesProps> = ({ locations, addLocation }) => {
    const [locationName, setLocationName] = useState('');
    const [locationAddress, setLocationAddress] = useState('');
    const [contacts, setContacts] = useState<{ name: string; phone: string }[]>([]);
    const [contactName, setContactName] = useState('');
    const [contactPhone, setContactPhone] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleAddLocation = async () => {
        const geocodedAddress = await geocodeAddress(locationAddress);
        
        if (geocodedAddress) {
            addLocation(locationName, geocodedAddress);
            setLocationName('');
            setLocationAddress('');
            setErrorMessage('');
        } else {
            setErrorMessage('Invalid address. Please try again.'); // Display error message if address is not valid
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

                        <p className="blue-background">Saved Locations</p>
                        {/* Add Location Form */}
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
                        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}
                        <IonButton expand="block" className="add-button" onClick={handleAddLocation}>
                            Add Location
                        </IonButton>

                        {/* Display Favorite Locations */}
                        <div className="locations-container">
                            {locations.map((location, index) => (
                                <div key={index} className="location-card">
                                    <h3>{location.name}</h3>
                                    <p>{location.address}</p>
                                </div>
                            ))}
                        </div>

                        <p className="blue-background">Emergency Contacts</p>
                        {/* Add Emergency Contact Form */}
                        <IonInput
                            placeholder="Contact Name"
                            value={contactName}
                            onIonChange={(e) => setContactName(e.detail.value!)}
                        />
                        <IonInput
                            placeholder="Contact Phone"
                            value={contactPhone}
                            onIonChange={(e) => setContactPhone(e.detail.value!)}
                        />
                        <IonButton expand="block" className="add-button" onClick={handleAddContact}>
                            Add Emergency Contact
                        </IonButton>

                        {/* Display Emergency Contacts */}
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