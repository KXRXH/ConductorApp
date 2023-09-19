import { IonAlert } from '@ionic/react';

function DeAlert({ isOpen, info, setClose }: { isOpen: boolean, info: string, setClose: (v: boolean) => void }) {
    return (
        <>
            <IonAlert
                isOpen={isOpen}
                header="Info"
                subHeader="info"
                message={info}
                buttons={['OK']}
                onDidDismiss={() => setClose(false)}
            ></IonAlert>
        </>
    );
}
export default DeAlert;