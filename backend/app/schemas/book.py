from pydantic import BaseModel, ConfigDict, Field
from datetime import datetime

class BookBase(BaseModel):
    title: str = Field(min_length=1)
    author_name: str = Field(min_length=1)
    category: str = Field(min_length=1)
    description: str = Field(min_length=1)
    price: float = Field(ge=0)
    image_url: str | None = None
    stock: int = Field(default=0, ge=0)
    model_config = ConfigDict(str_strip_whitespace=True)

class BookCreate(BookBase):
    pass

class BookUpdate(BaseModel):
    title: str | None = Field(default=None, min_length=1)
    author_name: str | None = Field(default=None, min_length=1)
    category: str | None = Field(default=None, min_length=1)
    description: str | None = Field(default=None, min_length=1)
    price: float | None = Field(default=None, ge=0)
    image_url: str | None = None
    stock: int | None = Field(default=None, ge=0)
    model_config = ConfigDict(str_strip_whitespace=True)

class BookOut(BookBase):
    id: int
    rating: float
    created_by_id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)