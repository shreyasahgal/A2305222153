import logo from './logo.svg';
import './App.css';

// 1
import React, { useState } from 'react';
// 2
import './App.css';
// 3

function App() {
  // 4
  const initialUrlData = { longUrl: '', validity: '', shortcode: '', error: '', shortUrl: '', expiry: '' };
  // 5
  const [urlInputs, setUrlInputs] = useState(Array(5).fill().map(() => ({ ...initialUrlData })));
  // 6

  const isValidURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleInputChange = (index, field, value) => {
    const updated = [...urlInputs];
    updated[index][field] = value;
    updated[index].error = ''; // Clear error on input
    setUrlInputs(updated);
  };

  const handleShorten = async () => {
    const updated = [...urlInputs];

    for (let i = 0; i < updated.length; i++) {
      const { longUrl, validity, shortcode } = updated[i];

      // Validation
      if (!longUrl) {
        updated[i].error = 'Long URL is required.';
        continue;
      }
      if (!isValidURL(longUrl)) {
        updated[i].error = 'Malformed URL.';
        continue;
      }
      if (validity && (!Number.isInteger(+validity) || +validity <= 0)) {
        updated[i].error = 'Validity must be a positive integer (in minutes).';
        continue;
      }

      // API Call
      try {
        const res = await fetch('http://localhost:5000/api/shorten', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            longUrl,
            validity: validity || 30,
            shortcode: shortcode || undefined,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          updated[i].error = data.error || 'Something went wrong.';
        } else {
          updated[i].shortUrl = data.shortUrl;
          updated[i].expiry = data.expiry;
        }
      } catch (err) {
        updated[i].error = 'Server error.';
      }
    }

    setUrlInputs(updated);
  };

  return (
    <div className="App">
      <h1>TinyURL Shortener</h1>

      <div className="url-form-grid">
        {urlInputs.map((input, idx) => (
          <div key={idx} className="url-form-row">
            <input
              className="url-input"
              type="text"
              placeholder="Enter long URL"
              value={input.longUrl}
              onChange={(e) => handleInputChange(idx, 'longUrl', e.target.value)}
            />
            <input
              className="validity-input"
              type="number"
              placeholder="Validity (mins)"
              value={input.validity}
              onChange={(e) => handleInputChange(idx, 'validity', e.target.value)}
            />
            <input
              className="shortcode-input"
              type="text"
              placeholder="Custom shortcode (optional)"
              value={input.shortcode}
              onChange={(e) => handleInputChange(idx, 'shortcode', e.target.value)}
            />
            {input.error && <div className="error-message">{input.error}</div>}
          </div>
        ))}
      </div>

      <button className="shorten-button" onClick={handleShorten}>Shorten All URLs</button>

      <div className="result-section">
        {urlInputs.map((input, idx) =>
          input.shortUrl ? (
            <div key={idx} className="result-card">
              <div><strong>Original URL:</strong> {input.longUrl}</div>
              <div className="result-short-url">
                <strong>Shortened:</strong> <a href={input.shortUrl} target="_blank" rel="noreferrer">{input.shortUrl}</a>
              </div>
              <div className="result-expiry"><strong>Expires:</strong> {input.expiry}</div>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}

export default App;
