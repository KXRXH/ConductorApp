import { useEffect, useState } from 'react';
import { IonToast } from '@ionic/react';
import { Network } from '@capacitor/network';

const ConnectionToast = () => {
    const [isConnected, setIsConnected] = useState(true);
    const [showToast, setShowToast] = useState(false);

    // Function to check network status
    const checkNetworkStatus = async () => {
        const status = await Network.getStatus();
        setIsConnected(status.connected);
    };

    useEffect(() => {
        // Check network status when the component mounts
        checkNetworkStatus();

        // Add an event listener to monitor network status changes
        const listener = Network.addListener('networkStatusChange', checkNetworkStatus);

        return () => {
            // Remove the event listener when the component unmounts
            listener.remove();
        };
    }, []);

    useEffect(() => {
        // Show a toast when the internet connection is lost
        if (!isConnected) {
            setShowToast(true);
        } else {
            setShowToast(false);
        }
    }, [isConnected]);

    return (
        <>
            <IonToast
                style={{ marginTop: '55px' }}
                isOpen={showToast}
                position='top'
                onDidDismiss={() => setShowToast(false)}
                message="Внимание! Потеряно соединение с интернетом!"
                color="danger"
            />
        </>
    );
};

export default ConnectionToast;
