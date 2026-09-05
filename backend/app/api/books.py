from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.models.book import Book
from app.schemas.book import BookOut
from app.database import get_db

router = APIRouter(prefix="/api/books", tags=["Books"])

@router.get(
    "/",
    response_model=list[BookOut]
)
def get_all_books(db:Session = Depends(get_db),
):
    books = db.query(Book).all()
    return books

    