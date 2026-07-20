import type { GetAddressOutput } from '@/domain/use-case/get-address';
import { formatter } from '@/ui/lib/formatters';
import { useEffect, useState } from 'react';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from 'react-leaflet';

async function getAddress(lat: number, lng: number) {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`,
  );

  const data = await response.json();

  return data;
}

const ClickHandler = ({
  onChange,
}: {
  onChange: (position: [number, number], address: GetAddressOutput) => void;
}) => {
  useMapEvents({
    async click(event) {
      const [lat, lng]: [number, number] = [event.latlng.lat, event.latlng.lng];

      const address = await getAddress(lat, lng);

      console.log(address.address);
      onChange([lat, lng], {
        city: address.address.city,
        country: address.address.country,
        state: address.address.state,
        street: address.address.road,
        houseNumber: address.address.house_number ?? null,
      });
    },
  });
  return null;
};

const Recenter = ({ position }: { position: [number, number] }) => {
  const map = useMap();

  useEffect(() => {
    map.flyTo(position, map.getZoom(), { animate: true });
  }, [map, position]);

  return null;
};

interface Props {
  onChange: (address: {
    lat: number;
    lng: number;
    displayName: string;
    city: string;
    state: string;
    country: string;
    street: string;
    houseNumber: string | null;
  }) => void;
}

export const LeafletMap = ({ onChange }: Props) => {
  const [position, setPosition] = useState<[number, number]>([-5.19, -37.34]);

  return (
    <MapContainer
      center={position}
      zoom={16}
      style={{ height: '300px', width: '100%', zIndex: 0 }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap &copy; CARTO"
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />

      <ClickHandler
        onChange={(position, address) => {
          setPosition(position);
          onChange({
            lat: position[0],
            lng: position[1],
            city: address.city,
            country: address.country,
            state: address.state,
            street: address.street,
            displayName: formatter.formatAddressDisplayName({
              city: address.city,
              state: address.state,
              country: address.country,
              street: address.street,
              houseNumber: address.houseNumber || undefined,
            }),
            houseNumber: address.houseNumber ?? null,
          });
        }}
      />
      <Recenter position={position} />

      <Marker position={position}>
        <Popup>
          Latitude: {position[0].toFixed(6)}
          <br />
          Longitude: {position[1].toFixed(6)}
          <br />
        </Popup>
      </Marker>
    </MapContainer>
  );
};
