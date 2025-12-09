import { useCalculateElapsedTime, useCalculateRemainingTime } from "../hooks/useCalculateTimes";
import { useFlightPercentage } from "../hooks/useFlightPercentage";
import { useMilisecToHrMin } from "../hooks/useMilisecToMin";
import {
  IAirline,
  IAirport,
  IHistorical,
  IIdentification,
  IStatus,
  ITime,
  ITrail,
} from "../types/IFlightDetail";
import FlightDetail from "./FlightDetail";

interface Props {
  identification: IIdentification;
  status: IStatus;
  airline: IAirline;
  origin: IAirport;
  destination: IAirport;
  scheduled: ITime;
  estimated: ITime;
  real: ITime;
  historical: IHistorical;
  currentPosition: ITrail;
}
export default function FlightCard({
  identification,
  status,
  airline,
  origin,
  destination,
  scheduled,
  estimated,
  real,
  historical,
  currentPosition,
}: Props) {

  const [flightTimeInHrMin] = useMilisecToHrMin(Number(historical.flighttime));
  const { flightPercentage} = useFlightPercentage(origin.position, destination.position, currentPosition);
  const { elapsedTime } = useCalculateElapsedTime(scheduled, estimated, real, status.live);
  const { remainingTime } = useCalculateRemainingTime(scheduled, estimated, real, status.live);

  return (
    <div className="space-y-4">
      <section>
        <div className="text-2xl font-bold">
          {airline.short + " " + identification.number.default}{" "}
          <span
            className={`text-lg ${
              status.icon === "green" ? "text-green-600 dark:text-green-400" : "text-red-400"
            }`}
          >
            {status.text}
          </span>
        </div>
        <span className="text-lg text-green-600 dark:text-green-400">Flight average duration: {flightTimeInHrMin}</span>
      </section>
      <section>
        <div className="flex items-center space-x-4 justify-between">
          <div className="text-3xl font-bold">{origin.code.iata}</div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 space-y-2">
            <div
              className="bg-linear-to-r from-blue-500 via-cyan-500 to-green-400  h-2.5 rounded-full flex justify-end items-center"
              style={{ width: `${flightPercentage}%` }}
            >
              <svg
                className="w-12 h-12 text-green-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m9 5 7 7-7 7"
                />
              </svg>
            </div>
          </div>
          <div className="text-3xl font-bold">{destination.code.iata}</div>
        </div>
        <div className="flex justify-between ">
            <span className="bg-linear-to-br from-blue-500 via-blue-600 to-blue-700 text-white rounded-2xl px-2">{elapsedTime} elapsed</span>
            <span className="text-green-600 dark:text-green-400 font-bold">{flightPercentage}%</span>
            <span className="bg-linear-to-br from-purple-500 via-purple-600 to-purple-700 text-white rounded-2xl px-2">{remainingTime} remaining</span>
          </div>
      </section>
      <section className="grid grid-cols-2 ">
        <FlightDetail
          airport={origin}
          status={status}
          scheduledTime={scheduled.departure || 0}
          realTime={real.departure}
          estimatedTime={estimated.departure}
          type="origin"
        />
        <FlightDetail
          airport={destination}
          status={status}
          scheduledTime={scheduled.arrival || 0}
          realTime={real.arrival}
          estimatedTime={estimated.arrival}
          type="destination"
        />
      </section>
    </div>
  );
}
