import { IonAlert, IonButton } from '@ionic/react';

function LoginAlert({ isOpen, setClose }: { isOpen: boolean, setClose: (v: boolean) => void }) {
    return (
        <>
            <IonAlert
                isOpen={isOpen}
                header="Ошибка"
                subHeader="Неверный логин или пароль"
                message="Пожалуйста, введите верные данные или обратитесь в поддержку"
                buttons={['OK']}
                onDidDismiss={() => setClose(false)}
            ></IonAlert>
        </>
    );
}
export default LoginAlert;