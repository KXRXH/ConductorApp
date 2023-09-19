import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

export const didUserGrantPermission = async () => {
    const permissionStatus = await BarcodeScanner.checkPermission({ force: false });

    if (permissionStatus.granted) {
        return true;
    }

    if (permissionStatus.denied) {
        return false;
    }

    if (permissionStatus.asked) {
        // Only possible when force set to true
    }

    if (permissionStatus.neverAsked) {
        const confirmation = confirm('Нам требуется ваше подтверждение для использования камеры.');
        if (!confirmation) {
            return false;
        }
    }

    const permissionRequest = await BarcodeScanner.checkPermission({ force: true });

    if (permissionRequest.asked) {
        // Only possible when force set to true
    }

    if (permissionRequest.granted) {
        return true;
    }

    return false;
};

export const prepare = () => {
    BarcodeScanner.prepare();
};

export const stopScan = () => {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
};
