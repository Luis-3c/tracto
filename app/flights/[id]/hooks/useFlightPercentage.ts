import { IPosition, ITrail } from "../types/IFlightDetail";

export function useFlightPercentage(origin: IPosition, destination: IPosition, current: ITrail): {flightPercentage: string} {
    
    const coordsOrigin: [number, number] = [origin.longitude, origin.latitude];
    const coordsDestination: [number, number] = [destination.longitude, destination.latitude];
    const coordsCurrent: [number, number] = [current.lng, current.lat];

    const totalDistance = haversineDistance(coordsOrigin, coordsDestination);
    const traveledDistance = haversineDistance(coordsOrigin, coordsCurrent);

    const percentage = (traveledDistance / totalDistance) * 100;

    return {
       flightPercentage: percentage.toFixed(1)
    }
}

function toRad(value: number): number {
    return (value * Math.PI) / 180;
  }
  
  function haversineDistance(coord1: [number, number], coord2: [number, number]): number {
    const R = 6371e3; // Earth radius in meters
    const [lon1, lat1] = coord1;
    const [lon2, lat2] = coord2;
  
    const φ1 = toRad(lat1);
    const φ2 = toRad(lat2);
    const Δφ = toRad(lat2 - lat1);
    const Δλ = toRad(lon2 - lon1);
  
    const a =
      Math.sin(Δφ / 2) ** 2 +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    return R * c; // distance in meters
  }
  