from fastapi import FastAPI, Depends, HTTPException
from fastapi import Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from contextlib import asynccontextmanager
from enum import Enum
from sqlalchemy.sql import or_
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import asc, desc

from schemas import Tree, TreeBase, TreesTotalPrice
from models import Tree as TreeModel
from database import get_db
from typing import List, Optional
from database import engine
from database import Base

async def on_startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

async def on_shutdown():
    pass

@asynccontextmanager
async def lifespan(app_: FastAPI):
    await on_startup()
    yield
    await on_shutdown()

app = FastAPI(prefix="/api", tags=["api"], lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

class OrderClause(str, Enum):
    PRICE = "price"
    NAME = "manufacturer_name"
    PRICE_ASC = "price_asc"
    PRICE_DESC = "price_desc"

@app.get("/trees", response_model=List[Tree])
async def get_trees(
        search: Optional[str] = Query(default=None),
        order_by: Optional[OrderClause] = Query(default=None),
        db_session: AsyncSession = Depends(get_db)
) -> List[Tree]:
    query = select(TreeModel)

    if search:
        search_term = f"%{search}%"
        query = query.where(
            or_(
                TreeModel.manufacturer_name.ilike(search_term),
                TreeModel.material.ilike(search_term)
            )
        )

    # Сортування
    if order_by:
        if order_by == OrderClause.PRICE_ASC:
            query = query.order_by(asc(TreeModel.price))
        elif order_by == OrderClause.PRICE_DESC:
            query = query.order_by(desc(TreeModel.price))
        elif order_by == OrderClause.NAME:
            query = query.order_by(TreeModel.manufacturer_name)

    result = await db_session.execute(query)
    trees = result.scalars().all()
    return trees

@app.get("/trees/total_price")
async def total_price(
        search: Optional[str] = Query(default=None),
        db_session: AsyncSession = Depends(get_db)
) -> TreesTotalPrice:
    query = select(TreeModel)

    if search:
        search_term = f"%{search}%"
        query = query.where(
            or_(
                TreeModel.manufacturer_name.ilike(search_term),
                TreeModel.material.ilike(search_term)
            )
        )

    result = await db_session.execute(query)
    trees = result.scalars().all()

    total_price = sum([tree.price for tree in trees])

    return {"total_price": total_price}

@app.post("/trees", response_model=Tree)
async def create_tree(
        tree_base: TreeBase,
        db_session: AsyncSession = Depends(get_db)
) -> Tree:
    new_tree = TreeModel(**tree_base.dict())
    db_session.add(new_tree)
    await db_session.commit()
    await db_session.refresh(new_tree)
    return new_tree

@app.delete("/trees/{tree_id}", response_model=str)
async def delete_tree(
        tree_id: int,
        db_session: AsyncSession = Depends(get_db)
) -> str:
    query = select(TreeModel).where(TreeModel.id == tree_id)
    result = await db_session.execute(query)
    tree = result.scalar_one_or_none()

    if not tree:
        raise HTTPException(status_code=404, detail="Tree not found")

    await db_session.delete(tree)
    await db_session.commit()

    return "Tree deleted successfully"

@app.put("/trees/{tree_id}", response_model=Tree)
async def update_tree(
        tree_id: int,
        tree_base: TreeBase,
        db_session: AsyncSession = Depends(get_db)
) -> Tree:
    query = select(TreeModel).where(TreeModel.id == tree_id)
    result = await db_session.execute(query)
    tree = result.scalar_one_or_none()

    if not tree:
        raise HTTPException(status_code=404, detail="Tree not found")

    for key, value in tree_base.dict().items():
        setattr(tree, key, value)

    await db_session.commit()
    await db_session.refresh(tree)

    return tree

