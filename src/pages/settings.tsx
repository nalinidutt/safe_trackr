import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonModal,
  IonToggle,
  IonSelect,
  IonSelectOption,
} from '@ionic/react';
import './styling/settings.css';

const Settings: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [locationName, setLocationName] = useState('');
  const [locationAddress, setLocationAddress] = useState('');
  const [locations, setLocations] = useState<{ name: string; address: string }[]>([]);

  const handleAddLocation = () => {
    if (locationName && locationAddress) {
      setLocations([...locations, { name: locationName, address: locationAddress }]);
      setLocationName('');
      setLocationAddress('');
    }
  };

  const renderModalContent = () => {
    switch (selectedOption) {
      case 'Preferences':
        return (
          <div>
            <IonItem>
              <IonLabel>Maps</IonLabel>
              <IonToggle />
            </IonItem>
            <IonItem>
              <IonLabel>Tolls</IonLabel>
              <IonToggle />
            </IonItem>
            <IonItem>
              <IonLabel>Street Light</IonLabel>
              <IonToggle />
            </IonItem>
            <IonItem>
              <IonLabel>Street Traffic</IonLabel>
              <IonToggle />
            </IonItem>
          </div>
        );
      case 'Appearance & Display':
        return (
          <div>
            <IonItem>
              <IonLabel>Dark Mode</IonLabel>
              <IonToggle checked={darkMode} onIonChange={() => setDarkMode(!darkMode)} />
            </IonItem>
          </div>
        );
      case 'Saved Locations':
        return (
          <div>
            <IonInput
              value={locationName}
              placeholder="Location Name"
              onIonChange={(e) => setLocationName(e.detail.value!)}
            />
            <IonInput
              value={locationAddress}
              placeholder="Location Address"
              onIonChange={(e) => setLocationAddress(e.detail.value!)}
            />
            <IonButton onClick={handleAddLocation}>Add Location</IonButton>
            <ul>
              {locations.map((loc, index) => (
                <li key={index}>{`${loc.name}, ${loc.address}`}</li>
              ))}
            </ul>
          </div>
        );
      case 'Credentials':
        return (
          <div>
            <IonLabel>Account Username/Email</IonLabel>
            <IonInput value="user@example.com" readonly />
            <IonButton>Change Password</IonButton>
          </div>
        );
      case 'Privacy':
        return (
          <div>
            <IonLabel>Share Information</IonLabel>
            <IonToggle />
          </div>
        );
      case 'Accessibility & Language':
        return (
          <div>
            <IonLabel>Choose Language</IonLabel>
            <IonSelect>
              <IonSelectOption value="en">English</IonSelectOption>
              <IonSelectOption value="es">Spanish</IonSelectOption>
              <IonSelectOption value="fr">French</IonSelectOption>
            </IonSelect>
          </div>
        );
      case 'Two-Factor Authentication':
        return (
          <div>
            <IonLabel>Enable Two-Factor Authentication</IonLabel>
            <IonToggle />
          </div>
        );
      case 'Account Activity':
        return <IonLabel>Most Recent App Opening: {new Date().toLocaleString()}</IonLabel>;
      case 'Subscription & Billing':
        return (
          <div>
            <IonLabel>Current Plan: Free Plan</IonLabel>
            <IonLabel>Upcoming Plan: Premium Features (Coming Soon)</IonLabel>
          </div>
        );
      case 'Help & Support':
        return <IonLabel>Contact Email: kripa.kannan17@gmail.com</IonLabel>;
      default:
        return null;
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

        <div className="iphone-wrapper">
          <div className="section">
            <h1 className="resources-title">Settings</h1>

            {/* Navigation Section */}
            <p className="blue-background">Navigation</p>
            <IonItem button onClick={() => { setSelectedOption('Preferences'); setModalOpen(true); }}>
              <IonLabel>Preferences</IonLabel>
            </IonItem>
            <IonItem button onClick={() => { setSelectedOption('Appearance & Display'); setModalOpen(true); }}>
              <IonLabel>Appearance & Display</IonLabel>
            </IonItem>
            <IonItem button onClick={() => { setSelectedOption('Saved Locations'); setModalOpen(true); }}>
              <IonLabel>Saved Locations</IonLabel>
            </IonItem>

            {/* Account Section */}
            <p className="blue-background">Account</p>
            <IonItem button onClick={() => { setSelectedOption('Credentials'); setModalOpen(true); }}>
              <IonLabel>Credentials</IonLabel>
            </IonItem>
            <IonItem button onClick={() => { setSelectedOption('Privacy'); setModalOpen(true); }}>
              <IonLabel>Privacy</IonLabel>
            </IonItem>
            <IonItem button onClick={() => { setSelectedOption('Accessibility & Language'); setModalOpen(true); }}>
              <IonLabel>Accessibility & Language</IonLabel>
            </IonItem>
            <IonItem button onClick={() => { setSelectedOption('Two-Factor Authentication'); setModalOpen(true); }}>
              <IonLabel>Two-Factor Authentication</IonLabel>
            </IonItem>
            <IonItem button onClick={() => { setSelectedOption('Account Activity'); setModalOpen(true); }}>
              <IonLabel>Account Activity</IonLabel>
            </IonItem>
            <IonItem button onClick={() => { setSelectedOption('Subscription & Billing'); setModalOpen(true); }}>
              <IonLabel>Subscription & Billing</IonLabel>
            </IonItem>
            <IonItem button onClick={() => { setSelectedOption('Help & Support'); setModalOpen(true); }}>
              <IonLabel>Help & Support</IonLabel>
            </IonItem>
          </div>
        </div>

        <IonModal isOpen={modalOpen} onDidDismiss={() => setModalOpen(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>{selectedOption}</IonTitle>
              <IonButton slot="end" onClick={() => setModalOpen(false)}>Close</IonButton>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            {renderModalContent()}
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Settings;