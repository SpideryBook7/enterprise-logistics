import { useState, useEffect, useCallback } from 'react';
import { companyService, shipmentService, warehouseService } from '../services/api';

export function useLogisticsData() {
  const [companies, setCompanies] = useState<any[]>([]);
  const [shipments, setShipments] = useState<any[]>([]);
  const [warehouses, setWarehouses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    try {
      const [companiesData, warehousesData, shipmentsData] = await Promise.all([
        companyService.getAll(),
        warehouseService.getAll(),
        shipmentService.getAll()
      ]);
      
      setCompanies(companiesData);
      setWarehouses(warehousesData);
      setShipments(shipmentsData);
    } catch (error) {
      console.error("Error loading initial data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return {
    companies,
    warehouses,
    shipments,
    setShipments,
    loading,
    refreshData: loadData
  };
}
