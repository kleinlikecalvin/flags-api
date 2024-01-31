import { useParams } from "react-router";
import { useGetCountryByCode } from "./api";
import { Link } from "react-router-dom";

export default function CountryDetailPage() {
  let { alpha3Code } = useParams();
  const country = useGetCountryByCode(alpha3Code || "");
  return (
    <section className="CountryDetailPage">
      <div className="back-button">
        <Link to="/">← Back</Link>
      </div>
      <div className="country-container">
        <img src={country?.flags.svg} alt={`${country?.name} flag`} />
        <div className="details">
          <h1>{country?.name}</h1>
          <ul>
            <li>native name: {country?.nativeName}</li>
            <li>population: {country?.population}</li>
            <li>region: {country?.region}</li>
            <li>sub region: {country?.subregion}</li>
            <li>capital: {country?.capital}</li>
            <li>top level domain: {country?.topLevelDomain}</li>
            <li>
              currencies:{" "}
              {country?.currencies
                .map((currencyObj) => currencyObj.name)
                .join(", ")}
            </li>
            <li>
              languages:{" "}
              {country?.languages
                .map((languageObj) => languageObj.name)
                .join(", ")}
            </li>
          </ul>
          <div className="border-countries">
            <p>border countries: </p>
            {country?.borders ? (
              country.borders.map((alpha3Code) => {
                return <BorderCountryLink alpha3Code={alpha3Code} />;
              })
            ) : (
              <span>There are no bordering countries.</span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function BorderCountryLink({ alpha3Code }: { alpha3Code: string }) {
  // look up the alpha3code
  // get the name off of that object
  // create a link with the name and alpha3code as the path
  const country = useGetCountryByCode(alpha3Code);
  return <Link to={`/${alpha3Code}`}>{country?.name || alpha3Code}</Link>;
}
