from fastapi import FastAPI
from fastapi.responses import FileResponse
import uvicorn
from contextlib import asynccontextmanager
from core.db import init_models
from rotutes.user import user_router
from rotutes.auth import auth_router
@asynccontextmanager
async def lifespan(app: FastAPI):
  await init_models()
  yield
app = FastAPI(lifespan=lifespan)

app.include_router(user_router, prefix="/api")
app.include_router(auth_router, prefix="/api")
@app.get("/")
def get_root():
  return FileResponse("./img/kot.jpg")


if __name__ == "__main__":
  uvicorn.run(app="main:app", reload=True)