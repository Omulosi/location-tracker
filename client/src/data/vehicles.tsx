/* eslint-disable no-loop-func */
import { Item } from "../pages/Map";

type VehicleType = { [k: string]: Item };

// vehicle objects
export const vehicles: VehicleType = {
  "Vehicle-1": {
    coordinates: { latitude: 0, longitude: 0 },
    speed: 30,
    name: "Vehicle-1",
    id: 1,
  },
  "Vehicle-2": {
    coordinates: { latitude: 0, longitude: 0 },
    speed: 27,
    name: "Vehicle-2",
    id: 2,
  },
};

// Vehicle paths
export const lonLats: Record<string, number[][]> = {
  "Vehicle-1": [
    [36.8576, -1.2533],
    [36.8656, -1.2471],
    [36.8727, -1.232],
    [36.886, -1.2231],
    [36.9002, -1.2116],
    [36.9215, -1.1983],
    [36.941, -1.177],
    [36.9588, -1.1646],
    [36.9694, -1.1379],
    [37.0, -1.12],
    [37.0351, -1.0891],
    [37.0564, -1.0572],
    [37.0742, -1.0155],
  ],
  "Vehicle-2": [
    [37.092, -0.047],
    [37.084, 0.019],
    [37.1, 0.028],
    [37.113, 0.033],
    [37.127, 0.035],
    [37.149, 0.044],
    [37.162, 0.05],
    [37.178, 0.053],
    [37.188, 0.053],
    [37.199, 0.055],
    [37.206, 0.056],
    [37.218, 0.065],
    [37.229, 0.074],
    [37.237, 0.083],
  ],
};

// func for updating vehicle location and speed
const updateVehicle = (
  pathArray: number[][],
  vehicle: Item,
  speedIncrement: number,
  count: number
) => {
  let location = pathArray[count];
  vehicle.coordinates.longitude = location[0];
  vehicle.coordinates.latitude = location[1];
  vehicle.speed = vehicle.speed + speedIncrement;
  if (count >= 9) {
    vehicle.speed = 20;
  }
  return vehicle;
};

let counter = 0;
const pathLength = Math.min(
  ...Object.values(lonLats).map((path) => path.length)
);

// Generates an array with updated vehicles at each step
export function* vehicleGenerator() {
  while (counter < pathLength) {
    // A list for holding updated vehicles
    let updatedVehicles: Item[] = [];

    // Build list of updated vehicles
    Object.keys(vehicles).forEach((v) => {
      // Get the vehicle
      let vehicle: Item = vehicles[v];
      // Get the path in lonlats for this vehicle
      let path = lonLats[vehicle.name];
      // update coordinates and speed for this vehicle
      vehicle = updateVehicle(path, vehicle, 1, counter);
      // Add updated vehicle to the vehicles list
      updatedVehicles.push(vehicle);
    });
    counter = counter + 1;
    // Update features array with list of updated vehicles
    yield updatedVehicles;
  }
  return [];
}
