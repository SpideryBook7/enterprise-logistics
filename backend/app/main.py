from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.endpoints import shipments, companies, warehouses
from app.websocket_manager import manager
from app.database import init_db

app = FastAPI()

# Configuración de CORS - DEBE ir antes de las rutas
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"], # Esto permite POST, GET, OPTIONS, etc.
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    init_db()

# ... resto de tus rutas

# Registro de Rutas
app.include_router(shipments.router, prefix="/api/v1/shipments", tags=["shipments"])
app.include_router(companies.router, prefix="/api/v1/companies", tags=["companies"])
app.include_router(warehouses.router, prefix="/api/v1/warehouses", tags=["warehouses"])

@app.websocket("/ws/shipments")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(websocket)

@app.get("/")
def health_check():
    return {"status": "online"}