import React, { useState } from 'react';
import axios from 'axios';

const UrlShortener = () => {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setShortUrl('');

    try {
      const response = await axios.post('http://localhost:5000/api/shorten', { longUrl });
      setShortUrl(response.data.shortUrl);
    } catch (err) {
      setError('Error shortening URL');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <h1>URL Shortener</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="url"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          placeholder="Enter long URL"
          required
          style={{ width: '100%', padding: '10px', marginBottom: '10px',borderRadius:"10px" }}
        />
        <button type="submit" style={{ width: '50%', padding: '10px',cursor:'pointer',borderRadius:"20px" }}>Shorten</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {shortUrl && (
        <div>
          <p>Shortened URL:</p>
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a>
        </div>
      )}
    </div>
  );
};

export default UrlShortener;