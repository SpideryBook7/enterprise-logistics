# 📦 SaaS Enterprise Logistics System

Sistema escalable de gestión logística desarrollado con arquitectura limpia (Clean Architecture) y principios SOLID.

## 🚀 Tech Stack
* **Backend:** Python 3.10+, FastAPI, SQLModel (Pydantic + SQLAlchemy).
* **Base de Datos:** PostgreSQL 15 ejecutándose en Docker.
* **Entorno:** WSL2 (Ubuntu 22.04), VS Code.

## 🛠️ Arquitectura del Proyecto
El proyecto sigue una estructura modular para facilitar el testing y la escalabilidad:
* `app/models.py`: Definición de tablas y relaciones de base de datos.
* `app/api/v1/endpoints/`: Lógica de negocio dividida por recursos (Shipments, Companies, etc.).
* `app/database.py`: Configuración del motor y sesiones de SQLModel.

## 🚦 Guía de Inicio Rápido

1. **Levantar Base de Datos:**
   ```bash
   docker-compose up -d

2. **Configurar Backend:**
    cd backend
    python3 -m venv .venv
    source .venv/bin/activate
    pip install -r requirements.txt

3. **Ejecutar API:**
    uvicorn app.main:app --reload

**Accede a la documentación interactiva en: http://localhost:8000/docs**