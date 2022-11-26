from fastapi import FastAPI, UploadFile
import uuid
from bson import json_util
import json
import utils
from utils import measure, order_by_distance, assess_places, Organization
import classes
import random   
from shapely.geometry import shape, Point
import numpy as np
from fastapi.middleware.cors import CORSMiddleware


accessibility_critical = json.load(open('./data/accessibility_critical.json'))
hsl_bus_stops = json.load(open('./data/hsl_bus_stops.json'))['data']['stopsByBbox']
road_classification = json.load(open('./data/road_classification.json'))
actual_feedback = json.load(open('./data/actual_feedback.json'))

app = FastAPI()
coll = utils.db_connect()
container_client = utils.azure_connect()


origins = [
    "localhost",
    "http://localhost:3000"
    "localhost:3000",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
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
    main_feedback = []
    # assessment criteria such as user measure are random since we don't have the data regardin the depth of the snow or the amount of ice. Road class measure could be extracted, however, there was not enough time to do that. 
    for feedback_instance in actual_feedback:
        main_feedback.append({"feedback_id":uuid.uuid4, "lat":feedback_instance['Lat'], "lon":feedback_instance['Lon'], "user_measure":random.random(), "snow_depth":random.randint(2, 50), "ice":random.randint(1,3), "road_class_measure":random.random()*1.5, "description":feedback_instance['Message']})
    access_points = np.array(list((place['latitude'], place['longitude']) for place in accessibility_critical))
    bus_points = np.array(list((place['lat'], place['lon']) for place in hsl_bus_stops))
        
    for feedback_instance in main_feedback:
        interest_point = np.array((feedback_instance['lat'], feedback_instance['lon']))
        with_org = []
        for i in range(len(accessibility_critical)):
            with_org.append(Organization(accessibility_critical[i]['org_id'],
            measure(interest_point[0],interest_point[1], access_points[i][0], access_points[i][1])))
        # so finally
        feedback_instance['places_measure'] = assess_places(with_org)
        closest_bus = 100000
        for bus_stop in bus_points:
            cur_bus = measure(interest_point[0],interest_point[1], bus_stop[0], bus_stop[1])
            if cur_bus < closest_bus:
                closest_bus = cur_bus
        bus_mark = 0
        if closest_bus <= 80:
            bus_mark = 1
        elif closest_bus > 80 and closest_bus < 160:
            bus_mark = 1/3 * (1 - ((closest_bus - 80)*1.25/100))
        feedback_instance['bus_measure'] =  bus_mark
        feedback_instance['final_urgency'] = 0.5 * feedback_instance['places_measure'] + 0.15 * feedback_instance['road_class_measure'] + 0.20 * feedback_instance['user_measure'] + 0.15* feedback_instance['bus_measure']
    return main_feedback

        