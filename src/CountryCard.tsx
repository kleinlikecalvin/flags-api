import { Link } from "react-router-dom";
import { Country } from "./api";
import "./CountryCard.scss";

type Props = { country: Country };
/**
 * @NOTE
 * 🚨 the images are all different sizes, need to figure out how to make them uniform
 * 🚨 each card needs an href to redirect to details page
 */
export default function CountryCard({ country }: Props) {
  return (
    <Link className="CountryCard" to={`/${country.alpha3Code}`}>
      <img
        className="flag"
        src={country.flags.svg}
        alt={`${country.name} flag`}
      />
      <div className="details">
        <h3>{country.name}</h3>
        <ul>
          <li>
            <strong>population:</strong> {country.population}
          </li>
          <li>
            <strong>region:</strong> {country.region}
          </li>
          <li>
            <strong>capital:</strong> {country.capital}
          </li>
        </ul>
      </div>
    </Link>
  );
}
