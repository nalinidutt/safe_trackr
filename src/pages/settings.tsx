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

interface SettingsProps {
  locations: { name: string; address: string }[];
  addLocation: (name: string, address: string) => void;
}

const Settings: React.FC<SettingsProps> = ({ locations, addLocation }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [locationName, setLocationName] = useState('');
  const [locationAddress, setLocationAddress] = useState('');
  const [language, setLanguage] = useState('en'); // Default language is English

  const handleAddLocation = () => {
    addLocation(locationName, locationAddress);
    setLocationName('');
    setLocationAddress('');
  };

  const renderModalContent = () => {
    switch (selectedOption) {
      case 'Preferences':
        return (
          <div>
            <IonItem>
              <IonLabel>{language === 'es' ? 'Autopistas' : 'Highways'}</IonLabel>
              <IonToggle />
            </IonItem>
            <IonItem>
              <IonLabel>{language === 'es' ? 'Peajes' : 'Tolls'}</IonLabel>
              <IonToggle />
            </IonItem>
            <IonItem>
              <IonLabel>{language === 'es' ? 'Farola' : 'Street Light'}</IonLabel>
              <IonToggle />
            </IonItem>
            <IonItem>
              <IonLabel>{language === 'es' ? 'Tráfico' : 'Street Traffic'}</IonLabel>
              <IonToggle />
            </IonItem>
          </div>
        );
      case 'Appearance & Display':
        return (
          <div>
            <IonItem>
              <IonLabel>{language === 'es' ? 'Modo Oscuro' : 'Dark Mode'}</IonLabel>
              <IonToggle checked={darkMode} onIonChange={() => setDarkMode(!darkMode)} />
            </IonItem>
          </div>
        );
      case 'Saved Locations':
        return (
          <div>
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
            <IonLabel>{language === 'es' ? 'Nombre de usuario/correo' : 'Account Username/Email'}</IonLabel>
            <IonInput value="user@example.com" readonly />
            <IonButton>{language === 'es' ? 'Cambiar Contraseña' : 'Change Password'}</IonButton>
          </div>
        );
      case 'Privacy':
        return (
          <div>
            <IonLabel>{language === 'es' ? 'Compartir Información' : 'Share Information'}</IonLabel>
            <IonToggle />
          </div>
        );
      case 'Accessibility & Language':
        return (
          <div>
            <IonLabel>{language === 'es' ? 'Elige Idioma' : 'Choose Language'}</IonLabel>
            <IonSelect value={language} onIonChange={(e) => setLanguage(e.detail.value)}>
              <IonSelectOption value="en">English</IonSelectOption>
              <IonSelectOption value="es">Spanish</IonSelectOption>
              <IonSelectOption value="fr">French</IonSelectOption>
            </IonSelect>
          </div>
        );
      case 'Two-Factor Authentication':
        return (
          <div>
            <IonLabel>{language === 'es' ? 'Habilitar Autenticación de Dos Factores' : 'Enable Two-Factor Authentication'}</IonLabel>
            <IonToggle />
          </div>
        );
      case 'Account Activity':
        return (
          <IonLabel>
            {language === 'es' ? 'Última Apertura de la Aplicación:' : 'Most Recent App Opening:'} {new Date().toLocaleString()}
          </IonLabel>
        );
      case 'Subscription & Billing':
        return (
          <div>
            <IonLabel>{language === 'es' ? 'Plan Actual: Plan Gratuito' : 'Current Plan: Free Plan'}</IonLabel>
            <IonLabel>{language === 'es' ? 'Próximo Plan: Funciones Premium (Próximamente)' : 'Upcoming Plan: Premium Features (Coming Soon)'}</IonLabel>
          </div>
        );
      case 'Help & Support':
        return <IonLabel>{language === 'es' ? 'Correo de Contacto' : 'Contact Email'}: kripa.kannan17@gmail.com</IonLabel>;
      default:
        return null;
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{language === 'es' ? 'Configuraciones' : 'Settings'}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="iphone-wrapper">
          <div className="section">
            <h1 className="resources-title">{language === 'es' ? 'Configuraciones' : 'Settings'}</h1>

            {/* Navigation Section */}
            <p className="blue-background">{language === 'es' ? 'Navegación' : 'Navigation'}</p>
            <IonItem button onClick={() => { setSelectedOption('Preferences'); setModalOpen(true); }}>
              <IonLabel>{language === 'es' ? 'Preferencias' : 'Preferences'}</IonLabel>
            </IonItem>
            <IonItem button onClick={() => { setSelectedOption('Appearance & Display'); setModalOpen(true); }}>
              <IonLabel>{language === 'es' ? 'Apariencia y Pantalla' : 'Appearance & Display'}</IonLabel>
            </IonItem>
            <IonItem button onClick={() => { setSelectedOption('Saved Locations'); setModalOpen(true); }}>
              <IonLabel>{language === 'es' ? 'Ubicaciones Guardadas' : 'Saved Locations'}</IonLabel>
            </IonItem>

            {/* Account Section */}
            <p className="blue-background">{language === 'es' ? 'Cuenta' : 'Account'}</p>
            <IonItem button onClick={() => { setSelectedOption('Credentials'); setModalOpen(true); }}>
              <IonLabel>{language === 'es' ? 'Credenciales' : 'Credentials'}</IonLabel>
            </IonItem>
            <IonItem button onClick={() => { setSelectedOption('Privacy'); setModalOpen(true); }}>
              <IonLabel>{language === 'es' ? 'Privacidad' : 'Privacy'}</IonLabel>
            </IonItem>
            <IonItem button onClick={() => { setSelectedOption('Accessibility & Language'); setModalOpen(true); }}>
              <IonLabel>{language === 'es' ? 'Accesibilidad e Idioma' : 'Accessibility & Language'}</IonLabel>
            </IonItem>
            <IonItem button onClick={() => { setSelectedOption('Two-Factor Authentication'); setModalOpen(true); }}>
              <IonLabel>{language === 'es' ? 'Autenticación de Dos Factores' : 'Two-Factor Authentication'}</IonLabel>
            </IonItem>
            <IonItem button onClick={() => { setSelectedOption('Account Activity'); setModalOpen(true); }}>
              <IonLabel>{language === 'es' ? 'Actividad de la Cuenta' : 'Account Activity'}</IonLabel>
            </IonItem>
            <IonItem button onClick={() => { setSelectedOption('Subscription & Billing'); setModalOpen(true); }}>
              <IonLabel>{language === 'es' ? 'Suscripción y Facturación' : 'Subscription & Billing'}</IonLabel>
            </IonItem>
            <IonItem button onClick={() => { setSelectedOption('Help & Support'); setModalOpen(true); }}>
              <IonLabel>{language === 'es' ? 'Ayuda y Soporte' : 'Help & Support'}</IonLabel>
            </IonItem>
          </div>

          {/* Buttons at the bottom within the iPhone screen */}
          <div className="button-container">
            <IonButton expand="full" className="delete-button">{language === 'es' ? 'Conectar Dispositivos' : 'Connect Devices'}</IonButton>
            <IonButton expand="full" color="danger" className="delete-button">{language === 'es' ? 'Eliminar Cuenta' : 'Delete Account'}</IonButton>
          </div>
        </div>

        <IonModal isOpen={modalOpen} onDidDismiss={() => setModalOpen(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>{selectedOption}</IonTitle>
              <IonButton slot="end" onClick={() => setModalOpen(false)}>{language === 'es' ? 'Cerrar' : 'Close'}</IonButton>
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