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

function NfcTab() {
  const [isNfcAlertOpen, setIsNfcAlertOpen] = useState(false);
  const [nfcInfo, setNfcInfo] = useState('');

  useEffect(() => {
    NFC.enabled().then((_) => {
      NFC.addTagDiscoveredListener().subscribe((event: NdefEvent) => {
        const decodedTagId = NFC.bytesToHexString(event.tag.id);
        setNfcInfo(decodedTagId);
        setIsNfcAlertOpen(true);
      });
    });
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
            Приложите карту к обратной стороне телефона
          </IonText>
        </div>
        {// TODO: SHOW CARDHOLDER INFO 
        }
        <DeAlert isOpen={isNfcAlertOpen} info={nfcInfo} setClose={(isOpen) => setIsNfcAlertOpen(isOpen)} />
      </IonContent>
    </IonPage>
  );
}

export default NfcTab;
