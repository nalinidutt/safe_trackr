import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton } from '@ionic/react';
import React, { useState } from 'react';
import './styling/resources.css';

const Resources: React.FC = () => {
  const [showMessage, setShowMessage] = useState(false); // State for controlling the confirmation box

  const handleSubmit = () => {
    setShowMessage(true); // Show the confirmation box on submit
  };

  const handleClose = () => {
    setShowMessage(false); // Hide the confirmation box when the X button is clicked
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Resources</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="iphone-wrapper">
          <div className="section">
            <h4> </h4>
            <h1 className="resources-title">Resources</h1>

            <p className="blue-background">Safety Tips and Guides</p>
            <ul>
              <li><a href="https://www.ncpc.org">National Crime Prevention Council</a>: Offers general safety tips, including personal and travel safety.</li>
              <li><a href="https://wwwnc.cdc.gov/travel/page/survival-guide">Travel Safety Tips</a>: Tips on safety abroad and domestically.</li>
              <li><a href="https://www.bestopicks.com/top-10-personal-safety-apps">Personal Safety App Recommendations</a>: List of mobile apps that provide personal safety features.</li>
            </ul>

            <p className="blue-background">Self-Defense and Personal Safety</p>
            <ul>
              <li><a href="https://health.usnews.com/health-news/health-wellness/articles/2013/10/16/how-to-practice-self-defense-through-awareness">Self-Defense Tips from U.S. News</a></li>
              <li><a href="https://www.samhsa.gov">Substance Abuse and Mental Health Services Administration</a></li>
            </ul>

            <p className="blue-background">Feedback</p>
              <IonLabel className="feedback-label" position="floating">How can we improve our platform?</IonLabel>
              <IonInput className="feedback-input" placeholder="Enter Feedback Here"></IonInput>

            <IonButton expand="block" className="submit-button" onClick={handleSubmit}>Submit</IonButton>

            {/* Confirmation Overlay and Box */}
            {showMessage && (
              <div className="confirmation-overlay">
                <div className="confirmation-box">
                  <p>Thank you for your feedback.</p>
                  <button className="close-button" onClick={handleClose}>X</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Resources;