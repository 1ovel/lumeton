from azure.identity import DefaultAzureCredential

import pymongo as pym
import certifi
from fastapi import FastAPI, File, UploadFile
from azure.storage.blob import BlobServiceClient, BlobClient, ContainerClient

# Function to upload an image file to Azure Storage Account
async def uploadtoazure(file: UploadFile, file_name: str, file_type: str, container_client):
    try:
        blob_client = container_client.get_blob_client(file_name)
        f = await file.read()
        result = blob_client.upload_blob(f)
        return blob_client.url
    except Exception as e:
        print(e)
        return "problemes with saving photo to Azure"

# Connecting to MongoDB, returns db
def db_connect():
    connection = pym.MongoClient("mongodb+srv://paskaton:kw9GEv46BW3Y7uc8@paskaton.gs0y8gx.mongodb.net/?retryWrites=true&w=majority", tlsCAFile=certifi.where())
    db = connection['paskaton']
    collection = db['p_collection']
    return collection


# Connecting to Azure Storage Account
def azure_connect():
    connect_str = "DefaultEndpointsProtocol=https;AccountName=paskaton;AccountKey=Qc2LVMB+cKzM6RK+uYhFtVHYDWuQFMDQvdMX7KqXf7m/TTNbrxjh8LsEFjUYsC1sp7rvJ35Duzjg+AStJl8Ysg==;EndpointSuffix=core.windows.net" # os.getenv('AZURE_STORAGE_CONNECTION_STRING')
    blob_service_client = BlobServiceClient.from_connection_string(connect_str)
    container_name = "paskatoncontainer"
    container_client = blob_service_client.get_container_client(container_name)

    return container_client
