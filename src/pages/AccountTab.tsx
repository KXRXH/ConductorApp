import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import LoginForm from '../components/LoginForm';

function AccountTab({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Аккаунт</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Аккаунт</IonTitle>
          </IonToolbar>
        </IonHeader>
        {isLoggedIn ? (
          <IonButton>Cool</IonButton>
        ) : (<LoginForm />)}
      </IonContent>
    </IonPage>
  );
};

export default AccountTab;
