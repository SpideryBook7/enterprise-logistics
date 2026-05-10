export interface Shipment {
  shipment_id?: number;
  content: string;
  status: 'pending' | 'in_transit' | 'delivered';
  company_id: number;
  origin_warehouse_id: number;
  destination_warehouse_id: number;
  created_at?: string;
}

export interface Warehouse {
  warehouse_id: number;
  warehouse_name: string;
  company_id: number;
}