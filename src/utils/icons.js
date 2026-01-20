/**
 * Maps amenity_category values to appropriate icon URLs
 * Uses Google Maps default icons where possible, with fallbacks
 */

// Google Maps icon base URL for custom icons
// We'll use Material Icons or emoji as fallback
const ICON_BASE = 'https://maps.google.com/mapfiles/ms/icons/';

/**
 * Get icon URL for a bus stop
 * @param {boolean} isOriginStop - Whether this is an origin stop (origin_stop=true)
 * @returns {Object} Icon configuration object
 */
export function getBusStopIcon(isOriginStop = false) {
  // Green icon for origin stops, red for regular stops
  const iconUrl = isOriginStop 
    ? 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
    : 'https://maps.google.com/mapfiles/ms/icons/red-dot.png';
  
  return {
    url: iconUrl,
    scaledSize: { width: 32, height: 32 },
  };
}

/**
 * Get icon URL for a POI based on its amenity_category
 * @param {string} amenityCategory - The amenity category from the POI
 * @returns {Object} Icon configuration object
 */
export function getPOIIcon(amenityCategory) {
  if (!amenityCategory) {
    return {
      url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
      scaledSize: { width: 32, height: 32 },
    };
  }

  // Normalize category: lowercase, trim, replace spaces/underscores with single space
  const category = amenityCategory
    .toLowerCase()
    .trim()
    .replace(/[_\s]+/g, ' ');

  // Map categories to appropriate icons
  // Handles variations like "Food Services", "food services", "food_services", etc.
  const iconMap = {
    // Food-related categories
    'restaurant': {
      url: 'https://maps.google.com/mapfiles/ms/icons/restaurant.png',
      scaledSize: { width: 32, height: 32 },
    },
    'food services': {
      url: 'https://maps.google.com/mapfiles/ms/icons/restaurant.png',
      scaledSize: { width: 32, height: 32 },
    },
    'foodservice': {
      url: 'https://maps.google.com/mapfiles/ms/icons/restaurant.png',
      scaledSize: { width: 32, height: 32 },
    },
    'dining': {
      url: 'https://maps.google.com/mapfiles/ms/icons/restaurant.png',
      scaledSize: { width: 32, height: 32 },
    },
    'cafe': {
      url: 'https://maps.google.com/mapfiles/ms/icons/cafe.png',
      scaledSize: { width: 32, height: 32 },
    },
    'coffee': {
      url: 'https://maps.google.com/mapfiles/ms/icons/cafe.png',
      scaledSize: { width: 32, height: 32 },
    },
    'coffee shop': {
      url: 'https://maps.google.com/mapfiles/ms/icons/cafe.png',
      scaledSize: { width: 32, height: 32 },
    },
    // Shopping categories
    'shop': {
      url: 'https://maps.google.com/mapfiles/ms/icons/shopping.png',
      scaledSize: { width: 32, height: 32 },
    },
    'shopping': {
      url: 'https://maps.google.com/mapfiles/ms/icons/shopping.png',
      scaledSize: { width: 32, height: 32 },
    },
    'retail': {
      url: 'https://maps.google.com/mapfiles/ms/icons/shopping.png',
      scaledSize: { width: 32, height: 32 },
    },
    'commercial': {
      url: 'https://maps.google.com/mapfiles/ms/icons/shopping.png',
      scaledSize: { width: 32, height: 32 },
    },
    // Lodging categories
    'hotel': {
      url: 'https://maps.google.com/mapfiles/ms/icons/lodging.png',
      scaledSize: { width: 32, height: 32 },
    },
    'lodging': {
      url: 'https://maps.google.com/mapfiles/ms/icons/lodging.png',
      scaledSize: { width: 32, height: 32 },
    },
    'accommodation': {
      url: 'https://maps.google.com/mapfiles/ms/icons/lodging.png',
      scaledSize: { width: 32, height: 32 },
    },
    // Gas/Transportation
    'gas': {
      url: 'https://maps.google.com/mapfiles/ms/icons/gas.png',
      scaledSize: { width: 32, height: 32 },
    },
    'gas station': {
      url: 'https://maps.google.com/mapfiles/ms/icons/gas.png',
      scaledSize: { width: 32, height: 32 },
    },
    'gas_station': {
      url: 'https://maps.google.com/mapfiles/ms/icons/gas.png',
      scaledSize: { width: 32, height: 32 },
    },
    'fuel': {
      url: 'https://maps.google.com/mapfiles/ms/icons/gas.png',
      scaledSize: { width: 32, height: 32 },
    },
    // Parks
    'park': {
      url: 'https://maps.google.com/mapfiles/ms/icons/parks.png',
      scaledSize: { width: 32, height: 32 },
    },
    'parks': {
      url: 'https://maps.google.com/mapfiles/ms/icons/parks.png',
      scaledSize: { width: 32, height: 32 },
    },
    // Recreation - movies/theater icon (film strip)
    'recreation': {
      url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent('<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="4" width="18" height="16" rx="2" fill="#FF6C00"/><circle cx="7" cy="8" r="1.5" fill="white"/><circle cx="7" cy="16" r="1.5" fill="white"/><circle cx="17" cy="8" r="1.5" fill="white"/><circle cx="17" cy="16" r="1.5" fill="white"/><rect x="9" y="6" width="6" height="12" fill="white"/></svg>'),
      scaledSize: { width: 32, height: 32 },
    },
    'parking': {
      url: 'https://maps.google.com/mapfiles/ms/icons/parking.png',
      scaledSize: { width: 32, height: 32 },
    },
    // Healthcare
    'hospital': {
      url: 'https://maps.google.com/mapfiles/ms/icons/hospitals.png',
      scaledSize: { width: 32, height: 32 },
    },
    'healthcare': {
      url: 'https://maps.google.com/mapfiles/ms/icons/hospitals.png',
      scaledSize: { width: 32, height: 32 },
    },
    'pharmacy': {
      url: 'https://maps.google.com/mapfiles/ms/icons/pharmacy.png',
      scaledSize: { width: 32, height: 32 },
    },
    // Financial
    'bank': {
      url: 'https://maps.google.com/mapfiles/ms/icons/bank.png',
      scaledSize: { width: 32, height: 32 },
    },
    'atm': {
      url: 'https://maps.google.com/mapfiles/ms/icons/bank.png',
      scaledSize: { width: 32, height: 32 },
    },
    'financial': {
      url: 'https://maps.google.com/mapfiles/ms/icons/bank.png',
      scaledSize: { width: 32, height: 32 },
    },
    // Community Services - people/community icon (group of people)
    'community services': {
      url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent('<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="9" cy="7" r="4" fill="#4285F4"/><path d="M9 13C6.24 13 4 15.24 4 18V20H14V18C14 15.24 11.76 13 9 13Z" fill="#4285F4"/><circle cx="15" cy="7" r="3" fill="#4285F4"/><path d="M15 12C13.34 12 12 13.34 12 15V17H18V15C18 13.34 16.66 12 15 12Z" fill="#4285F4"/><circle cx="5" cy="7" r="3" fill="#4285F4"/><path d="M5 12C3.34 12 2 13.34 2 15V17H8V15C8 13.34 6.66 12 5 12Z" fill="#4285F4"/></svg>'),
      scaledSize: { width: 32, height: 32 },
    },
    'community': {
      url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent('<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="9" cy="7" r="4" fill="#4285F4"/><path d="M9 13C6.24 13 4 15.24 4 18V20H14V18C14 15.24 11.76 13 9 13Z" fill="#4285F4"/><circle cx="15" cy="7" r="3" fill="#4285F4"/><path d="M15 12C13.34 12 12 13.34 12 15V17H18V15C18 13.34 16.66 12 15 12Z" fill="#4285F4"/><circle cx="5" cy="7" r="3" fill="#4285F4"/><path d="M5 12C3.34 12 2 13.34 2 15V17H8V15C8 13.34 6.66 12 5 12Z" fill="#4285F4"/></svg>'),
      scaledSize: { width: 32, height: 32 },
    },
  };

  // Return mapped icon or default POI icon
  return iconMap[category] || {
    url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
    scaledSize: { width: 32, height: 32 },
  };
}
