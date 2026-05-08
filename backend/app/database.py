from sqlmodel import create_engine, Session, SQLModel
import os
from dotenv import load_dotenv
from sqlmodel import create_engine, SQLModel

# Carga las variables del archivo .env
load_dotenv()

# Obtener la URL, si no la encuentra usa una por defecto
DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL, echo=True)

def init_db():
    # Crea las tablas si no existen basándose en los modelos de Python
    SQLModel.metadata.create_all(engine)

def get_session():
    # Inyección de dependencia para las rutas
    with Session(engine) as session:
        yield session