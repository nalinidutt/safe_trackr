import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './home.css'; // Assuming you have a separate CSS file for styles
import React, { useState } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

/*
import dotenv from 'dotenv';
const apiKey = process.env.REACT_APP_API_KEY;
console.log(apiKey);
*/

const mapContainerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 40.748817,  // Latitude
  lng: -73.985428  // Longitude
};

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div id='iphone13-14' className='iphone13-14'></div>
        <div id='rectangle6' className='rectangle6'></div>
        <div id='number33' className='number'>93</div>
        <div id='number43' className='number'>14</div>
        <div id='number62' className='number'>56</div>
        <img id='rectangle8' className='rectangle8' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAVEAAAAgCAYAAACrf0uSAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAQWSURBVHgB7d1faFNnGMfxJ6mNw6RwvLFhWDlLq6gXbW4c0gnGi7KAMBrdxTaUCsIQdtOBsMspA3c3KjIQBtIqzolT69WaRFgK1hQUTCpsu0jiuUy9cIGksLaj2fuc1v6x/467q/l+ID3JaU4ufzznfc/7Pj7xKBaLWdLc3GveHhWfLyr1um2OlgDAVlevV0yeOeaVk7m5UZmdHc5kMhUvl/o2+4IJT1u2b+9vCQb72iMR66Pubol2dko4HJZQMCgAsNXVpqakUCy6r3w+L4+yWZOOvkGZnr5owtTZ6Np1Q9StPAOBb01Q9p88cUI+TSQITQANoTw5KSPptCRTKSm/fDmQSSa/Xu+7a4aoW30GAr+fTCTsM6dPE54AGpKG6eCNG5JMpx2ZmTm2VlXa9OaJWE9PVLZt++2rc+fcAA0EAgIAjSgUCskRM4QZammxnjx71mtHIqNOqVRe/p0VIepWoCZAvzl/3v7k+HEBAIgc3L9f54GssWw2bre1PXAcZ3HSaTFEF8ZAs1qBEqAAsFJHe/tSRdrWNmSC9B89vxii9r5933/c0xP/8uxZAQCsphWpmcm3/iwU3nOKxaSe8+sfvY0Pt7b26xgoAGB9Z06dktCOHf3u8KcshKi5jb9gqlAxQSoAgPXpZJM+9qnPz+tn38JY6N+3rl8nRAHAg1qtJl/09VWqr1594NelnLoKiQAFAG+0GtUVnJqffvH5YrqMEwDgnRaf4vcf9Uu93qVT9wAA76JdXbpxSVQnlmxCFADeTnjXLj3YejtvsTYeAN6Ojosall8AAP+bjolWdC89AIB3+piTUdFK1NHtngAA3hVKJT04Oiaaz+XzAgDwTnfB13YiejufGXv8WAAA3uUnJkT7Mfm1IVOxVGJcFAA80iHQR1p8mvz0a0e7arU69Ou9ewIA2FwynXYb2Wl+zj/i1NQ0cHd4WKhGAWBjbhO7VEpD9KJ+djdldgqFyvu7d++cnZk5/OGhQwIAWNuPV69K7vnzy5lk8hf9vLSz/Z49438UCp+FgkHr4IEDAgBY6e79+/LznTuOTE9/vqo9iJ6w9+598OTp095wa6vFenoAWKLjoD9cueKY2/hjmYcPFzt+ruj2qbf12hJ0bHw8TkUKAPO0AnUDdG4ukUml/lr+v1V957Wn8uuKdLJcdivShYX2ANBQdLL9p2vXZPDmzfkK9I0AVU1rXagVqVMsXv5XZOdYNnt4qlbTnsuEKYCGoOF56/Zt+e7SJXcSScdAl9/CL+fb7Mdi8bhtStgL5m3fke5u6erslI5IRDo6OoQt9AC8CzQ0y+Wy5CYmRFdwFl+8qFRrtSFTfQ5kRkacja7dNERfcxvaNTf3ajsR3Q3fHG1z2hIA2PoqJtccc8yZ16iuRNIH6b1c+B8DDYM9ddFISQAAAABJRU5ErkJggg==' />
        <div id='rectangle7' className='rectangle7'></div>
        <div id='people' className='people'>People</div>
        <div id='kripakannan' className='kripakannan'>Kripa Kannan</div>
        <div id='homepark' className='homepark'>Home Park</div>
        <div id='scheller' className='scheller'>Scheller</div>
        <div id='techsquare' className='techsquare'>Tech Square</div>
        <div id='time1' className='time'>9:15pm</div>
        <div id='time2' className='time'>8:47pm</div>
        <div id='time3' className='time'>9:00pm</div>
        <div id='settings' className='settings'>Settings</div>
        <div id='nalinidutt' className='nalinidutt'>Nalini Dutt</div>
        <div id='diyakaimal' className='diyakaimal'>Diya Kaimal</div>
        <div id='line4' className='line4'></div>
        <div id='line5' className='line5'></div>
        <div id='ellipse1' className='ellipse1'></div>
        <div id='ellipse15' className='ellipse15'></div>
        <div id='ellipse4' className='ellipse4'></div>
        <div id='ellipse2' className='ellipse2'></div>
        <div id='ellipse3' className='ellipse3'></div>
        <div id='favorites' className='favorites'>Favorites</div>
        <div id='ellipse7' className='ellipse7'></div>
        <div id='resources' className='resources'>Resources</div>
        <div id='ellipse13' className='ellipse13'></div>
        <div id='home2' className='home2'>Home</div>
        <div id='ellipse10' className='ellipse10'></div>
        <input id='searchhere' className='searchhere' type='text' placeholder='Search here...' />
        <div id='ellipse14' className='ellipse14'></div>
        <div id='line6' className='line6'></div>
        <img id='settings2' className='settings2' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAG+SURBVHgB5VXLbYNAEB2QZfkW3IF98eeUuII4FcSpwOnApALjChJXEKcEV+CkAjsny3CADsKZA+SNBGhZBozEKcqTVuxnZt7szOxA9NdhNBFyXfeYJMmdtn0aj8eza7omNQCMD4TtATVAicD3fet8Pg/UNT6WoGulZ6JehlKILpeLz94ZhrHDdwvvbXyXJIBlcL7HmGO+xDiNRqOHSgLE+hnC79QC0H+ZTC' />
        <div id='line3' className='line3'></div>
        <div id='line2' className='line2'></div>
        <div id='line1' className='line1'></div>
        <div id='profile' className='profile'>Profile</div>
        <div id='markfield' className='markfield'>Mark Field</div>
        <div id='markfield2' className='markfield2'>Mark Field</div>
        {
        <div>
          <LoadScript googleMapsApiKey="AIzaSyCM36RA6FKHrmxRn9gvafknRc7738HwXNo">
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              zoom={10}
              center={center}
            >
            </GoogleMap>
          </LoadScript>
        </div>
        }
      </IonContent>
    </IonPage>
  );
};

export default Home;
