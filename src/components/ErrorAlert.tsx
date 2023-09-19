import { IonAlert } from "@ionic/react";

function ErrorAlert({ isOpen, info: message, setOpen: setOpen }: { isOpen: boolean, info: string, setOpen: (v: boolean) => void }) {
    return (
        <>
            <IonAlert
            typeof=""
                isOpen={isOpen}
                header="Ошибка"
                message={message}
                buttons={['OK']}
                onDidDismiss={() => setOpen(false)}
            ></IonAlert>
        </>
    );
}
export default ErrorAlert;