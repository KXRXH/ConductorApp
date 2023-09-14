import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import { BarcodeScanner, SupportedFormat } from '@capacitor-community/barcode-scanner';
import DeAlert from './DeAlert';
import "./QrCode.css"

const QRCodeScanner: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [info, setInfo] = useState("");

    const scanQRCode = async () => {
        BarcodeScanner.prepare();
        const status = await BarcodeScanner.checkPermission({ force: true });
        if (!status.granted) {
            return;
        }
        BarcodeScanner.hideBackground();
        const result = await BarcodeScanner.startScan({ targetedFormats: [SupportedFormat.QR_CODE] });
        if (result.hasContent) {
            setInfo(result.content);
            setIsOpen(true);
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>QR Code Scanner</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className='hidebg'>
                <IonButton onClick={async () => scanQRCode()}>Scan QR Code</IonButton>
            </IonContent>
            <DeAlert info={info} open={isOpen} />
        </IonPage>
    );
};

export default QRCodeScanner;
