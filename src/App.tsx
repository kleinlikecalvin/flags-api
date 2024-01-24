import { useState } from "react";
import { useGetCountryList } from "./api";
import CountryCard from "./CountryCard";
import Header from "./Header";
import SearchBar from "./SearchBar";
import RegionDropdown from "./RegionDropdown";
import "./App.scss";

function App() {
  const [region, setRegion] = useState("");
  const [name, setName] = useState("");
  const countries = useGetCountryList({ region: region, name: name });
  const isFiltering = name !== "" || region !== "";
  const hasNoResults = countries.length === 0 && isFiltering;

  return (
    <div className="App">
      <Header />
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

export default App;
