import FlightCard from "@/app/flights/[id]/components/FlightCard";
import RouteMap from "@/app/flights/[id]/components/RouteMap";
import {getFlightDetail} from "@/app/APIs/flightradar";

export default async function Flight() {
  const data = await getFlightDetail();

  return (
    <div className="grid xl:grid-cols-[45%_1fr] gap-6">
      <FlightCard
        identification={data.identification}
        status={data.status}
        airline={data.airline}
        origin={data.airport.origin}
        destination={data.airport.destination}
        scheduled={data.time.scheduled}
        real={data.time.real}
        estimated={data.time.estimated}
        historical={data.time.historical}
        currentPosition={data.trail[0]}
      />
      <RouteMap
        trail={data.trail}
        origin={data.airport.origin.position}
        destination={data.airport.destination.position}
      />
    </div>
  );
}
