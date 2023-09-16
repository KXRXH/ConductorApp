import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { didUserGrantPermission, stopScan } from '../utils/QRcode';
import DeAlert from '../components/DeAlert';
import { useHistory } from 'react-router-dom';
import { BarcodeScanner, SupportedFormat } from '@capacitor-community/barcode-scanner';

function CameraTab() {
  const [isOpen, setIsOpen] = useState(false);
  const [info, setInfo] = useState("");
  const history = useHistory();

  useEffect(() => {
    const main = async () => {
      BarcodeScanner.prepare();
      const permission = await didUserGrantPermission();
      if (!permission) {
        BarcodeScanner.openAppSettings();
      }
      await BarcodeScanner.startScanning({ targetedFormats: [SupportedFormat.QR_CODE] }, (result, err) => {
        if (err) {
          return;
        }
        if (result.hasContent) {
          setInfo(result.content);
          setIsOpen(true);
        }
      });
    };

    main().catch(console.error);
    // Listen for route changes
    const unlisten = history.listen((location) => {
      if (location.pathname !== '/camera') {
        stopScan();
      } else {
        main().catch(console.error);
      }
    });

    // Cleanup the listener when the component unmounts
    return () => {
      unlisten();
    };
  }, [history]);
  return (
    <IonPage>
      <IonHeader>
      <IonToolbar>
          <IonTitle>Камера</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent style={{ display: 'none' }} fullscreen>
        <DeAlert info={info} isOpen={isOpen} setClose={setIsOpen} />
      </IonContent>
    </IonPage>
  );
};

export default CameraTab;
