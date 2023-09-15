import {
    IonButton,
    IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    useIonRouter,
} from "@ionic/react";
import { qrCode } from "ionicons/icons";
import { useState } from "react";
import { isNumeric } from "../utils/main";
import LoginAlert from "./LoginAlert";
import "./LoginForm.css";

function LoginForm() {
    const router = useIonRouter();
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [alertOpen, setAlertOpen] = useState(false);

    const login = () => {
        if (!isNumeric(id) || password.length < 8) {
            setAlertOpen(true);
            return;
        }
    };

    return (
        <div className="form-container">
            <div className="form-header">
                <h1>Вход</h1>
            </div>
            <IonList>
                <IonItem>
                    <IonLabel position="floating">ИД сотрудника</IonLabel>
                    <IonInput
                        className="form-input"
                        type="text"
                        inputMode="numeric"
                        value={id}
                        onIonChange={(e) => setId(e.detail.value!)}
                        aria-label="ID"
                    ></IonInput>
                </IonItem>

                <IonItem>
                    <IonLabel position="floating">Пароль</IonLabel>
                    <IonInput
                        className="form-input"
                        type="password"
                        value={password}
                        onIonChange={(e) => setPassword(e.detail.value!)}
                        aria-label="Password"
                    ></IonInput>
                </IonItem>
            </IonList>

            <IonButton onClick={login} size="large" className="login-button">
                Войти
            </IonButton>

            <IonButton
                fill="outline"
                className="qr-button"
                onClick={() => {
                    router.push("/account/qr", "forward");
                }}
            >
                <IonIcon slot="start" icon={qrCode} />
                Вход через QR код
            </IonButton>

            <LoginAlert isOpen={alertOpen} setClose={setAlertOpen} />
        </div>
    );
}

export default LoginForm;
