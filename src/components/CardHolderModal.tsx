import { IonButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonList, IonModal, IonTitle, IonToolbar } from "@ionic/react";
import Client from "../dto/client";
import { useEffect } from "react";

function CardHolderModal({ isOpen, setOpen, client }: { isOpen: boolean, setOpen: (v: boolean) => void, client: Client | null }) {

    useEffect(() => {
        return () => {
            setOpen(false);
        }
    }, [])
    const calculateAge = (birthdate: Date | undefined) => {
        if (!birthdate) {
            return 0;
        }
        const today = new Date();
        let age = today.getFullYear() - birthdate.getFullYear();
        let month = today.getMonth() - birthdate.getMonth();
        if (month < 0 || (month === 0 && today.getDate() < birthdate.getDate())) {
            age--;
        }
        return age;
    }
    return (
        <>
            <IonModal isOpen={isOpen}>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Данные карты</IonTitle>
                        <IonButtons slot="end">
                            <IonButton onClick={() => setOpen(false)}>Закрыть</IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">
                    <IonList>
                        <IonLabel style={{ textAlign: 'center' }} position="stacked"><h1 style={{ fontWeight: 'bold' }}>ФИО</h1></IonLabel>
                        <IonItem className="ion-padding-bottom" >
                            <IonLabel>{`${client?.lastName} ${client?.firstName} ${client?.middleName}`}</IonLabel>
                        </IonItem>

                        <IonLabel style={{ textAlign: 'center' }} position="stacked"><h1 style={{ fontWeight: 'bold' }}>Номер карты</h1></IonLabel>
                        <IonItem className="ion-padding-bottom">
                            <IonLabel>{client?.cardNumber}</IonLabel>
                        </IonItem>
                        <IonLabel style={{ textAlign: 'center' }} position="stacked"><h1 style={{ fontWeight: 'bold' }}>Дата рождения</h1></IonLabel>
                        <IonItem className="ion-padding-bottom">
                            <IonLabel>{client?.birth.toLocaleDateString()} (Возраст: {calculateAge(client?.birth)})</IonLabel>
                        </IonItem>
                        <IonLabel style={{ textAlign: 'center' }} position="stacked"><h1 style={{ fontWeight: 'bold' }}>Льготы</h1></IonLabel>
                        <IonItem key={0} style={{ fontWeight: 'bold' }}>
                            <IonLabel>Название</IonLabel>
                            <IonLabel slot="end">Размер, %</IonLabel>
                        </IonItem>
                        {client?.benefits.map((benefit) => (
                            <IonItem key={benefit.id}>
                                <IonLabel>{benefit.name}</IonLabel>
                                <IonLabel slot="end">{benefit.amount}</IonLabel>
                            </IonItem>
                        ))}
                    </IonList>
                </IonContent>
            </IonModal>
        </>
    );
}
export default CardHolderModal;