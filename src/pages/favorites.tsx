import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton } from '@ionic/react';
import React, { useState } from 'react';

interface FavoritesProps {
  locations: { name: string; address: string }[];
  addLocation: (name: string, address: string) => void;
  language: string; // Language prop
}

const Favorites: React.FC<FavoritesProps> = ({ locations, addLocation, language }) => {
  const [locationName, setLocationName] = useState('');
  const [locationAddress, setLocationAddress] = useState('');
  const [contacts, setContacts] = useState<{ name: string; phone: string }[]>([]);
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleAddLocation = () => {
    if (!locationName || !locationAddress) {
      setErrorMessage(language === 'es' ? 'Por favor, complete todos los campos.' : 'Please fill in all fields.');
      return;
    }

    setErrorMessage(''); // Reset error message
    addLocation(locationName, locationAddress);
    setSuccessMessage(language === 'es' ? 'Lugar agregado con éxito.' : 'Location added successfully.');
    
    setLocationName('');
    setLocationAddress('');
    
    // Clear success message after a short delay
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleAddContact = () => {
    if (!contactName || !contactPhone) {
      setErrorMessage(language === 'es' ? 'Por favor, complete todos los campos.' : 'Please fill in all fields.');
      return;
    }

    setContacts([...contacts, { name: contactName, phone: contactPhone }]);
    setContactName('');
    setContactPhone('');
    setErrorMessage(''); // Reset error message
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{language === 'es' ? 'Favoritos' : 'Favorites'}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="iphone-wrapper">
          <div className="section">
            <h1 className="resources-title">{language === 'es' ? 'Favoritos' : 'Favorites'}</h1>
            <p className="blue-background">{language === 'es' ? 'Ubicaciones Guardadas' : 'Saved Locations'}</p>
            <IonInput
              placeholder={language === 'es' ? 'Nombre del Lugar' : 'Location Name'}
              value={locationName}
              onIonChange={(e) => setLocationName(e.detail.value ?? '')} // Safety check
            />
            <IonInput
              placeholder={language === 'es' ? 'Dirección, Ciudad, Estado, Código Postal' : 'Address, City, State, Zip Code'}
              value={locationAddress}
              onIonChange={(e) => setLocationAddress(e.detail.value ?? '')}
            />
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            <IonButton expand="block" className="add-button" onClick={handleAddLocation}>
              {language === 'es' ? 'Agregar Lugar' : 'Add Location'}
            </IonButton>

            <p className="blue-background">{language === 'es' ? 'Contactos de Emergencia' : 'Emergency Contacts'}</p>
            <IonInput
              placeholder={language === 'es' ? 'Nombre del Contacto' : 'Contact Name'}
              value={contactName}
              onIonChange={(e) => setContactName(e.detail.value ?? '')}
            />
            <IonInput
              placeholder={language === 'es' ? 'Teléfono del Contacto' : 'Contact Phone'}
              value={contactPhone}
              onIonChange={(e) => setContactPhone(e.detail.value ?? '')}
            />
            <IonButton expand="block" className="add-button" onClick={handleAddContact}>
              {language === 'es' ? 'Agregar Contacto' : 'Add Emergency Contact'}
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Favorites;