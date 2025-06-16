import api from './api';

export const getContainers = async () => {
  try {
    const response = await api.get('/containers');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getContainersByType = async (type) => {
  try {
    const response = await api.get(`/containers/type/${type}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getContainersByAddress = async (address) => {
  try {
    const response = await api.get(`/containers/address/${address}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getContainersWithFilters = async (type = null, address = null) => {
  try {
    const response = await api.get('/containers/filter', {
      params: {
        type: type || undefined,
        address: address || undefined
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getSensorDataForContainer = async (containerId) => {
  try {
    const response = await api.get(`/containers/${containerId}/sensor-data`);
    return response.data ? [response.data] : [];
  } catch (error) {
    throw error.response?.data || error.message;
  }
};