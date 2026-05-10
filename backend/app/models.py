from typing import Optional, List
from sqlmodel import SQLModel, Field, Relationship

# --- MODELO DE EMPRESA ---
class Company(SQLModel, table=True):
    company_id: Optional[int] = Field(default=None, primary_key=True)
    company_name: str
    
    # Relación: Una empresa tiene muchos envíos
    shipments: List["Shipment"] = Relationship(back_populates="company")

# --- MODELO DE ALMACÉN ---
class Warehouse(SQLModel, table=True):
    warehouse_id: Optional[int] = Field(default=None, primary_key=True)
    warehouse_name: str
    company_id: int = Field(foreign_key="company.company_id")

# --- MODELO DE ENVÍO ---
class ShipmentBase(SQLModel):
    content: str
    # AQUÍ ESTABA EL ERROR: Faltaba definir que este campo es una llave foránea
    company_id: int = Field(foreign_key="company.company_id") 
    origin_warehouse_id: int = Field(foreign_key="warehouse.warehouse_id")
    destination_warehouse_id: int = Field(foreign_key="warehouse.warehouse_id")

class Shipment(ShipmentBase, table=True):
    shipment_id: Optional[int] = Field(default=None, primary_key=True)
    status: str = Field(default="pending")
    
    # Relación: El envío pertenece a una empresa
    company: Optional[Company] = Relationship(back_populates="shipments")

# Esquema para validación de entrada (Frontend -> Backend)
class ShipmentCreate(ShipmentBase):
    pass

class ShipmentUpdate(SQLModel):
    status: str

class CompanyCreate(SQLModel):
    company_name: str

class WarehouseCreate(SQLModel):
    warehouse_name: str
    company_id: int