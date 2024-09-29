import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';
import Home from './pages/home';
import Favorites from './pages/favorites';
import Resources from './pages/resources';
import Settings from './pages/settings';
import ReportForm from './pages/report';
import React, { useState } from 'react';
import { homeOutline } from 'ionicons/icons';
import { heartOutline } from 'ionicons/icons';
import { bookmarkOutline } from 'ionicons/icons';
import { settingsOutline } from 'ionicons/icons';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Ionic Dark Mode */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {
  const [locations, setLocations] = useState<{ name: string; address: string }[]>([]);
  const [language, setLanguage] = useState<string>('en'); // Language state

  const addLocation = (name: string, address: string) => {
    setLocations([...locations, { name, address }]);
  };

  const changeLanguage = (newLanguage: string) => {
    setLanguage(newLanguage);
  };

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route exact path="/favorites">
              <Favorites locations={locations} addLocation={addLocation} language={language} />
            </Route>
            <Route exact path="/report_form">
              <ReportForm />
            </Route>
            <Route exact path="/resources">
              <Resources />
            </Route>
            <Route exact path="/settings">
              <Settings locations={locations} addLocation={addLocation} />
            </Route>
            <Redirect exact from="/" to="/home" />
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="home" href="/home">
            <IonIcon aria-hidden="true" icon={homeOutline} />
              <IonLabel>Home</IonLabel>
            </IonTabButton>
            <IonTabButton tab="favorites" href="/favorites">
              <IonIcon aria-hidden="true" icon={heartOutline} />
              <IonLabel>Favorites</IonLabel>
            </IonTabButton>
            <IonTabButton tab="resources" href="/resources">
              <IonIcon aria-hidden="true" icon={bookmarkOutline} />
              <IonLabel>Resources</IonLabel>
            </IonTabButton>
            <IonTabButton tab="settings" href="/settings">
              <IonIcon aria-hidden="true" icon={settingsOutline} />
              <IonLabel>Settings</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;