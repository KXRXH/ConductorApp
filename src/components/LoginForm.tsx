import {
    IonButton,
    IonContent,
    IonHeader,
    IonIcon,
    IonPage,
    IonTitle,
    IonToolbar,
    useIonRouter,
} from "@ionic/react";
import { qrCode } from "ionicons/icons";
import { useEffect, useState } from "react";
import LoginAlert from "./LoginAlert";
import "./LoginForm.css";
import { useLocation } from "react-router";

function LoginForm() {
    const location = useLocation();
    const history = useIonRouter();
    const [alertOpen, setAlertOpen] = useState(false);
    useEffect(() => {
        const qrCodeValue = new URLSearchParams(location.search).get("qrCodeValue");
        if (qrCodeValue) {
            // TODO: Call api to validate current key and send valid data.
            confirm(qrCodeValue);
        }
    }, [location.search]);
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Авторизация</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <div className="form-container">
                    <IonButton
                        size="large"
                        fill="outline"
                        className="qr-button"
                        onClick={() => {
                            history.push("/account/qr");
                        }}
                    >
                        <IonIcon slot="start" icon={qrCode} />
                        Сканировать QR-код
                    </IonButton>
                    <LoginAlert isOpen={alertOpen} setClose={setAlertOpen} />
                </div>
            </IonContent>
        </IonPage>
    );
}

export default LoginForm;
