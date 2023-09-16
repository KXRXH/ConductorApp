import { IonHeader, IonPage, IonToolbar, IonTitle, IonContent, useIonRouter, IonIcon } from '@ionic/react';
import { useEffect } from 'react';
import { didUserGrantPermission, prepare, stopScan } from '../utils/QRcode';
import { BarcodeScanner, SupportedFormat } from '@capacitor-community/barcode-scanner';
import { arrowBack } from 'ionicons/icons';

function QrLoginPage() {
    const history = useIonRouter();
    useEffect(() => {
        const main = async () => {
            prepare();
            const permision = await didUserGrantPermission();
            if (!permision) {
                await BarcodeScanner.openAppSettings();
            }
            const result = await BarcodeScanner.startScan({ targetedFormats: [SupportedFormat.QR_CODE] });
            if (result.hasContent) {
                history.push(`/account/?qrCodeValue=${result.content}`);
            }
        }
        main().catch(console.error);
        return () => {
            stopScan();
        };
    }, [])
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonIcon style={{ marginLeft: '8px' }} slot="start" icon={arrowBack} size="large" onClick={() => {
                        history.goBack();
                    }} />
                    <IonTitle>Отсканируйте QR-код</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent style={{ display: 'none' }} fullscreen>
            </IonContent>
        </IonPage >
    )
}

export default QrLoginPage;