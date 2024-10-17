from sqlalchemy import (
    Column,
    String,
    Integer,
    DateTime
)
from database import Base
from datetime import datetime
from pytz import UTC


class Tree(Base):
    __tablename__ = 'trees'
    id = Column(Integer, primary_key=True, autoincrement=True)
    manufacturer_name = Column(String)
    height_cm = Column(Integer)
    price = Column(Integer)
    material = Column(String)
    updated_at = Column(DateTime(timezone=True), default=datetime.now(tz=UTC), onupdate=datetime.now(tz=UTC))
