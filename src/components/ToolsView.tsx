import {
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonPage,
  IonText,
  IonTitle,
  IonToast,
  IonToolbar,
} from '@ionic/react';
import { syncOutline } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { storageGet, storageSet } from '../storage/Storage';
import './ToolsView.css';

function ToolsView() {
  const [lastSyncTime, setLastSyncTime] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [isShift, setIsShift] = useState<boolean>(false);
  const [route, setRoute] = useState<string>('');
  const [transport, setTransport] = useState<string>('');
  const [shiftStarted, setShiftStarted] = useState<string>('');
  const [showToast, setShowToast] = useState<boolean>(false);



  const loadLastSyncTime = async () => {
    const storedTime = await storageGet('lastSyncTime');
    setLastSyncTime(storedTime || '...');
  };

  const syncDatabase = async () => {
    if (isSyncing) return; // Prevent multiple clicks while syncing
    setIsSyncing(true);

    // Start the spinning animation
    const icon = document.getElementById('sync-icon');
    if (icon) {
      icon.classList.add('spin');
    }

    // Set the last sync time to the current time
    const currentTime = new Date().toLocaleString('en-US', { hour12: false });
    await storageSet('lastSyncTime', currentTime);

    // Update the state with the new sync time
    setLastSyncTime(currentTime);

    // Stop the spinning animation after a delay (1 second in this case)
    setTimeout(() => {
      setIsSyncing(false);
      if (icon) {
        icon.classList.remove('spin');
      }
    }, 1000);
  };

  useEffect(() => {
    loadLastSyncTime();
  }, []);


  const endShift = () => {
    setIsShift(false);
    setRoute('');
    setTransport('');
  }

  const startShift = () => {
    if (route && transport) {
      setShiftStarted(new Date().toLocaleString('en-US', { hour12: false }));
      setIsShift(true);
      setShowToast(false);
    } else {
      setShowToast(true);
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Инструменты</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonToast
          style={{ marginTop: '55px' }}
          isOpen={showToast}
          position='top'
          color="warning"
          message="Необходимо заполнить все поля!"
          duration={2000}
          onDidDismiss={() => setShowToast(false)}
        />
        <IonCard className='rounded'>
          <IonCardContent>
            <div className='centered'>
              <IonText color={'dark'}><h1>Профиль</h1></IonText>
            </div>
            <div>
              <IonText color='primary' className="on-margin-bottom">Имя: </IonText>Иван
            </div>
            <div>
              <IonText color='primary' className="on-margin-bottom">Фамилия: </IonText>Иванович
            </div>
            <div>
              <IonText color='primary' className="on-margin-bottom">Персональный номер: </IonText>1882692
            </div>
          </IonCardContent>
        </IonCard>
        <IonCard className='rounded'>
          <IonCardContent>
            <div className='centered'>
              <IonText color={'dark'}><h1>Управление сменой</h1></IonText>
            </div>
            <div>
              {isShift ? (
                <div>
                  <div>
                    <IonText color='primary' className="on-margin-bottom">Номер маршрута: </IonText>
                    {route ? route : '...'}
                  </div>
                  <div>
                    <IonText color='primary' className="on-margin-bottom">Транспорт: </IonText>
                    {transport ? transport : '...'}
                  </div>
                  <div>
                    <IonText color='primary' className="on-margin-bottom">Время начала смены: </IonText>
                    {shiftStarted ? shiftStarted : '...'}
                  </div>
                </div>
              ) : (
                <div>
                  <div>
                    <IonInput required={true} placeholder='Номер маршрута' onIonInput={e => setRoute(e.detail.value!)} />
                  </div>
                  <div>
                    <IonInput required={true} placeholder='Транспорт' onIonInput={e => setTransport(e.detail.value!)} />
                  </div>
                </div>
              )}
              <div className="shift-buttons">
                {isShift ?
                  (<IonButton shape="round" expand="full" onClick={endShift}>Закончить смену</IonButton>)
                  :
                  (<IonButton shape="round" expand="full" onClick={startShift}>Начать смену</IonButton>)
                }
              </div>
            </div>
          </IonCardContent>
        </IonCard>


        <div >
          <IonCard className='rounded'>
            <IonCardContent>
              <div>
                <div className='centered'>
                  <IonText color={'dark'}><h1>Синхронизация данных</h1></IonText>
                </div>
                <IonButton
                  expand="full"
                  shape="round"
                  onClick={syncDatabase}
                >
                  <IonIcon id="sync-icon" icon={syncOutline} slot="start" />
                  Синхронизировать
                </IonButton>
              </div>
              <IonText className="ion-margin-top">
                Последняя синхронизация: {lastSyncTime}
              </IonText>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default ToolsView;
