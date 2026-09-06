from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.models.book import Book
from app.schemas.book import BookOut
from app.database import get_db
from app.schemas.book import BookCreate
from app.models.user import User
from app.core.dependencies import require_roles

router = APIRouter(prefix="/api/books", tags=["Books"])

@router.get(
    "/",
    response_model=list[BookOut]
)
def get_all_books(db:Session = Depends(get_db),
):
    books = db.query(Book).all()
    return books

@router.get(
    "/{book_id}",
    response_model=BookOut
)
def get_book_by_id(book_id: int ,db: Session=Depends(get_db)):
    book = db.query(Book).filter(Book.id == book_id).first()
    if(not book):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Book not found"
        )
    return book

@router.post(
    '/',
    response_model= BookOut,
    status_code=status.HTTP_201_CREATED,
)
def create_book(
    book:
    BookCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("author", "admin"))
):
    new_book = Book(
    **book.model_dump(),
    created_by_id=current_user.id,

)
    db.add(new_book)
    db.commit()
    db.refresh(new_book)

    return new_book


