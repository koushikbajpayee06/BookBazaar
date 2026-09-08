from fastapi import FastAPI
from app.database import Base, engine
from app.models.user import User
from app.models.book import Book
from app.api.auth import router as auth_router
from app.api.admin import router as admin_router
from app.api.books import router as books_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=False,
    allow_methods=["GET", "POST", "PATCH", "DELETE"],
    allow_headers=["Authorization", "Content-Type"],
)

app.include_router(auth_router)
app.include_router(admin_router)
app.include_router(books_router)

Base.metadata.create_all(bind=engine)

@app.get("/")
def health():
    return {"status": "healthy", "message": "BookBazaar API is running"}