const API_BASE_URL = 'http://localhost:8000/api/v1';

export const companyService = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/companies/`);
    if (!response.ok) throw new Error('Error al obtener empresas');
    return response.json();
  }
};

export const shipmentService = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/shipments/`);
    if (!response.ok) throw new Error('Error al obtener envíos');
    return response.json();
  }
};