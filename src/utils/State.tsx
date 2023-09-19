import { createContext, useContext, useState, ReactNode } from 'react';

interface UUIDContextType {
    uuid: string;
    setUUID: (uuid: string) => void;
}

const initialUUID = '';

const UUIDContext = createContext<UUIDContextType | undefined>(undefined);

interface UUIDProviderProps {
    children: ReactNode;
}

export const UUIDProvider: React.FC<UUIDProviderProps> = ({ children }) => {
    const [uuid, setUUID] = useState<string>(initialUUID);

    return (
        <UUIDContext.Provider value={{ uuid, setUUID }}>
            {children}
        </UUIDContext.Provider>
    );
};

export const useUUID = () => {
    const context = useContext(UUIDContext);
    if (context === undefined) {
        throw new Error('useUUID must be used within a UUIDProvider');
    }
    return context;
};
