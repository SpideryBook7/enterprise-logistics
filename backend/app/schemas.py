from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ShipmentBase(BaseModel):
    company_id: int
    origin_warehouse_id: int
    destination_warehouse_id: int
    vehicle_id: Optional[int] = None

class ShipmentCreate(ShipmentBase):
    pass # Datos necesarios para crear

class ShipmentRead(ShipmentBase):
    shipment_id: int
    status: str
    order_date: datetime

    class Config:
        from_attributes = True