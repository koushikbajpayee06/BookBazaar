from pydantic import BaseModel, ConfigDict, EmailStr
from datetime import datetime

class UserBase(BaseModel):
    name: str
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password:str

class UserOut(UserBase):
    id:int
    role:str
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)




