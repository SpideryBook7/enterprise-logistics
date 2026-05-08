# app/main.py
from fastapi import FastAPI
from app.database import init_db
from app.api.v1.endpoints import shipments, companies, warehouses

app = FastAPI(title="SaaS Logistics System")

@app.on_event("startup")
def on_startup():
    init_db()

# Registro de routers
app.include_router(companies.router, prefix="/api/v1/companies", tags=["Companies"])
app.include_router(shipments.router, prefix="/api/v1/shipments", tags=["Shipments"])
app.include_router(warehouses.router, prefix="/api/v1/warehouses", tags=["Warehouses"])

@app.get("/")
def root():
    return {"message": "API is running", "docs": "/docs"}
