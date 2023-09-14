import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

function NfcTab() {
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Бесконтактное чтение карты</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">NFC</IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonContent>
    </IonPage>
  );
};

export default NfcTab;
