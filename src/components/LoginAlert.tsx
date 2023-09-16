import { IonAlert } from '@ionic/react';

function LoginAlert({ isOpen, setClose }: { isOpen: boolean, setClose: (v: boolean) => void }) {
    return (
        <>
            <IonAlert
                isOpen={isOpen}
                header="Ошибка"
                subHeader="Данная карта не найдена в реестре"
                message="Пожалуйста, попробуйте ещё раз или обратитесь в поддержку"
                buttons={['OK']}
                onDidDismiss={() => setClose(false)}
            ></IonAlert>
        </>
    );
}
export default LoginAlert;