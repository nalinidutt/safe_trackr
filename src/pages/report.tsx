import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonLabel, IonItem } from '@ionic/react';
import axios from 'axios';

const ReportForm: React.FC = () => {
  const [location, setLocation] = useState({ lat: '', long: '' });
  const [crimeType, setCrimeType] = useState('');
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
    e.preventDefault();

    const reportData = {
      location,
      crimeType,
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
            <IonLabel position="floating">Longitude</IonLabel>
            <IonInput
              value={location.long}
              onIonChange={(e) => setLocation({ ...location, long: e.detail.value! })}
              required
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Crime Type</IonLabel>
            <IonInput
              value={crimeType}
              onIonChange={(e) => setCrimeType(e.detail.value!)}
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
