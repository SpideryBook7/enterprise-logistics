# backend/app/database.py
from sqlmodel import create_engine, Session, SQLModel, select
import os
from dotenv import load_dotenv
from app.models import Company, Warehouse

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://admin:password123@localhost:5432/admin")
engine = create_engine(DATABASE_URL)

def seed_data(session: Session):
    statement = select(Company)
    existing_company = session.exec(statement).first()
    if not existing_company:
        company = Company(company_name="Logística Express")
        session.add(company)
        session.commit()
        session.refresh(company)
        
        w1 = Warehouse(warehouse_name="Almacén Central (CDMX)", company_id=company.company_id)
        w2 = Warehouse(warehouse_name="Distribuidora Norte (MTY)", company_id=company.company_id)
        session.add_all([w1, w2])
        session.commit()

def init_db():
    # Solo crea las tablas si no existen
    SQLModel.metadata.create_all(engine)
    
    with Session(engine) as session:
        seed_data(session)

def get_db():
    with Session(engine) as session:
        yield session