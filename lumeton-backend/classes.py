from pydantic import BaseModel

class Coordinates(BaseModel):
    lat: float
    lon: float

class Loca(BaseModel):
    coordinates: Coordinates
    imageUrl: str
    weatherConditions: str
    snowDepth: str | None = None
    feedback: str | None = None
