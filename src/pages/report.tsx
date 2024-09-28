import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonLabel, IonSelect, IonSelectOption, IonItem } from '@ionic/react';
import axios from 'axios';

const ReportForm: React.FC = () => {
  const [location, setLocation] = useState({ lat: '', long: '' });
  const [selectedCrime, setSelectedCrime] = useState<string>('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude.toString(),
            long: position.coords.longitude.toString(),
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Failed to get location. Please enable location services.');
        }
      );
    } else {
      alert('Location services are not supported by your browser.');
    }
  }, []);
  
  
  const handleSubmit = async (e: React.FormEvent) => {
    alert(`Crime Type: ${selectedCrime}`);
    e.preventDefault();

    const reportData = {
      location,
      selectedCrime,
      description,
    };

    console.log(reportData)

    try {
      const response = await axios.post('http://localhost:3000/report', reportData);
      alert(response.data.message);
    } catch (error) {
      console.error('Error submitting report:', error);
      alert('Failed to submit report');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Report a Crime</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form onSubmit={handleSubmit}>
          <IonItem>
            <IonLabel position="floating">Latitude</IonLabel>
            <IonInput
              value={location.lat}
              onIonChange={(e) => setLocation({ ...location, lat: e.detail.value! })}
              required
            />
          </IonItem>
          <IonItem>
            <IonSelect
              value={selectedCrime}
              placeholder="Select Crime Type"
              onIonChange={(e) => setSelectedCrime(e.detail.value!)} // Update selected crime type
            >
              <IonSelectOption value="Drug/Narcotics">Drug/Narcotics</IonSelectOption>
              <IonSelectOption value="Property Destruction">Property Destruction</IonSelectOption>
              <IonSelectOption value="Theft">Theft</IonSelectOption>
              <IonSelectOption value="Shoplifting">Shoplifting</IonSelectOption>
              <IonSelectOption value="Assault">Assault</IonSelectOption>
              <IonSelectOption value="Robbery">Robbery</IonSelectOption>
              <IonSelectOption value="Intimidation">Intimidation</IonSelectOption>
              <IonSelectOption value="Murder">Murder</IonSelectOption>
              <IonSelectOption value="Prostitution">Murder</IonSelectOption>
              <IonSelectOption value="Kidnapping">Kidnapping</IonSelectOption>
              <IonSelectOption value="Pick-pocketing">Pick-pocketing</IonSelectOption>
              <IonSelectOption value="Human Trafficking">Human Trafficking</IonSelectOption>
              <IonSelectOption value="Other">Other</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Longitude</IonLabel>
            <IonInput
              value={location.long}
              onIonChange={(e) => setLocation({ ...location, long: e.detail.value! })}
              required
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Description</IonLabel>
            <IonInput
              value={description}
              onIonChange={(e) => setDescription(e.detail.value!)}
              required
            />
          </IonItem>
          <IonButton expand="full" type="submit">Submit Report</IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default ReportForm;
