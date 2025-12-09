import { useState } from "react";
import { getFlights } from "../APIs/flightradar";
import { IFlight } from "../types/IFlightList";

export const useAutocomplete = (API: any) => {
  const [requestTrigger, setRequestTrigger] = useState(null as any);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([] as IFlight[]);

  const handleChangeInput = (e : any) => {

    if(e.target.value === "" || e.target.value.length < 3) {
      clearTimeout(requestTrigger);
      setResults([]);
      return;
    }

    if (query === e.target.value) {
      console.log("No hay cambios");
      clearTimeout(requestTrigger);
      return;
    }

    if (requestTrigger) clearTimeout(requestTrigger);

    setRequestTrigger(
      setTimeout(async () => {
        console.log("Aqui hay que disparar");
        //let res = await API(e.target.value);
        /*res = res.map((item) => {
          const { id, title } = item;
          return {
            id,
            title
          };
        });*/
        setQuery(e.target.value);
        const {results} = await getFlights(e.target.value);
        const flightList = results.filter((f: IFlight) => f.type === "live" || f.type === "schedule");
        setResults(flightList);
        setRequestTrigger(null);
      }, 500)
    );
  };

  return {
    handleChangeInput,
    results,
    setResults
  };
};
