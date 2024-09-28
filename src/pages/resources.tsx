import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonLabel, IonInput, IonButton } from '@ionic/react';
import React, { useState } from 'react';
import './styling/resources.css'; // Make sure this path is correct

const Resources: React.FC = () => {
  const [showMessage, setShowMessage] = useState(false); // State for controlling the confirmation box
  const [feedback, setFeedback] = useState(''); // State for the feedback input

  const handleSubmit = () => {
    setShowMessage(true); // Show the confirmation box on submit
    setFeedback(''); // Clear the feedback input
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
        <div className="iphone-wrapper"> {/* Apply the iphone-wrapper class */}
          <div className="section"> {/* Apply the section class */}
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
            <IonInput 
              className="custom-input feedback-input" // Apply custom-input class for styling
              placeholder="Enter Feedback Here"
              value={feedback} // Bind the input value to the feedback state
              onIonChange={(e) => setFeedback(e.detail.value!)} // Update state on input change
            />

            <IonButton expand="block" className="add-button submit-button" onClick={handleSubmit}>Submit</IonButton> {/* Apply add-button class */}

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