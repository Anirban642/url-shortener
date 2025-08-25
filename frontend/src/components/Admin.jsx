import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Admin = () => {
  const [urls, setUrls] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const response = await axios.get('http://localhost:5000/admin');
        setUrls(response.data);
      } catch (err) {
        setError('Error fetching data');
      }
    };
    fetchUrls();
  }, []);

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <h1>Admin Dashboard</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Short Code</th>
            <th>Long URL</th>
            <th>Clicks</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {urls.map(url => (
            <tr key={url._id} style={{ borderBottom: '1px solid #ddd' }}>
              <td>{url.shortCode}</td>
              <td><a href={url.longUrl} target="_blank" rel="noopener noreferrer">{url.longUrl.slice(0, 30)}...</a></td>
              <td>{url.clicks}</td>
              <td>{new Date(url.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;