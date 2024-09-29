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
  const [twoFactorAuthEnabled, setTwoFactorAuthEnabled] = useState(false); // State for two-factor auth
  const [phoneNumber, setPhoneNumber] = useState(''); // State for phone number
  const [authMessage, setAuthMessage] = useState(''); // State for authentication message
  const [shareInfoEnabled, setShareInfoEnabled] = useState(false); // State for share information toggle
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]); // State for selected options
  const [showPasswordForm, setShowPasswordForm] = useState(false); // Controls form visibility
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState(''); // To show any validation errors

  const handleAddLocation = () => {
    addLocation(locationName, locationAddress);
    setLocationName('');
    setLocationAddress('');
  };

  const handleShareInfoChange = (value: boolean) => {
    setShareInfoEnabled(value);
    if (!value) {
      setSelectedOptions([]); // Clear selected options when toggle is off
    }
  };

  const handleOptionChange = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((opt) => opt !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleApply = () => {
    console.log('Applied settings:', selectedOptions); // Handle applying settings as needed
    // Additional logic for applying settings can be added here
  };

  const renderModalContent = () => {
    switch (selectedOption) {
      case 'Preferences':
        return (
          <div style={{ marginLeft: '50px', marginRight: '50px', marginTop: '50px' }}>
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
          <div style={{ marginLeft: '50px', marginRight: '50px', marginTop: '50px' }}>
            <IonItem>
              <IonLabel>{language === 'es' ? 'Modo Oscuro' : 'Dark Mode'}</IonLabel>
              <IonToggle checked={darkMode} onIonChange={() => setDarkMode(!darkMode)} />
            </IonItem>
          </div>
        );
      case 'Saved Locations':
        return (
          <div style={{ marginLeft: '50px', marginRight: '50px', marginTop: '50px' }}>
            <ul>
              {locations.map((loc, index) => (
                <li key={index}>{`${loc.name}, ${loc.address}`}</li>
              ))}
            </ul>
          </div>
        );
        case 'Credentials':
          return (
            <div style={{ marginLeft: '50px', marginRight: '50px', marginTop: '50px' }}>
              <IonLabel style={{ textDecoration: 'underline' }}>
              {language === 'es' ? 'Nombre de usuario/correo' : 'Account Username/Email'}
            </IonLabel>

              <IonInput value="SafeTrackr@gmail.com" readonly />
        
              {/* Toggle visibility of the password change form */}
              {!showPasswordForm && (
                <IonButton onClick={() => setShowPasswordForm(true)}>
                  {language === 'es' ? 'Cambiar Contraseña' : 'Change Password'}
                </IonButton>
              )}
        
              {/* Show the password change form when button is clicked */}
              {showPasswordForm && (
                <div>
                  <IonItem>
                    <IonLabel>{language === 'es' ? 'Contraseña Antigua' : 'Old Password'}</IonLabel>
                    <IonInput
                      type="password"
                      value={oldPassword}
                      onIonChange={(e) => setOldPassword(e.detail.value!)}
                      placeholder={language === 'es' ? 'Ingrese su contraseña antigua' : 'Enter your old password'}
                    />
                  </IonItem>
        
                  <IonItem>
                    <IonLabel>{language === 'es' ? 'Nueva Contraseña' : 'New Password'}</IonLabel>
                    <IonInput
                      type="password"
                      value={newPassword}
                      onIonChange={(e) => setNewPassword(e.detail.value!)}
                      placeholder={language === 'es' ? 'Ingrese su nueva contraseña' : 'Enter your new password'}
                    />
                  </IonItem>
        
                  <IonItem>
                    <IonLabel>{language === 'es' ? 'Confirmar Nueva Contraseña' : 'Confirm New Password'}</IonLabel>
                    <IonInput
                      type="password"
                      value={confirmPassword}
                      onIonChange={(e) => setConfirmPassword(e.detail.value!)}
                      placeholder={language === 'es' ? 'Confirme su nueva contraseña' : 'Confirm your new password'}
                    />
                  </IonItem>
        
                  {/* Show any password validation errors */}
                  {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
        
                  <IonButton
                    expand="full"
                    onClick={() => {
                      // Validate password inputs
                      if (newPassword !== confirmPassword) {
                        setPasswordError(language === 'es' ? 'Las contraseñas no coinciden' : 'Passwords do not match');
                      } else if (!oldPassword || !newPassword) {
                        setPasswordError(language === 'es' ? 'Por favor llene todos los campos' : 'Please fill in all fields');
                      } else {
                        setPasswordError('');
                        // Handle password change logic here
                        console.log('Old Password:', oldPassword);
                        console.log('New Password:', newPassword);
        
                        // Simulate success and hide form after submitting
                        setShowPasswordForm(false);
                      }
                    }}
                    style={{ marginTop: '10px' }}
                  >
                    {language === 'es' ? 'Confirmar Cambio de Contraseña' : 'Confirm Password Change'}
                  </IonButton>
                </div>
              )}
            </div>
          );
        case 'Privacy':
        return (
          <div style={{ marginLeft: '50px', marginRight: '50px', marginTop: '50px' }}>
            <IonLabel>{language === 'es' ? 'Compartir Información' : 'Share Information'}</IonLabel>
            <IonToggle 
              checked={shareInfoEnabled} 
              onIonChange={(e) => handleShareInfoChange(e.detail.checked)} 
            />
            {shareInfoEnabled && (
              <div style={{ marginTop: '10px' }}>
                <h4>{language === 'es' ? 'Seleccione lo que aplica:' : 'Check all that apply:'}</h4>
                <IonItem>
                  <IonLabel>Data Transfer</IonLabel>
                  <IonToggle 
                    checked={selectedOptions.includes('dataTransfer')}
                    onIonChange={() => handleOptionChange('dataTransfer')}
                  />
                </IonItem>
                <IonItem>
                  <IonLabel>Notify Emergency Contact</IonLabel>
                  <IonToggle 
                    checked={selectedOptions.includes('notifyEmergencyContact')}
                    onIonChange={() => handleOptionChange('notifyEmergencyContact')}
                  />
                </IonItem>
                <IonItem>
                  <IonLabel>Safety Score</IonLabel>
                  <IonToggle 
                    checked={selectedOptions.includes('safetyScore')}
                    onIonChange={() => handleOptionChange('safetyScore')}
                  />
                </IonItem>
                <IonItem>
                  <IonLabel>Most Recent Location</IonLabel>
                  <IonToggle 
                    checked={selectedOptions.includes('mostRecentLocation')}
                    onIonChange={() => handleOptionChange('mostRecentLocation')}
                  />
                </IonItem>
                {/* Add more options as needed */}
                <IonButton 
                  expand="full" 
                  onClick={() => { 
                    setAuthMessage('Privacy Changes Applied Successfully'); // Set the authentication message
                  }}
                  style={{ marginTop: '10px' }} // Margin for spacing
                >
                  {language === 'es' ? 'Aplicar Cambios' : 'Apply Changes'}
                </IonButton>
                {authMessage && <p style={{ marginTop: '10px', color: 'green' }}>{authMessage}</p>} {/* Display the message */}
              </div>
            )}
          </div>
        );
      case 'Accessibility & Language':
        return (
          <div style={{ marginLeft: '50px', marginRight: '50px', marginTop: '50px' }}>
            <IonLabel>{language === 'es' ? 'Elige Idioma' : 'Choose Language'}</IonLabel>
            <IonSelect value={language} onIonChange={(e) => setLanguage(e.detail.value)}>
              <IonSelectOption value="en">English</IonSelectOption>
              <IonSelectOption value="es">Spanish</IonSelectOption>
              <IonSelectOption value="am">Amharic</IonSelectOption>
              <IonSelectOption value="ar">Arabic</IonSelectOption>
              <IonSelectOption value="bn">Bengali</IonSelectOption>
              <IonSelectOption value="bjp">Bhojpuri</IonSelectOption>
              <IonSelectOption value="my">Burmese</IonSelectOption>
              <IonSelectOption value="ceb">Cebuano</IonSelectOption>
              <IonSelectOption value="ny">Chewa</IonSelectOption>
              <IonSelectOption value="chg">Chhattisgarhi</IonSelectOption>
              <IonSelectOption value="ctg">Chittagonian</IonSelectOption>
              <IonSelectOption value="cs">Czech</IonSelectOption>
              <IonSelectOption value="nl">Dutch</IonSelectOption>
              <IonSelectOption value="fa">Farsi (Persian)</IonSelectOption>
              <IonSelectOption value="fr">French</IonSelectOption>
              <IonSelectOption value="de">German</IonSelectOption>
              <IonSelectOption value="gu">Gujarati</IonSelectOption>
              <IonSelectOption value="ht">Hatian Creole</IonSelectOption>
              <IonSelectOption value="hi">Hindi</IonSelectOption>
              <IonSelectOption value="ig">Igbo</IonSelectOption>
              <IonSelectOption value="id">Indonesian</IonSelectOption>
              <IonSelectOption value="it">Italian</IonSelectOption>
              <IonSelectOption value="ja">Japanese</IonSelectOption>
              <IonSelectOption value="kn">Kannada</IonSelectOption>
              <IonSelectOption value="ko">Korean</IonSelectOption>
              <IonSelectOption value="mad">Madurese</IonSelectOption>
              <IonSelectOption value="ms">Malay</IonSelectOption>
              <IonSelectOption value="ml">Malayalam</IonSelectOption>
              <IonSelectOption value="mr">Marathi</IonSelectOption>
              <IonSelectOption value="mn">Min Nan Chinese</IonSelectOption>
              <IonSelectOption value="ne">Nepali</IonSelectOption>
              <IonSelectOption value="pl">Polish</IonSelectOption>
              <IonSelectOption value="pt">Portuguese</IonSelectOption>
              <IonSelectOption value="ro">Romanian</IonSelectOption>
              <IonSelectOption value="ru">Russian</IonSelectOption>
              <IonSelectOption value="so">Somali</IonSelectOption>
              <IonSelectOption value="su">Sundanese</IonSelectOption>
              <IonSelectOption value="ta">Tamil</IonSelectOption>
              <IonSelectOption value="te">Telugu</IonSelectOption>
              <IonSelectOption value="th">Thai</IonSelectOption>
            </IonSelect>
          </div>
        );
        case 'Two-Factor Authentication':
        return (
          <div style={{ marginLeft: '50px', marginRight: '50px', marginTop: '50px' }}>
            <IonLabel>{language === 'es' ? 'Habilitar Autenticación de Dos Factores' : 'Enable Two-Factor Authentication'}</IonLabel>
            <IonToggle checked={twoFactorAuthEnabled} onIonChange={() => setTwoFactorAuthEnabled(!twoFactorAuthEnabled)} />
            {twoFactorAuthEnabled && (
              <div style={{ marginTop: '20px' }}>
                <IonInput 
                  value={phoneNumber}
                  placeholder="Enter your phone number"
                  onIonChange={(e) => setPhoneNumber(e.detail.value!)} 
                />
                <IonButton 
                  expand="full" 
                  onClick={() => { 
                    setAuthMessage('Authentication successful'); // Set the authentication message
                  }} 
                  style={{ marginTop: '10px' }} // Margin for spacing
                >
                  {language === 'es' ? 'Confirmar Autenticación' : 'Confirm Duo Authentication'}
                </IonButton>
                {authMessage && <p style={{ marginTop: '10px', color: 'green' }}>{authMessage}</p>} {/* Display the message */}
              </div>
            )}
          </div>
        );
      case 'Account Activity':
        return (
          <div style={{ marginLeft: '50px', marginRight: '50px', marginTop: '50px' }}>
          <IonLabel>
            {language === 'es' ? 'Última Apertura de la Aplicación:' : 'Most Recent App Opening:'} {new Date().toLocaleString()}
          </IonLabel>
          </div>
        );
      case 'Subscription & Billing':
        return (
          <div style={{ marginLeft: '50px', marginRight: '50px', marginTop: '50px' }}>
            <IonLabel>{language === 'es' ? 'Plan Actual: Plan Gratuito' : 'Current Plan: Free Plan'}</IonLabel>
            <p> </p>
            <IonLabel>{language === 'es' ? 'Próximo Plan: Funciones Premium (Próximamente)' : 'Upcoming Plan: Premium Features (Coming Soon)'}</IonLabel>
          </div>
        );
        case 'Help & Support':
          return (
            <div style={{ marginLeft: '50px', marginRight: '50px', marginTop: '50px' }}>
      <       p>
                Reach out to us if you have any questions at +1 (469) 927 - 2095 or email us at 
                <a href="mailto:SafeTrackr@gmail.com"> SafeTrackr@gmail.com</a>.
              </p>
            </div>
          );
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