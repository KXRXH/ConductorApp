import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { camera, radio, settings } from "ionicons/icons";
import { Redirect, Route } from "react-router-dom";
import ToolsTab from "./pages/ToolsTab";
import CameraTab from "./pages/CameraTab";
import NfcTab from "./pages/NfcTab";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";

/* Theme variables */
import { useEffect, useState } from "react";
import "./theme/variables.css";
import { Device } from "@capacitor/device";
import { useUUID } from "./utils/State";
import ConnectionToast from "./components/ConnectionErrorToast";

setupIonicReact();

function App() {
  const [hasValidKey, setHasValidKey] = useState(true);
  const { setUUID } = useUUID();
  useEffect(() => {
    const logDeviceInfo = async () => {
      const info = await Device.getId();
      setUUID(info.identifier);
    };
    logDeviceInfo();
  }, []);


  return (
    <IonApp>
      <ConnectionToast />
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/camera">
              <CameraTab />
            </Route>
            <Route exact path="/nfc">
              <NfcTab />
            </Route>
            <Route exact path="/account">
              <ToolsTab isLoggedIn={hasValidKey} />
            </Route>
            <Route exact path="/">
              <Redirect to="/account" />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="camera" href="/camera" disabled={!hasValidKey}>
              <IonIcon aria-hidden="true" icon={camera} />
              <IonLabel>Сканировать</IonLabel>
            </IonTabButton>
            <IonTabButton tab="nfc" href="/nfc" disabled={!hasValidKey}>
              <IonIcon aria-hidden="true" icon={radio} />
              <IonLabel>NFC</IonLabel>
            </IonTabButton>
            <IonTabButton tab="account" href="/account">
              <IonIcon aria-hidden="true" icon={settings} />
              <IonLabel>Инструменты</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp >
  );
}

export default App;
