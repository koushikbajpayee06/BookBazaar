from sqlalchemy import Column, Integer, String,DateTime, Text, Float, ForeignKey
from app.database import Base
from datetime import datetime, timezone
from sqlalchemy.orm import relationship

class Book(Base):
    __tablename__ = "books"
    id=Column(Integer, primary_key=True, index=True)
    title=Column(String, nullable=False, index=True)
    author_name =Column(String, nullable=False, index=True)
    description=Column(Text, nullable=False)
    category=Column(String, nullable=False, index=True) 
    price=Column(Float, nullable=False)
    rating=Column(Float, default=0.0, nullable=False)
    image_url=Column(String)
    stock=Column(Integer, default=0, nullable=False)
    created_by_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    created_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
    )
    created_by = relationship("User", back_populates="books")