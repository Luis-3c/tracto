export interface IFlightDetail {
    identification: IIdentification,
    status: IStatus,
    airline: IAirline,
    airport: {
        origin: IAirport,
        destination: IAirport,
        real: null
    },
    time: {
        scheduled: ITime,
        real: ITime,
        estimated: ITime,
        historical: IHistorical,
        other: IOther
    }
    trail: ITrail[],
}

export interface ITrail {
    lat: number,
    lng: number,
    alt: number,
    spd: number,
    ts: number,
    hd: number
}

export interface IPosition {
    latitude: number,
    longitude: number,
    altitude: number,
    region: {
        city: string
    }
}

export interface IIdentification {
    id: string,
    row: number,
    number: {
        default: string,
        alternative: null
    },
    callsign: string
}

export interface IStatus {
    live: boolean,
    text: string,
    icon: string,
    estimated: null,
    ambiguous: boolean,
    generic: {
        status: {
            text: string,
            color: string,
            type: string
        },
        eventTime: {
            utc: number,
            local: number
        }
    }

}

export interface IAirline {
  name: string,
  short: string,
  code: {
    iata: string,
    icao: string
  },
  url: string
}

export interface IAirport {
    name: string,
    code: {
        iata: string,
        icao: string
    },
    position: IPosition,
    timezone: {
        name: string,
        offset: number,
        offsetHours: string,
        abbr: string,
        abbrName: string,
        isDst: boolean
    },
    visible: boolean,
    website: string,
    info: {
        terminal: string,
        baggage: null,
        gate: string
    }
}

export interface ITime {
    departure: number | null,
    arrival: number | null
}

export interface IHistorical {
    flighttime: string,
    delay: string
}

export interface IOther {
    eta: number,
    updated: number
}
