import { useState, useEffect, useRef } from "react";

export type CountryFilters = { region?: string; name?: string };

export function useGetCountryList(filters?: CountryFilters): Country[] {
  const [response, setResponse] = useState<Country[]>([]);
  const abort = useRef(new AbortController());

  useEffect(() => {
    const url = new URL("/api/countries", window.location.origin);

    if (filters?.name) url.searchParams.set("name", filters.name);
    if (filters?.region) url.searchParams.set("region", filters.region);

    fetch(url, { signal: abort.current.signal })
      .then(async (res) => {
        const countries = (await res.json()) as Country[];
        setResponse(countries);
      })
      .catch(console.error);

    return () => {
      abort.current.abort();
      abort.current = new AbortController();
    };
  }, [filters?.name, filters?.region]);

  return response;
}

export function useGetCountryByCode(code: string): Country | undefined {
  const [response, setResponse] = useState<Country>();

  useEffect(() => {
    fetch(`/api/countries/${code}`).then(async (res) => {
      const countries = (await res.json()) as Country;
      setResponse(countries);
    });
  }, [code]);

  return response;
}

export type Country = {
  name: string;
  topLevelDomain: string[];
  alpha2Code: string;
  alpha3Code: string;
  callingCodes: string[];
  capital: string;
  altSpellings: string[];
  subregion: string;
  region: string;
  population: number;
  latlng: [number, number];
  demonym: string;
  area: number;
  timezones: string[];
  borders: string[];
  nativeName: string;
  numericCode: string;
  flags: {
    svg: string;
    png: string;
  };
  currencies: [
    {
      code: string;
      name: string;
      symbol: string;
    }
  ];
  languages: {
    iso639_1: string;
    iso639_2: string;
    name: string;
    nativeName: string;
  }[];
  translations: {
    br: string;
    pt: string;
    nl: string;
    hr: string;
    fa: string;
    de: string;
    es: string;
    fr: string;
    ja: string;
    it: string;
    hu: string;
  };
  flag: string;
  regionalBlocs: [
    {
      acronym: string;
      name: string;
    }
  ];
  cioc: string;
  independent: boolean;
};
