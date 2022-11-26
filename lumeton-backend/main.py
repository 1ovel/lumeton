from typing import Union

from fastapi import FastAPI

app = FastAPI()

# Health Check route
@app.get("/api/health")
def read_root():
    return {"Hello": "World"}


# Return a list of Locations with bad weather conditions
@app.get("/api/loca")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}
