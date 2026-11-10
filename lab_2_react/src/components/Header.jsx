function Header({ theme, onToggleTheme }) {
  return (
    <header>
      <button
        id="theme-toggle"
        type="button"
        aria-pressed={theme === 'dark'}
        onClick={onToggleTheme}
      >
        {theme === 'dark' ? '☀️ Day mode' : '🌙 Night mode'}
      </button>
      <h1>Rostyslav Ivankiv</h1>
      <p>Backend Developer (AI / RAG)</p>
      <ul>
        <li>Email: <a href="mailto:ol.rostyslaw@gmail.com">ol.rostyslaw@gmail.com</a></li>
        <li>Location: Lviv, Ukraine</li>
        <li>Phone: +380686894116</li>
      </ul>
    </header>
  );
}

export default Header;
