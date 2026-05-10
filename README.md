# 📦 Enterprise Logistics SaaS

Sistema escalable de gestión logística con arquitectura limpia (Clean Architecture), principios SOLID y diseño adaptativo (Mobile-First / Minimalista).

![Enterprise Logistics](https://img.shields.io/badge/Status-Production_Ready-success)
![Docker](https://img.shields.io/badge/Docker-Enabled-blue)

## 🚀 Tech Stack

* **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, React Router (SPA).
* **Backend:** Python 3.10+, FastAPI, SQLModel (Pydantic + SQLAlchemy).
* **Base de Datos:** PostgreSQL 15.
* **Tiempo Real:** WebSockets integrados para actualizaciones en vivo (sin refrescar).

## 🛠️ Funcionalidades Core

1. **Gestión de Envíos en Tiempo Real:** Crea y rastrea paquetes a lo largo de los diferentes almacenes.
2. **WebSockets Nativos:** Cada actualización de estado ("Pendiente" -> "En Tránsito") se propaga mágicamente a todas las pantallas abiertas.
3. **Control Total de Entidades:** Interfaces para crear y catalogar múltiples Empresas y Almacenes.
4. **UX Premium:** 
   - Notificaciones *Toast* elegantes (no bloqueantes).
   - Animaciones y transiciones de carga (*Skeleton Loaders*).
   - Búsqueda instantánea en memoria para tracking ID o contenido.
   - 100% Responsive (Menú inferior en móviles).

## 🚦 Guía de Despliegue (Docker)

La plataforma está completamente contenerizada. El orquestador levantará el Backend, el Frontend y la Base de datos Postgres persistente de manera automática.

```bash
# Construir y levantar todos los servicios en segundo plano
docker compose up --build -d
```

### Accesos:
* **App (Frontend):** `http://localhost:5173`
* **API y WebSockets:** `ws://localhost:8000/ws/shipments`
* **Documentación Interactiva (Swagger UI):** `http://localhost:8000/docs`

> **Nota sobre Persistencia:** Los datos se guardan en un volumen local manejado por Docker (`postgres_data`). Reiniciar o tumbar el contenedor **no** eliminará los datos (empresas, almacenes, o envíos creados).

## 🗄️ Estructura del Proyecto

* `backend/app/`: Contiene la lógica del servidor dividida en rutas (`api/v1/endpoints/`), modelos ORM y WebSockets.
* `frontend/src/`:
  * `/pages`: Layouts modulares mediante *React Router*.
  * `/components`: Componentes desacoplados, incluyendo UI de Toasts, Formularios de Gestión y Tablas dinámicas.
  * `/hooks`: Abstracción de lógica (Custom Hooks para Fetching e instanciación del WebSocket).

## 🤝 Prácticas Empleadas
- **SOLID**: Separación drástica entre vista (UI) y origen de datos (Hooks).
- **Early Returns / Fail Fast**: Manejo de errores estricto en APIs y validación con Pydantic.
- **Atomic Design UI**: Componentes pequeños (Toasts, Skeletons) reutilizables a lo largo del orquestador.