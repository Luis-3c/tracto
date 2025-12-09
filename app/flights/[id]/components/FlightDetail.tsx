import { IAirport, IStatus } from "../types/IFlightDetail";
import useDateTimeValues from "../hooks/useDateTimeValues";
import { useMilisecToHrMin } from "../hooks/useMilisecToMin";
import { useCalculateDelay } from "../hooks/useCalculateDelay";

interface Props {
  airport: IAirport;
  status: IStatus;
  scheduledTime: number;
  realTime: number | null;
  estimatedTime: number | null;
  type: string;
}
export default function FlightDetail({
  airport,
  status,
  scheduledTime,
  realTime,
  estimatedTime,
  type,
}: Props) {
  const { formattedDate, formattedDateAbbr, formattedTime } = useDateTimeValues(
    scheduledTime,
    realTime,
    estimatedTime,
    airport.timezone.name,
    status,
    type
  );
  const { delay } = useCalculateDelay(
    scheduledTime,
    estimatedTime || 0,
    realTime || 0
  );
  const [delayInHrMin] = useMilisecToHrMin(delay.value || 0);

  return (
    <div
      className={`flex flex-col text-sm ${
        type === "origin"
          ? "border-r border-gray-400 pr-3 sm:pr-6"
          : "pl-3 sm:pl-6"
      }`}
    >
      <span className="text-lg">{airport.position.region.city}</span>
      <span className="line-clamp-1" title={airport.name}>
        {airport.name}
      </span>
      <span className="text-xl mt-2 font-semibold hidden sm:block">
        {formattedDate}
      </span>
      <span className="text-[16px] mt-2 font-bold sm:font-semibold sm:hidden">
        {formattedDateAbbr}
      </span>
      <div className="sm:flex sm:items-center">
        <div className="text-lg sm:text-2xl font-bold sm:font-semibold">
          {formattedTime} {airport.timezone.abbr}
        </div>
        {delay.value ? (
          <span
            className={`font-bold sm:ml-2 ${
              delay.value < 0
                ? "text-green-600 dark:text-green-400"
                : "text-red-400"
            }`}
          >
            ({delayInHrMin} {delay.text})
          </span>
        ) : (
          <span>&nbsp;</span>
        )}
      </div>
      <div className="flex justify-between">
        <div>
          Terminal:{" "}
          <span className="text-xl font-semibold">{airport.info.terminal}</span>
        </div>
        <div>
          Gate:{" "}
          <span className="text-xl font-semibold">{airport.info.gate}</span>
        </div>
      </div>
    </div>
  );
}
