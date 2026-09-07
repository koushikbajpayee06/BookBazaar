from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.models.book import Book
from app.schemas.book import BookOut
from app.database import get_db
from app.schemas.book import BookCreate
from app.models.user import User
from app.core.dependencies import require_roles
from app.schemas.book import BookUpdate

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

@router.patch(
    "/{book_id}",
    response_model=BookOut
)
def update_book(
    book_id: int,
    book_update:BookUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(require_roles("author", "admin"))
):
    book = db.query(Book).filter(Book.id == book_id).first()
    if book is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Book not found",
        )
    if current_user.role != "admin" and book.created_by_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only update your own books",
        )
    updates = book_update.model_dump(exclude_unset=True)
    for field, value in updates.items():
        if value is None and field != "image_url":
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail=f"{field} cannot be null",
            )

    for field, value in updates.items():
        setattr(book, field, value)

    db.commit()
    db.refresh(book)

    return book

@router.delete(
    "/{book_id}",
    status_code=status.HTTP_204_NO_CONTENT
)
def delete_book(
    book_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("author", "admin"))
):
    book = db.query(Book).filter(Book.id == book_id).first()
    if book is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Book not found"
        )
    if current_user.role != "admin" and book.created_by_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only delete your own books",
        )
    db.delete(book)
    db.commit()