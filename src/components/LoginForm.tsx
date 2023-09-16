import {
    IonContent,
    IonHeader,
    IonPage,
    IonText,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import "./LoginForm.css";

function LoginForm() {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Авторизация</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <div className='content-container'>
                    <IonText className='tip-text'>
                        Приложите карту сотрудника к обратной стороне устройства
                    </IonText>
                </div>
            </IonContent>
        </IonPage>
    );
}

export default LoginForm;
