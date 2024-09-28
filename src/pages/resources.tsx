import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton } from '@ionic/react';
import React, { useState } from 'react';

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
        {/* Inline CSS */}
        <style>{`
          .iphone-wrapper {
            width: 390px;
            height: 844px;
            border: 1px solid #ccc;
            box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
            border-radius: 30px;
            margin: 50px auto;
            overflow: hidden;
          }

          .section {
            padding: 16px;
            font-size: 16px;
          }

          .blue-background {
            background-color: #3F7C85;
            color: white;
            padding: 10px 15px;
            border-radius: 5px;
            text-align: center;
            margin-bottom: 12px;
            font-size: 20px;
          }

          ul {
            padding-left: 20px;
            font-size: 18px;
            line-height: 1.5;
          }

          li {
            margin-bottom: 10px;
          }

          a {
            color: #0066cc;
            text-decoration: none;
          }

          a:hover {
            text-decoration: underline;
          }

          .resources-title {
            margin-top: 30px;
            font-size: 24px;
            text-align: center;
          }

          .feedback-title {
            margin-top: 40px;
            font-size: 24px;
            text-align: center;
          }

          ion-input {
            height: 50px;
            font-size: 16px;
            padding: 12px;
          }

          .submit-button {
            background-color: #3F7C85; /* Set background color to #3F7C85 */
            margin-top: 10px;         /* Add top margin */
            width: 30%;              /* Make the button take the full width */
            color: white;             /* Set text color to white for contrast */
            font-size: 16px;          /* Increase font size */
            cursor: pointer;          /* Change cursor to pointer on hover */
          }

          .submit-button:hover {
            background-color: #35696F; /* Darken color on hover */
          }

          /* Confirmation overlay styles */
          .confirmation-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
            display: flex;
            justify-content: center; /* Center horizontally */
            align-items: center;     /* Center vertically */
            z-index: 1000;          /* Make sure it's on top of other elements */
          }

          /* Confirmation box styles */
          .confirmation-box {
            padding: 20px;
            background-color: #f1f1f1;
            border: 1px solid #ccc;
            border-radius: 5px;
            text-align: center;
            position: relative; /* Relative for positioning the close button */
            width: 80%;        /* Box width */
            max-width: 400px;  /* Max width for larger screens */
          }

          /* Close button (X) styles */
          .close-button {
            position: absolute;
            top: 10px;
            right: 10px;
            background-color: transparent;
            border: none;
            font-size: 16px;
            cursor: pointer;
            color: #555;
          }

          .feedback-label {
            font-size: 18px; /* Increase font size for the label */
          }

          .feedback-input {
            font-size: 18px; /* Increase font size for the input */
            padding: 12px; /* Optional: Adjust padding if needed */
          }

          .close-button:hover {
            color: black;
          }

          /* Responsive adjustments */
          @media (max-width: 390px) {
            .section {
              padding: 12px;
              font-size: 14px;
            }

            .resources-title {
              font-size: 22px;
            }

            ul {
              font-size: 13px;
            }
          }
        `}</style>

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