import React, { useEffect, useState } from 'react';
import './App.css'; // Reuse existing styles

function StatisticsPage() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');
  const [shortcode, setShortcode] = useState('');

  const fetchStats = async () => {
    if (!shortcode.trim()) {
      setError('Please enter a shortcode.');
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/stats/${shortcode}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch statistics.');
      }

      setStats(data);
      setError('');
    } catch (err) {
      setStats(null);
      setError(err.message);
    }
  };

  return (
    <div className="App">
      <h1>URL Statistics</h1>

      <input
        className="url-input"
        type="text"
        placeholder="Enter shortcode (e.g. abc123)"
        value={shortcode}
        onChange={(e) => setShortcode(e.target.value)}
      />
      <button className="shorten-button" onClick={fetchStats}>Fetch Stats</button>

      {error && <p className="error-message">{error}</p>}

      {stats && (
        <div className="result-section">
          <div className="result-card">
            <p><strong>Short URL:</strong> {stats.shortUrl}</p>
            <p><strong>Created At:</strong> {new Date(stats.createdAt).toLocaleString()}</p>
            <p><strong>Expires At:</strong> {new Date(stats.expiry).toLocaleString()}</p>
            <p><strong>Total Clicks:</strong> {stats.clicks.length}</p>
            <hr />
            <h3>Click Details:</h3>
            <ul>
              {stats.clicks.map((click, idx) => (
                <li key={idx}>
                  <strong>Time:</strong> {new Date(click.timestamp).toLocaleString()} | 
                  <strong> Source:</strong> {click.source || 'Unknown'} | 
                  <strong> Location:</strong> {click.location || 'Unknown'}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default StatisticsPage;import React, { useEffect, useState } from 'react';
import './App.css'; // Reuse existing styles

function StatisticsPage() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');
  const [shortcode, setShortcode] = useState('');

  const fetchStats = async () => {
    if (!shortcode.trim()) {
      setError('Please enter a shortcode.');
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/stats/${shortcode}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch statistics.');
      }

      setStats(data);
      setError('');
    } catch (err) {
      setStats(null);
      setError(err.message);
    }
  };

  return (
    <div className="App">
      <h1>URL Statistics</h1>

      <input
        className="url-input"
        type="text"
        placeholder="Enter shortcode (e.g. abc123)"
        value={shortcode}
        onChange={(e) => setShortcode(e.target.value)}
      />
      <button className="shorten-button" onClick={fetchStats}>Fetch Stats</button>

      {error && <p className="error-message">{error}</p>}

      {stats && (
        <div className="result-section">
          <div className="result-card">
            <p><strong>Short URL:</strong> {stats.shortUrl}</p>
            <p><strong>Created At:</strong> {new Date(stats.createdAt).toLocaleString()}</p>
            <p><strong>Expires At:</strong> {new Date(stats.expiry).toLocaleString()}</p>
            <p><strong>Total Clicks:</strong> {stats.clicks.length}</p>
            <hr />
            <h3>Click Details:</h3>
            <ul>
              {stats.clicks.map((click, idx) => (
                <li key={idx}>
                  <strong>Time:</strong> {new Date(click.timestamp).toLocaleString()} | 
                  <strong> Source:</strong> {click.source || 'Unknown'} | 
                  <strong> Location:</strong> {click.location || 'Unknown'}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default StatisticsPage;
