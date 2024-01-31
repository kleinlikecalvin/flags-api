import "./Header.scss";
/**
 * @NOTE
 * 🚨 need new icon for button and styling (no cursor on hover)
 * 🚨 need dark mode functional
 */
export default function Header() {
  return (
    <header className="Header">
      <p className="site-title">Where in the world?</p>
      <button className="ui-toggle">☾ Dark Mode</button>
    </header>
  );
}
