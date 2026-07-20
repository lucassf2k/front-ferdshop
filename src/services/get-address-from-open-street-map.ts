import type { OpenStreetMapModel } from '@/domain/model/open-street-map';
import { type AppError } from '@/domain/shared/api-error';
import { result } from '@/domain/shared/result';
import type { GetAddress } from '@/domain/use-case/get-address';

export const getAddressFromOpenStreetMapService: GetAddress = async ({
  latitude,
  longitude,
}) => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
  );
  if (!response.ok) {
    return result.err({
      type: 'ApiError',
      code: 'ERROR_MAP_SERVICE',
      message: 'error in map service',
    } satisfies AppError);
  }
  const data: OpenStreetMapModel = await response.json();
  const address = data.address;
  if (!address.city || !address.state || !address.country || !address.road) {
    return result.err({
      type: 'ApiError',
      code: 'ERROR_MAP_SERVICE',
      message: 'error in map service',
    } satisfies AppError);
  }
  return result.ok({
    city: address.city,
    state: address.state,
    country: address.country,
    street: address.road,
    houseNumber: address.house_number ?? null,
  });
};
