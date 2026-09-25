import { useEffect, useState } from 'react';

export default function useHotelDetection(initialDetection) {
    const [detection, setDetection] = useState(initialDetection);

    useEffect(() => setDetection(initialDetection), [initialDetection]);
    return detection;
}