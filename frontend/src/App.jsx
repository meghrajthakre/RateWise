import { useEffect, useState } from 'react';
import SidePanel from './pages/SidePanel';

export default function App() {
    const [detection, setDetection] = useState(null);

    useEffect(() => {
        if (!globalThis.chrome?.runtime) return undefined;
        chrome.runtime.sendMessage({ type: 'GET_DETECTION' }, (response) => {
            if (!chrome.runtime.lastError) setDetection(response?.payload || null);
        });
        const listener = (message) => {
            if (message.type === 'HOTEL_DETECTED') setDetection(message.payload);
        };
        chrome.runtime.onMessage.addListener(listener);
        return () => chrome.runtime.onMessage.removeListener(listener);
    }, []);

    return <SidePanel detection={detection} />;
}