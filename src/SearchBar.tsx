import "./SearchBar.scss";
/**
 * @NOTE
 * 🚨 need new icon for search
 */

export default function SearchBar({
  name,
  setName,
}: {
  name: string;
  setName: (name: string) => void;
}) {
  return (
    <input
      className="SearchBar"
      type="text"
      placeholder="Search for a country..."
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
  );
}
