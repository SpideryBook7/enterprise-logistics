from typing import Optional, List
from sqlmodel import SQLModel, Field, Relationship
from datetime import datetime

class Company(SQLModel, table=True):
    company_id: Optional[int] = Field(default=None, primary_key=True)
    company_name: str = Field(unique=True, index=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    shipments: List["Shipment"] = Relationship(back_populates="company")

class Warehouse(SQLModel, table=True):
    warehouse_id: Optional[int] = Field(default=None, primary_key=True)
    company_id: int = Field(foreign_key="company.company_id")
    warehouse_name: str
    city: str
    country: str

class Vehicle(SQLModel, table=True):
    vehicle_id: Optional[int] = Field(default=None, primary_key=True)
    company_id: int = Field(foreign_key="company.company_id")
    license_plate: str = Field(unique=True)
    vehicle_type: str
    capacity_kg: float

class Shipment(SQLModel, table=True):
    shipment_id: Optional[int] = Field(default=None, primary_key=True)
    company_id: int = Field(foreign_key="company.company_id")
    status: str = Field(default="created")
    order_date: datetime = Field(default_factory=datetime.utcnow)
    
    company: Optional[Company] = Relationship(back_populates="shipments")
    logs: List["TrackingLog"] = Relationship(back_populates="shipment")

class TrackingLog(SQLModel, table=True):
    log_id: Optional[int] = Field(default=None, primary_key=True)
    shipment_id: int = Field(foreign_key="shipment.shipment_id")
    log_timestamp: datetime = Field(default_factory=datetime.utcnow)
    status_update: str
    location_description: Optional[str] = None

    shipment: Optional[Shipment] = Relationship(back_populates="logs")