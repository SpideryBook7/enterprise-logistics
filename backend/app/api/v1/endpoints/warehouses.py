from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from app.database import get_db
from app.models import Warehouse, WarehouseCreate

router = APIRouter()

@router.get("/")
def get_warehouses(db: Session = Depends(get_db)):
    statement = select(Warehouse)
    return db.exec(statement).all()

@router.post("/")
def create_warehouse(warehouse_data: WarehouseCreate, db: Session = Depends(get_db)):
    db_warehouse = Warehouse.from_orm(warehouse_data)
    db.add(db_warehouse)
    db.commit()
    db.refresh(db_warehouse)
    return db_warehouse