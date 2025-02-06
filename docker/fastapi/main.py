from typing import Union
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return { "Hello":"World" }

@app.get("/items/{item_id}")
def read_item(item_id:int,q:Union[str,None]=None):
    return { "item_id":item_id,"q":q }

@app.get("/shit")
async def root():
    return {"message": "Hello World!"}


fake_items_db = [{"item_name": "Foo"}, {"item_name": "Bar"}, {"item_name": "Baz"},{"item_name": "Foo"}, {"item_name": "Bar"}, {"item_name": "Baz"},{"item_name": "Foo"}, {"item_name": "Bar"}, {"item_name": "Baz"}]


@app.get("/items_shit/")
async def read_item(skip: int = 0, limit: int = 10):
    return fake_items_db[skip : skip + limit]