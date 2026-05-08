from fastapi import APIRouter, Depends
from sqlmodel import Session
from app.database import get_session
from app.models import Warehouse

router = APIRouter()

@router.post("/")
def create_warehouse(warehouse: Warehouse, session: Session = Depends(get_session)):
    session.add(warehouse)
    session.commit()
    session.refresh(warehouse)
    return warehouse