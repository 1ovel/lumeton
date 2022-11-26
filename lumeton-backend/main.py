from pydantic import BaseModel
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import Response, JSONResponse
from fastapi.encoders import jsonable_encoder
from random import randint
import os, uuid
from azure.identity import DefaultAzureCredential
from azure.storage.blob import BlobServiceClient, BlobClient, ContainerClient
import pymongo as pym
import certifi
from bson import json_util
import json

app = FastAPI()

# Connecting to MongoDB, returns db
def db_connect():
    connection = pym.MongoClient("mongodb+srv://paskaton:kw9GEv46BW3Y7uc8@paskaton.gs0y8gx.mongodb.net/?retryWrites=true&w=majority", tlsCAFile=certifi.where())
    db = connection['paskaton']
    collection = db['p_collection']
    return collection

coll = db_connect()
    
# Connecting to Azure Storage Account
try:
    connect_str = "DefaultEndpointsProtocol=https;AccountName=paskaton;AccountKey=Qc2LVMB+cKzM6RK+uYhFtVHYDWuQFMDQvdMX7KqXf7m/TTNbrxjh8LsEFjUYsC1sp7rvJ35Duzjg+AStJl8Ysg==;EndpointSuffix=core.windows.net" # os.getenv('AZURE_STORAGE_CONNECTION_STRING')
    blob_service_client = BlobServiceClient.from_connection_string(connect_str)
    container_name = "paskatoncontainer"
    container_client = blob_service_client.get_container_client(container_name)
except Exception as e:
    print(e)

# Function to upload an image file to Azure Storage Account
async def uploadtoazure(file: UploadFile, file_name: str, file_type: str):
    try:
        blob_client = container_client.get_blob_client(file_name)
        f = await file.read()
        result = blob_client.upload_blob(f)
        return blob_client.url
    except Exception as e:
        print(e)
        return "problemes with saving photo to Azure"

class Coordinates(BaseModel):
    lat: float
    lon: float

class Loca(BaseModel):
    coordinates: Coordinates
    imageUrl: str
    weatherConditions: str
    snowDepth: str | None = None
    feedback: str | None = None

# Health Check route
@app.get("/api/health")
def read_root():
    return {"Hello": "World"}

# Save an image and reutrn its url
@app.post("/api/image")
async def save_image(file: UploadFile):
    file.filename = f"{uuid.uuid4()}.jpg"

    return await uploadtoazure(file, file.filename, file.content_type)

# Save a new Locations
@app.post("/api/loca")
async def save_item(loca: Loca):
    loca.coordinates = dict(loca.coordinates)

    inserted = coll.insert_one(dict(loca))

    response = coll.find_one({"_id": inserted.inserted_id})

    response = json.loads(json_util.dumps(response))
    return response


# Return a list of Locations with bad weather conditions
# @app.get("/api/locas")
# def read_item(item_id: int, q: Union[str, None] = None):
#     return {"item_id": item_id, "q": q}
