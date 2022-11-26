from fastapi import FastAPI, UploadFile
import uuid
from bson import json_util
import json
import utils
from utils import measure, order_by_distance, assess_places, Organization
import classes
from random import random   
from shapely.geometry import shape, Point
import numpy as np

accessibility_critical = json.load(open('./data/accessibility_critical.json'))
hsl_bus_stops = json.load(open('./data/hsl_bus_stops.json'))['data']['stopsByBbox']
road_classification = json.load(open('./data/road_classification.json'))
actual_feedback = json.load(open('./data/actual_feedback.json'))

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




@app.get("/api/summary")
def data_summary():
# assessment criteria is random since we don't have the actual data
    main_feedback = []
    for feedback_instance in actual_feedback:
        main_feedback.append({"lat":feedback_instance['Lat'], "lon":feedback_instance['Lon'], "user_assessment":random(), "road_class_assessment":random()*1.5})
    access_points = np.array(list((place['latitude'], place['longitude']) for place in accessibility_critical))
    bus_points = np.array(list((place['lat'], place['lon']) for place in hsl_bus_stops))
        
    for feedback_instance in main_feedback:
        interest_point = np.array((feedback_instance['lat'], feedback_instance['lon']))
        with_org = []
        for i in range(len(accessibility_critical)):
            with_org.append(Organization(accessibility_critical[i]['org_id'],
            measure(interest_point[0],interest_point[1], access_points[i][0], access_points[i][1])))
        # so finally
        feedback_instance['placesmeasure'] = assess_places(with_org)
        closest_bus = 100000
        for bus_stop in bus_points:
            cur_bus = measure(interest_point[0],interest_point[1], bus_stop[0], bus_stop[1])
            if cur_bus < closest_bus:
                closest_bus = cur_bus
        bus_mark = 0
        print(closest_bus)
        if closest_bus <= 80:
            bus_mark = 1
        elif closest_bus > 80 and closest_bus < 160:
            bus_mark = 1/3 * (1 - ((closest_bus - 80)*1.25/100))
        feedback_instance['bus_measure'] =  bus_mark
        print(main_feedback)