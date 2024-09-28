import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton } from '@ionic/react';
import React from 'react';

const Resources: React.FC = () => {
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
          /* Wrapper to simulate the iPhone 13 screen on a laptop */
          .iphone-wrapper {
            width: 390px; /* iPhone 13 width */
            height: 844px; /* iPhone 13 height */
            border: 1px solid #ccc; /* Optional border for visibility */
            box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
            border-radius: 30px; /* Rounded corners like an iPhone */
            margin: 50px auto; /* Center it horizontally and add spacing at the top */
            overflow: hidden;
          }

          .section {
            padding: 16px;
            font-size: 16px;
          }

          .section-title {
            font-size: 24px;
            margin-bottom: 12px;
            text-align: center;
            color: #333;
          }

          /* Add blue background to section headers */
          .blue-background {
            background-color: #3F7C85; /* Blue background */
            color: white; /* White text on top of blue */
            padding: 10px 15px; /* Padding inside the blue background */
            border-radius: 5px; /* Optional: rounding corners */
            text-align: center; /* Center the text */
            margin-bottom: 12px; /* Space between the header and the content */
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

          /* Resources title styling */
          .resources-title {
            margin-top: 40px; /* Move down the title */
            font-size: 24px;
            text-align: center;
          }

          /* Feedback Section */
          .ion-item {
            margin: 20px 0;
          }

          /* Make the input field larger */
          ion-input {
            height: 100px; /* Increase the height of the input field */
            font-size: 16px; /* Adjust the font size */
            padding: 12px; /* Add padding to the input field */
          }

          /* Move the submit button further down */
          .submit-button {
            margin-top: 20px; /* Increase margin from the input */
            width: 100%;
          }

          /* iPhone 13 size adjustments */
          @media (max-width: 390px) {
            .section {
              padding: 12px;
              font-size: 14px;
            }

            .section-title {
              font-size: 22px;
            }

            ul {
              font-size: 13px;
            }

            .submit-button {
              padding: 12px;
              font-size: 16px;
            }
          }
        `}</style>

        <div className="iphone-wrapper">
          <div className="section">
            <h4> </h4>
            <h4> </h4>
            <h4> </h4>
            <h4> </h4>
            <h4> </h4>
            <h1 className="resources-title">Resources</h1>

            <h2 className="resources-title"> </h2>
            <p className="blue-background">Safety Tips and Guides</p>
            <ul>
              <li><a href="https://www.ncpc.org">National Crime Prevention Council</a>: Offers general safety tips, including personal and travel safety.</li>
              <li><a href="https://www.travelsafetytips.com">Travel Safety Tips</a>: Tips on safety abroad and domestically.</li>
              <li><a href="https://www.personalsafetyapps.com">Personal Safety App Recommendations</a>: List of mobile apps that provide personal safety features.</li>
            </ul>

            <h2 className="resources-title"> </h2>
            <p className="blue-background">Self-Defense and Personal Safety</p>
            <ul>
              <li><a href="https://www.nsdi.com">Self-Defense Tips from the National Self Defense Institute</a></li>
              <li><a href="https://www.samhsa.gov">Substance Abuse and Mental Health Services Administration</a></li>
            </ul>
          </div>

            <h2 className="section-title">Feedback</h2>
            <IonItem>
              <IonLabel position="floating">How can we improve our platform?</IonLabel>
              <IonInput placeholder="Enter Feedback Here"></IonInput>
            </IonItem>
            <IonButton expand="block" className="submit-button">Submit</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Resources;
