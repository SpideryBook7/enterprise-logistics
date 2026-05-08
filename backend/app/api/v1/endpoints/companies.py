from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from app.database import get_session
from app.models import Company
from typing import List

router = APIRouter()

@router.post("/", response_model=Company)
def create_company(company: Company, session: Session = Depends(get_session)):
    session.add(company)
    session.commit()
    session.refresh(company)
    return company

@router.get("/", response_model=List[Company])
def list_companies(session: Session = Depends(get_session)):
    return session.exec(select(Company)).all()