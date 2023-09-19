import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { didUserGrantPermission, stopScan } from '../utils/QRcode';
import DeAlert from '../components/DeAlert';
import { useHistory } from 'react-router-dom';
import { BarcodeScanner, SupportedFormat } from '@capacitor-community/barcode-scanner';
import Client from '../dto/client';
import CardHolderModal from '../components/CardHolderModal';

function CameraTab() {
  const [isOpen, setIsOpen] = useState(false);
  const [client, setClient] = useState<Client | null>(null);
  const history = useHistory();

  useEffect(() => {
    const main = async () => {
      BarcodeScanner.prepare();
      const permission = await didUserGrantPermission();
      if (!permission) {
        BarcodeScanner.openAppSettings();
      }
      await BarcodeScanner.startScanning({ targetedFormats: [SupportedFormat.QR_CODE] }, (result, err) => {
        if (err || !result.hasContent) {
          return;
        }

        const client: Client = {
          cardNumber: "1234 5678 9012 3456", // Replace with the actual card number
          firstName: "Иван", // Replace with the actual first name
          lastName: "Иванов", // Replace with the actual last name
          middleName: "Иванович", // Replace with the actual middle name
          birth: new Date("2004-12-15"), // Replace with the actual birth date
          benefits: [
            {
              id: 1,
              amount: 15,
              name: "Вечерний",
            },
            {
              id: 2,
              amount: 100,
              name: "Студенческий",
            },
            // Add more benefits as needed
          ],
        };
        setClient(client);
        setIsOpen(true);
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
        <CardHolderModal isOpen={isOpen} setOpen={setIsOpen} client={client} />
      </IonContent>
    </IonPage>
  );
};

export default CameraTab;
