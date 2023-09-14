import { IonHeader, IonPage, IonToolbar, IonTitle, IonContent, useIonRouter } from '@ionic/react';
import { useEffect } from 'react';
import { didUserGrantPermission, prepare, startScan, stopScan } from '../utils/qrcode';
import { Redirect } from 'react-router';

function QrLoginPage() {
    const router = useIonRouter();
    useEffect(() => {
        const main = async () => {
            prepare();
            const permision = await didUserGrantPermission();
            if (!permision) {
                return;
            }
            const result = await startScan();
            if (result) {
                console.log(result);
                stopScan();
                router.goBack();
            }
        }
        main().catch(console.error);
    }, [])
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Отсканируйте QR-код</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent style={{ display: 'none' }} fullscreen>
            </IonContent>
        </IonPage >
    )
}

export default QrLoginPage;