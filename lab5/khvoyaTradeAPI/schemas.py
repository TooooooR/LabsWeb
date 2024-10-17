from pydantic import BaseModel
from datetime import datetime
from pydantic import PositiveInt


class TreeBase(BaseModel):
    manufacturer_name: str
    height_cm: PositiveInt
    price: PositiveInt
    material: str
    updated_at: datetime | None = None


class Tree(TreeBase):
    id: int


class TreesTotalPrice(BaseModel):
    total_price: int
