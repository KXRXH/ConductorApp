import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'sever.conductor.app',
  appName: 'ЕКЖ Кондуктор',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
