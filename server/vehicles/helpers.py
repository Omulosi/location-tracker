
from .data import A109, A2, A3

def updateLocations(vehicleList):
    roads = {"A2":A2, "A3":A3, "A109": A109}
    updated = []
    for v in vehicleList:
        v['latitude'] = 0
        v['longitude'] = 0
        v['speed'] = 0
        updated.append(v)
    
    return updated