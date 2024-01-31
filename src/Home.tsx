import { useState } from "react";
import { useGetCountryList } from "./api";
import SearchBar from "./SearchBar";
import RegionDropdown from "./RegionDropdown";
import CountryCard from "./CountryCard";

export default function Home() {
  const [region, setRegion] = useState("");
  const [name, setName] = useState("");
  const countries = useGetCountryList({ region: region, name: name });
  const isFiltering = name !== "" || region !== "";
  const hasNoResults = countries.length === 0 && isFiltering;

  return (
    <div className="Home">
      <div className="search-filter-container">
        <SearchBar name={name} setName={setName} />
        <RegionDropdown region={region} setRegion={setRegion} />
      </div>
      {hasNoResults ? (
        <p>
          There were no matches for "{name}" and "{region}".
        </p>
      ) : (
        <section className="countries-container">
          {countries?.map((country) => {
            return <CountryCard country={country} />;
          })}
        </section>
      )}
    </div>
  );
}
