import { NFC, NdefEvent } from '@ionic-native/nfc';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useEffect, useState } from 'react';
import './NfcTab.css';
import CardHolderModal from '../components/CardHolderModal';
import Client from '../dto/client';

function NfcTab() {
  const [isOpenModal, setModalOpen] = useState(false);
  const [client, setClient] = useState<Client | null>(null);

  useEffect(() => {
    NFC.enabled().then((_) => {
      NFC.addTagDiscoveredListener().subscribe((event: NdefEvent) => {
        if (event.tag.id === null) {
          return;
        }
        const client2: Client = {
          cardNumber: "9876 5432 1098 7654", // Замените на реальный номер карты
          firstName: "Мария", // Замените на реальное имя
          lastName: "Смирнова", // Замените на реальную фамилию
          middleName: "Александровна", // Замените на реальное отчество
          birth: new Date("1985-03-20"), // Замените на реальную дату рождения
          benefits: [
            {
              id: 3,
              amount: 75,
              name: "Скидка 3",
            },
            {
              id: 4,
              amount: 40,
              name: "Скидка 4",
            },
            // Добавьте другие преимущества по необходимости
          ],
        };
        setClient(client2);
        setModalOpen(true);
      });
    });
    return () => {
    }
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Бесконтактное чтение карты</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className='content-container'>
          <IonText className='tip-text'>
            Приложите карту к обратной стороне устройства
          </IonText>
        </div>
        <CardHolderModal isOpen={isOpenModal} setOpen={setModalOpen} client={client} />
      </IonContent>
    </IonPage>
  );
}

export default NfcTab;
