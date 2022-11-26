from fastapi import FastAPI, UploadFile
import uuid
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
    # Rename photo file
    file.filename = f"{uuid.uuid4()}.jpg"

    return await utils.uploadtoazure(file,
                                     file.filename,
                                     file.content_type,
                                     container_client)


# Save a new Locations
@app.post("/api/loca")
async def save_item(loca: classes.Loca):
    # Location coordinates to be dict
    loca.coordinates = dict(loca.coordinates)

    # Uploading document to collection and getting its _id in return
    inserted_id = coll.insert_one(dict(loca))

    # Getting just uploaded document from db
    response = coll.find_one({"_id": inserted_id.inserted_id})

    # Sending to the client this document
    return json.loads(json_util.dumps(response))


# Return a list of Locations with bad weather conditions
@app.get("/api/locas")
def read_item():
    # Fetching all documents
    docs = coll.find({})

    # Sending them to the client
    return json.loads(json_util.dumps(docs))
