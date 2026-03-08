from fastapi import FastAPI
from fastapi.responses import FileResponse
import uvicorn
from contextlib import asynccontextmanager
from core.db import init_models

@asynccontextmanager
async def lifespan(app: FastAPI):
  await init_models()
  yield
app = FastAPI(lifespan=lifespan)

@app.get("/")
def get_root():
  return FileResponse("./img/kot.jpg")

if __name__ == "__main__":
  uvicorn.run(app="main:app", reload=True)