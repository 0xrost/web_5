import { useEffect, useState } from 'react';

const STORAGE_KEY = 'systemInfo';

function Footer() {
  const [systemInfo, setSystemInfo] = useState(null);
  const year = new Date().getFullYear();

  useEffect(() => {
    const info = {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      cookieEnabled: navigator.cookieEnabled,
      screen: `${window.screen.width}x${window.screen.height}`,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(info));

    setSystemInfo(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  }, []);

  return (
    <footer>
      <p>&copy; {year} Rostyslav Ivankiv. CV — Lab 4, JavaScript + React.</p>
      <p>
        Contact: <a href="mailto:ol.rostyslaw@gmail.com">ol.rostyslaw@gmail.com</a>
      </p>
      {systemInfo && (
        <div id="system-info">
          <h3>System info (localStorage)</h3>
          <dl id="storage-list">
            {Object.entries(systemInfo).map(([key, value]) => (
              <div key={key} style={{ display: 'contents' }}>
                <dt>{key}</dt>
                <dd>{String(value)}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </footer>
  );
}

export default Footer;
