import pymongo as pym
import certifi
from fastapi import UploadFile
from azure.storage.blob import BlobServiceClient
import math

# Function to upload an image file to Azure Storage Account
async def uploadtoazure(file: UploadFile,
                        file_name: str,
                        file_type: str,
                        container_client):
    try:
        blob_client = container_client.get_blob_client(file_name)
        f = await file.read()
        blob_client.upload_blob(f)
        return blob_client.url
    except Exception as e:
        print(e)
        return "problems with saving photo to Azure"


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

# Using the Haversine formula to calculate the distance between two points on a sphere
def measure(lat1, lon1, lat2, lon2):   
    R = 6378.137
    dLat = lat2 * math.pi / 180 - lat1 * math.pi / 180
    dLon = lon2 * math.pi / 180 - lon1 * math.pi / 180
    a = math.sin(dLat/2) * math.sin(dLat/2) + math.cos(lat1 * math.pi / 180) * math.cos(lat2 * math.pi / 180) *math.sin(dLon/2) * math.sin(dLon/2)
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
    d = R * c
    return d * 1000
def order_by_distance(item):
    # Return the price, which is the second item within the tuple
    return item.distance

def assess_places(item):
    mark = 0
    item.sort(key=order_by_distance)
    for i in range(3):
        if item[i].distance <= 100:
            mark += 1/3
        elif item[i].distance > 100 and item[i].distance < 300:
            mark +=  1/3 * (1 - ((item[i].distance - 100)*5/1000))
    return mark
    
class Organization:
    def __init__(self, org_id, distance):
        self.org_id = org_id
        self.distance = distance
