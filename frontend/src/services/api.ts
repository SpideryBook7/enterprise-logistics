const API_BASE_URL = 'http://localhost:8000/api/v1';

export interface ShipmentCreateInput {
  content: string;
  company_id: number;
  origin_warehouse_id: number;
  destination_warehouse_id: number;
}

export interface CompanyCreateInput {
  company_name: string;
}

export interface WarehouseCreateInput {
  warehouse_name: string;
  company_id: number;
}

export const companyService = {
  getAll: async () => {
    const res = await fetch(`${API_BASE_URL}/companies/`);
    return res.json();
  },
  create: async (data: CompanyCreateInput) => {
    const res = await fetch(`${API_BASE_URL}/companies/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  }
};

export const warehouseService = {
  getAll: async () => {
    const res = await fetch(`${API_BASE_URL}/warehouses/`);
    return res.json();
  },
  create: async (data: WarehouseCreateInput) => {
    const res = await fetch(`${API_BASE_URL}/warehouses/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  }
};

export const shipmentService = {
  getAll: async () => {
    const res = await fetch(`${API_BASE_URL}/shipments/`);
    return res.json();
  },
  create: async (data: ShipmentCreateInput) => {
    const res = await fetch(`${API_BASE_URL}/shipments/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  updateStatus: async (id: number, status: string) => {
    const res = await fetch(`${API_BASE_URL}/shipments/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    return res.json();
  }
};