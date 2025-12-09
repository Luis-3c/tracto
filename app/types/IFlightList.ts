export interface IFlightList {
  results: IFlight[];
}

export interface IFlight {
  id: string;
  label: string;
  detail: {
    logo: string;
    callsign: string;
    flight: string;
    operator: string;
    operator_id: number;
    lat?: number;
    lon?: number;
    schd_from?: string;
    schd_to?: string;
    ac_type?: string;
    route?: string;
    reg?: string;
  };
  type: string;
  match: string;
}
