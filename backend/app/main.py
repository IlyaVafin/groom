from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from contextlib import asynccontextmanager
from core.db import init_models
from routes.user import user_router
from routes.auth import auth_router
from routes.order import order_router


@asynccontextmanager
async def lifespan(app: FastAPI):
  await init_models()
  yield
app = FastAPI(lifespan=lifespan)

origins = ["http://localhost:5173"]

app.add_middleware(CORSMiddleware, allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],)

app.include_router(user_router, prefix="/api", tags=["User"])
app.include_router(auth_router, prefix="/api/auth", tags=["Auth"])
app.include_router(order_router, prefix="/api", tags=["Order"])

@app.get("/")
def get_root():
  return FileResponse("./img/kot.jpg")


if __name__ == "__main__":
  uvicorn.run(app="main:app", reload=True)