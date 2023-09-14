import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { didUserGrantPermission, prepare, startScan } from '../utils/qrcode';
import DeAlert from '../components/DeAlert';

function CameraTab() {
  const [isOpen, setIsOpen] = useState(false);
  const [info, setInfo] = useState("");
  useEffect(() => {
    const main = async () => {
      prepare();
      const permision = await didUserGrantPermission();
      if (!permision) {
        return;
      }
      const result = await startScan();
      if (result) {
        setInfo(result);
        setIsOpen(true);
      }
      // TODO: FIX RECURSION CALL AND ADD STOP SCAN
      main()
    }
    main().catch(console.error);
  }, [])

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
