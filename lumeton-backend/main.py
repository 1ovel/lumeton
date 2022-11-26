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
import utils
import classes

app = FastAPI()
coll = utils.db_connect()
container_client = utils.azure_connect()


# Health Check route
@app.get("/api/health")
def read_root():
    return {"Hello": "World"}

# Save an image and reutrn its url
@app.post("/api/image")
async def save_image(file: UploadFile):
    file.filename = f"{uuid.uuid4()}.jpg"

    return await utils.uploadtoazure(file, file.filename, file.content_type, container_client)

# Save a new Locations
@app.post("/api/loca")
async def save_item(loca: classes.Loca):
    loca.coordinates = dict(loca.coordinates)

    inserted_id= coll.insert_one(dict(loca))

    response = coll.find_one({"_id": inserted_id.inserted_id})

    return json.loads(json_util.dumps(response))


# Return a list of Locations with bad weather conditions
@app.get("/api/locas")
def read_item():
    docs = coll.find({})

    return json.loads(json_util.dumps(docs))
