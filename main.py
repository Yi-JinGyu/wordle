from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.staticfiles import StaticFiles

app = FastAPI()

answer = 'TRAIN'
@app.get('/answer')
def get_answer():
    return {'answer':answer}

app.mount("/", StaticFiles(directory="static", html=True), name="static")


"""
# get, post 알아보기
class Item(BaseModel):
    id:int
    content:str

items = ['맥북', '애플워치', '아이폰', '에어팟']

# get - path 방식
@app.get('/items/{id}')
def read_id_item(id):
    return items[int(id)]

# get - query 방식
@app.get('/items')
def read_id_item(skip:int=0, limit:int=10):
    return items[skip:skip+limit]

# post - 값 추가
@app.post("/items")
def post_item(item:Item):
    items.append(item.content)
    return '성공했습니다!'
"""