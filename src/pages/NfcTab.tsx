import { NFC, NdefEvent } from '@ionic-native/nfc';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useEffect, useState } from 'react';
import DeAlert from '../components/DeAlert';
import './NfcTab.css';
import ErrorAlert from '../components/ErrorAlert';

function NfcTab() {
  const [isErrorAlertOpen, setErrorAlertOpenn] = useState(false);
  const [nfcInfo, setNfcInfo] = useState('');

  useEffect(() => {
    NFC.enabled().then((_) => {
      NFC.addTagDiscoveredListener().subscribe((event: NdefEvent) => {
        if (event.tag.id === null) {
          return;
        }
        setNfcInfo(NFC.bytesToHexString(event.tag.id));
        setErrorAlertOpenn(true);
      });
    });
    return () => {
    }
  }, []);

  return (
    <IonPage>
      <IonHeader>
      <IonToolbar>
          <IonTitle>Бесконтактное чтение карты</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className='content-container'>
          <IonText className='tip-text'>
            Приложите карту к обратной стороне устройства
          </IonText>
        </div>
        {// TODO: SHOW CARDHOLDER INFO 
        }
        <ErrorAlert isOpen={isErrorAlertOpen} info={nfcInfo} setOpen={setErrorAlertOpenn} />
      </IonContent>
    </IonPage>
  );
}

export default NfcTab;
