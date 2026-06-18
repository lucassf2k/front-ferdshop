import { useState } from 'react';

type GeolocationState = {
  latitude: number | null;
  longitude: number | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: GeolocationState = {
  latitude: null,
  longitude: null,
  isLoading: false,
  error: null,
};

export const useGetGeolocation = () => {
  const [state, setState] = useState<GeolocationState>(initialState);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setState({
        latitude: null,
        longitude: null,
        isLoading: false,
        error: 'Geolocation is not supported by this browser.',
      });
      return;
    }
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          isLoading: false,
          error: null,
        });
      },
      (error) => {
        setState({
          latitude: null,
          longitude: null,
          isLoading: false,
          error: error.message,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000, // 10 seconds
        maximumAge: 0,
      },
    );
  };

  const resetGeolocation = () => {
    setState(initialState);
  };

  return {
    ...state,
    getCurrentLocation,
    resetGeolocation,
  };
};
