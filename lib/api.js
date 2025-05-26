/**
 * Utility functions for making API requests
 */

// Get the authentication token from localStorage
const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

// Base API request function with authentication
async function fetchAPI(endpoint, options = {}) {
  const token = getToken();
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const config = {
    ...options,
    headers
  };
  
  const response = await fetch(`/api/${endpoint}`, config);
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }
  
  return data;
}

// User API functions
export const userAPI = {
  // Get current user profile
  getProfile: () => fetchAPI('auth/me'),
};

// Weeds API functions
export const weedsAPI = {
  // Get all weeds
  getAll: () => fetchAPI('weeds'),
  
  // Get a single weed by ID
  getById: (id) => fetchAPI(`weeds/${id}`),
  
  // Create a new weed
  create: (weedData) => fetchAPI('weeds', {
    method: 'POST',
    body: JSON.stringify(weedData)
  }),
  
  // Update a weed
  update: (id, weedData) => fetchAPI(`weeds/${id}`, {
    method: 'PUT',
    body: JSON.stringify(weedData)
  }),
  
  // Delete a weed
  delete: (id) => fetchAPI(`weeds/${id}`, {
    method: 'DELETE'
  })
};

// Reports API functions
export const reportsAPI = {
  // Get all reports (with optional filters)
  getAll: (filters = {}) => {
    const queryParams = new URLSearchParams();
    
    if (filters.userId) queryParams.append('userId', filters.userId);
    if (filters.weedId) queryParams.append('weedId', filters.weedId);
    if (filters.status) queryParams.append('status', filters.status);
    
    const queryString = queryParams.toString();
    const endpoint = queryString ? `reports?${queryString}` : 'reports';
    
    return fetchAPI(endpoint);
  },
  
  // Get a single report by ID
  getById: (id) => fetchAPI(`reports/${id}`),
  
  // Create a new report
  create: (reportData) => fetchAPI('reports', {
    method: 'POST',
    body: JSON.stringify(reportData)
  }),
  
  // Update a report
  update: (id, reportData) => fetchAPI(`reports/${id}`, {
    method: 'PUT',
    body: JSON.stringify(reportData)
  }),
  
  // Delete a report
  delete: (id) => fetchAPI(`reports/${id}`, {
    method: 'DELETE'
  })
}; 