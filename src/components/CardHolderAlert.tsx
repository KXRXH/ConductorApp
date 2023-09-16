import { IonAlert } from "@ionic/react";

function CardHolderAlert({ isOpen, info: message, setOpen: setOpen }: { isOpen: boolean, info: string, setOpen: (v: boolean) => void }) {
    return (
        <>
            <IonAlert
                isOpen={isOpen}
                header="Ошибка"
                message={"worning"}
                buttons={['OK']}
                onDidDismiss={() => setOpen(false)}
            ></IonAlert>
        </>
    );
}
export default CardHolderAlert;