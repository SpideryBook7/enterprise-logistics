import { useEffect } from 'react';

export function useShipmentWebSocket(setShipments: React.Dispatch<React.SetStateAction<any[]>>) {
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8000/ws/shipments');

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      setShipments((prev) => {
        // If it's an update, replace the existing shipment
        if (data.event_type === 'update') {
          return prev.map(shipment => 
            shipment.shipment_id === data.shipment_id ? { ...shipment, status: data.status } : shipment
          );
        }
        // If it's a creation, add to the top
        return [data, ...prev];
      });
    };

    socket.onerror = (error) => console.error("WebSocket Error:", error);

    return () => socket.close();
  }, [setShipments]);
}
