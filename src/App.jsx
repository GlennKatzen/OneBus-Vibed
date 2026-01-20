import React, { useState, useEffect } from 'react';
import { fetchStopsAndPOIs } from './services/api';
import Map from './components/Map';
import LocationButton from './components/LocationButton';
import './styles/App.css';

const AUSTIN_CENTER = { lat: 30.2672, lng: -97.7431 };
const DEFAULT_ZOOM = 13;

function App() {
  const [userLocation, setUserLocation] = useState(null);
  const [stops, setStops] = useState([]);
  const [pois, setPois] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mapCenter, setMapCenter] = useState(AUSTIN_CENTER);
  const [mapZoom, setMapZoom] = useState(DEFAULT_ZOOM);

  // Fetch stops and POIs when location is available
  useEffect(() => {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/d740929f-4fac-44d8-8d3a-248f11b38b2a',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'App.jsx:20',message:'useEffect triggered for userLocation',data:{userLocation,lat:userLocation?.lat,lng:userLocation?.lng,hasLocation:!!userLocation},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
    if (userLocation) {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/d740929f-4fac-44d8-8d3a-248f11b38b2a',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'App.jsx:23',message:'Calling loadStopsAndPOIs from useEffect',data:{lat:userLocation.lat,lng:userLocation.lng},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'A'})}).catch(()=>{});
      // #endregion
      loadStopsAndPOIs(userLocation.lat, userLocation.lng);
    }
  }, [userLocation]);

  const loadStopsAndPOIs = async (lat, lng) => {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/d740929f-4fac-44d8-8d3a-248f11b38b2a',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'App.jsx:26',message:'loadStopsAndPOIs called',data:{lat,lng,currentUserLocation:userLocation},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
    setLoading(true);
    setError(null);
    
    // Clear existing markers before loading new data
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/d740929f-4fac-44d8-8d3a-248f11b38b2a',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'App.jsx:32',message:'Clearing markers',data:{stopsCount:stops.length,poisCount:pois.length},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
    setStops([]);
    setPois([]);
    
    try {
      const data = await fetchStopsAndPOIs(lat, lng);
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/d740929f-4fac-44d8-8d3a-248f11b38b2a',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'App.jsx:37',message:'API response received',data:{stopsCount:data.stops?.length,poisCount:data.pois?.length},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'A'})}).catch(()=>{});
      // #endregion
      setStops(data.stops);
      setPois(data.pois);
      
      // Don't update userLocation here - it causes infinite loop with useEffect
      // userLocation is only updated from getCurrentLocation or handleLocationUpdate
      
      // Center map on selected location
      setMapCenter({ lat, lng });
      setMapZoom(15);
    } catch (err) {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/d740929f-4fac-44d8-8d3a-248f11b38b2a',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'App.jsx:48',message:'Error in loadStopsAndPOIs',data:{error:err.message},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'A'})}).catch(()=>{});
      // #endregion
      setError(err.message || 'Failed to load stops and POIs');
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/d740929f-4fac-44d8-8d3a-248f11b38b2a',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'App.jsx:52',message:'loadStopsAndPOIs completed',data:{lat,lng},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'A'})}).catch(()=>{});
      // #endregion
    }
  };

  // Handle location update from map right-click
  const handleLocationUpdate = (lat, lng) => {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/d740929f-4fac-44d8-8d3a-248f11b38b2a',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'App.jsx:56',message:'handleLocationUpdate called (from right-click)',data:{lat,lng},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'C'})}).catch(()=>{});
    // #endregion
    // Update userLocation first, which will trigger useEffect to call loadStopsAndPOIs
    setUserLocation({ lat, lng });
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/d740929f-4fac-44d8-8d3a-248f11b38b2a',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'App.jsx:72',message:'getCurrentLocation success - setting userLocation',data:{lat:location.lat,lng:location.lng},timestamp:Date.now(),sessionId:'debug-session',runId:'initial',hypothesisId:'D'})}).catch(()=>{});
        // #endregion
        setUserLocation(location);
        setLoading(false);
      },
      (err) => {
        setError(`Error getting location: ${err.message}`);
        setLoading(false);
        // Fallback to Austin center if geolocation fails
        setMapCenter(AUSTIN_CENTER);
        setMapZoom(DEFAULT_ZOOM);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  // Try to get location on mount
  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <div className="app-container">
      <div className="header">
        <h1>OneBus - Bus Stops & POIs</h1>
        <div className="controls">
          <LocationButton 
            onClick={getCurrentLocation} 
            loading={loading}
            disabled={loading}
          />
          {userLocation && (
            <div className="location-info">
              Location: {userLocation.lat.toFixed(6)}, {userLocation.lng.toFixed(6)}
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="error-banner">
          {error}
        </div>
      )}

      {loading && !userLocation && (
        <div className="loading-banner">
          Getting your location...
        </div>
      )}

      <div className="map-container">
        <Map 
          stops={stops}
          pois={pois}
          center={mapCenter}
          zoom={mapZoom}
          onLocationUpdate={handleLocationUpdate}
        />
      </div>

      <div className="footer">
        <div className="stats">
          {stops.length > 0 && <span>{stops.length} Bus Stop{stops.length !== 1 ? 's' : ''}</span>}
          {pois.length > 0 && <span>{pois.length} POI{pois.length !== 1 ? 's' : ''}</span>}
        </div>
      </div>
    </div>
  );
}

export default App;
