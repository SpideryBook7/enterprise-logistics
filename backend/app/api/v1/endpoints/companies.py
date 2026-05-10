from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from app.database import get_db
from app.models import Company, CompanyCreate

router = APIRouter()

@router.get("/")
async def get_companies(db: Session = Depends(get_db)):
    statement = select(Company)
    results = db.exec(statement).all()
    return results

@router.post("/")
async def create_company(company_data: CompanyCreate, db: Session = Depends(get_db)):
    db_company = Company.from_orm(company_data)
    db.add(db_company)
    db.commit()
    db.refresh(db_company)
    return db_company