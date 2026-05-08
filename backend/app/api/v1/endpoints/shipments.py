# app/api/v1/endpoints/shipments.py
from fastapi import APIRouter, Depends
from sqlmodel import Session
from app.database import get_session
from app.models import Shipment, TrackingLog
from app.schemas import ShipmentCreate

router = APIRouter()

@router.post("/")
def create_shipment(payload: ShipmentCreate, session: Session = Depends(get_session)):
    # 1. Crear el envío
    db_shipment = Shipment.from_orm(payload)
    session.add(db_shipment)
    session.commit()
    session.refresh(db_shipment)

    # 2. Crear el log inicial automáticamente (Mentalidad Senior)
    new_log = TrackingLog(
        shipment_id=db_shipment.shipment_id,
        status_update="Envío creado en el sistema",
        location_description="Sistema Central"
    )
    session.add(new_log)
    session.commit()
    
    return {"shipment": db_shipment, "initial_log": "created"}