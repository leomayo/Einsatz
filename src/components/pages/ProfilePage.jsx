import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeftIcon } from '@heroicons/react/20/solid';
import { MapContainer, TileLayer, Circle, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Header from '../Header';
import WorkTypesList from '../profile/WorkTypesList';
import useStore from '../../store/useStore';

const ProfilePage = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const profiles = useStore(state => state.profiles);
  
  // Debug logging
  console.log('Debug:', {
    profileId: id,
    profiles: profiles,
  });

  // Simplified profile lookup - don't try to convert ID types
  const profile = profiles.find(p => p.id === (typeof profiles[0]?.id === 'number' ? Number(id) : id));

  // Add state for postal code and radius
  const [postalCode, setPostalCode] = useState(profile?.postalCode || '');
  const CIRCLE_DIAMETER_PX = 200; // Fixed circle size in pixels
  const mapRef = useRef(null);
  const [center, setCenter] = useState([52.3676, 4.9041]);
  const [radius, setRadius] = useState(5);
  const [zoom, setZoom] = useState(11);

  // Function to get coordinates from postal code
  const getCoordinatesFromPostalCode = async (postalCode) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?postalcode=${postalCode}&country=NL&format=json`
      );
      const data = await response.json();
      if (data && data[0]) {
        return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
      }
      return null;
    } catch (error) {
      console.error('Error getting coordinates:', error);
      return null;
    }
  };

  // Calculate zoom level to maintain fixed circle size
  const calculateZoomLevel = (radiusInKm) => {
    // Calculate the zoom level where our radius in km will appear as CIRCLE_DIAMETER_PX/2 pixels
    const EARTH_CIRCUMFERENCE = 40075.017; // km at equator
    const pixelsPerKm = CIRCLE_DIAMETER_PX / (radiusInKm * 2);
    const zoomLevel = Math.log2(pixelsPerKm * EARTH_CIRCUMFERENCE / 256);
    return Math.floor(zoomLevel - 0.2);
  };

  // Keep map height consistent
  const mapHeight = "300px";

  // Update map when postal code changes
  useEffect(() => {
    const updateMapCenter = async () => {
      if (postalCode.length >= 6) {
        const coordinates = await getCoordinatesFromPostalCode(postalCode);
        if (coordinates) {
          setCenter(coordinates);
          const newZoom = calculateZoomLevel(radius);
          setZoom(newZoom);
        }
      }
    };
    updateMapCenter();
  }, [postalCode]);

  // Update zoom when radius changes
  useEffect(() => {
    const newZoom = calculateZoomLevel(radius);
    setZoom(newZoom);
  }, [radius]);

  // Map component
  const MapComponent = () => {
    const map = useRef();
    
    useEffect(() => {
      if (map.current) {
        mapRef.current = map.current;
        map.current.setView(center, zoom, { animate: true });
      }
    }, [center, zoom]);

    return (
      <MapContainer 
        center={center}
        zoom={zoom}
        ref={map}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <FixedCircle center={center} />
      </MapContainer>
    );
  };

  // Fixed-size circle component
  const FixedCircle = ({ center }) => {
    const map = useMap();
    const pixelRadius = CIRCLE_DIAMETER_PX / 2;
    
    // Convert pixel radius to meters at current zoom level and latitude
    const metersPerPixel = 40075016.686 * Math.abs(Math.cos(center[0] * Math.PI/180)) / Math.pow(2, map.getZoom() + 8);
    const radiusInMeters = pixelRadius * metersPerPixel;

    return (
      <Circle
        center={center}
        radius={radiusInMeters}
        pathOptions={{ 
          color: 'blue', 
          fillColor: 'blue', 
          fillOpacity: 0.2,
          weight: 2
        }}
      />
    );
  };

  // Wait for translations to be loaded
  if (!i18n.isInitialized) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show loading state or error if profile not found
  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            {t('profilePage.backToOverview')}
          </button>
          <div className="text-center mt-8">
            <p className="text-gray-600">{t('profilePage.notFound')}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          {t('profilePage.backToOverview')}
        </button>
      </div>

      {/* Top Section Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="grid grid-cols-4 gap-6">
          {/* Profile Picture */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="aspect-square rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-4xl text-gray-500">
                {profile.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
          </div>

          {/* Work Area Map */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium mb-4">{t('profilePage.workArea')}</h3>
            
            {/* Postal Code and Radius Inputs */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t('profilePage.postalCode')}
                </label>
                <input
                  type="text"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value.toUpperCase())}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="1234 AB"
                  maxLength="7"
                />
              </div>
              <div>
                <div className="flex justify-between items-center">
                  <label className="block text-sm font-medium text-gray-700 flex items-center justify-between">
                    <span>{t('profilePage.radius')}</span>
                    <span className="text-gray-500 text-sm">(km)</span>
                  </label>
                </div>
                <input
                  type="text"
                  value={radius}
                  onChange={(e) => {
                    const newValue = Math.max(1, Math.min(50, Number(e.target.value) || 1));
                    setRadius(newValue);
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  maxLength="2"
                />
              </div>
            </div>

            {/* Map */}
            <div className="rounded-lg overflow-hidden" style={{ height: mapHeight }}>
              <MapComponent />
            </div>
          </div>

          {/* Availability Calendar */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium mb-4">{t('profilePage.availability')}</h3>
            {/* TODO: Add calendar component */}
          </div>

          {/* Portfolio Slider */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium mb-4">{t('profilePage.portfolio')}</h3>
            {/* TODO: Add image slider component */}
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 gap-6">
          {/* Work Types Section */}
          <div className="col-span-2 bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-medium mb-6">{t('profilePage.workTypes')}</h2>
            <WorkTypesList key={profile.id} workPreferences={profile.workPreferences} />
          </div>

          {/* About Me Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-medium mb-6">{t('profilePage.aboutMe')}</h2>
            <p className="text-gray-600">{profile.aboutMe}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 