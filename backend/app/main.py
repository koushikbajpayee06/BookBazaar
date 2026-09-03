from fastapi import FastAPI
from app.database import Base, engine
from app.models.user import User
from app.models.book import Book
from app.api.auth import router as auth_router

app = FastAPI()
app.include_router(auth_router)

Base.metadata.create_all(bind=engine)

@app.get("/")
def health():
    return {"status": "healthy", "message": "BookBazaar API is running"}