from pydantic import BaseModel, ConfigDict
from datetime import datetime

class BookBase(BaseModel):
    title: str
    author_name: str
    category: str
    description: str
    price: float
    image_url: str | None = None
    stock: int = 0

class BookCreate(BookBase):
    pass

class BookUpdate(BaseModel):
    title: str | None = None
    author_name: str | None = None
    category: str | None = None
    description: str | None = None
    price: float | None = None
    image_url: str | None = None
    stock: int  | None = None

class BookOut(BookBase):
    id: int
    rating: float
    created_by_id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)