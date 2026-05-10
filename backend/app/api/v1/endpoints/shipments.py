from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from app.database import get_db
from app.models import Shipment, ShipmentCreate, ShipmentUpdate, Company
from app.websocket_manager import manager 

router = APIRouter()

@router.get("/")
async def get_shipments(db: Session = Depends(get_db)):
    statement = select(Shipment).order_by(Shipment.shipment_id.desc())
    return db.exec(statement).all()

@router.post("/")
async def create_shipment(shipment_data: ShipmentCreate, db: Session = Depends(get_db)):
    try:
        db_shipment = Shipment.from_orm(shipment_data)
        db_shipment.status = "pending"
        db.add(db_shipment)
        db.commit()
        db.refresh(db_shipment)
        
        company = db.get(Company, db_shipment.company_id)
        company_name = company.company_name if company else "Desconocida"

        # Enviar notificación inmediata por WebSocket
        await manager.broadcast({
            "event_type": "create",
            "shipment_id": db_shipment.shipment_id,
            "content": db_shipment.content,
            "status": db_shipment.status,
            "company_id": db_shipment.company_id,
            "company_name": company_name
        })
        return db_shipment
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@router.patch("/{shipment_id}/status")
async def update_shipment_status(shipment_id: int, shipment_update: ShipmentUpdate, db: Session = Depends(get_db)):
    db_shipment = db.get(Shipment, shipment_id)
    if not db_shipment:
        raise HTTPException(status_code=404, detail="Envío no encontrado")
    
    if shipment_update.status not in ["pending", "in_transit", "delivered"]:
        raise HTTPException(status_code=400, detail="Estado inválido")
        
    db_shipment.status = shipment_update.status
    db.add(db_shipment)
    db.commit()
    db.refresh(db_shipment)
    
    company = db.get(Company, db_shipment.company_id)
    company_name = company.company_name if company else "Desconocida"
    
    # Broadcast status update
    await manager.broadcast({
        "event_type": "update",
        "shipment_id": db_shipment.shipment_id,
        "content": db_shipment.content,
        "status": db_shipment.status,
        "company_id": db_shipment.company_id,
        "company_name": company_name
    })
    
    return db_shipment