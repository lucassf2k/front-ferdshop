export type OpenStreetMapModel = {
  place_id: number;
  licence: string;
  osm_type: 'way' | 'node' | 'relation';
  osm_id: number;
  lat: string;
  lon: string;

  category: string;
  type: string;
  place_rank: number;
  importance: number;

  addresstype: string;
  name: string;
  display_name: string;

  boundingbox: [string, string, string, string];

  address: {
    road?: string;
    residential?: string;
    suburb?: string;
    city_district?: string;
    city?: string;
    town?: string;
    village?: string;
    state?: string;
    region?: string;
    postcode?: string;
    country?: string;
    country_code?: string;
    'ISO3166-2-lvl4'?: string;

    // Permite outros campos que podem vir dependendo do endereço
    [key: string]: string | undefined;
  };
};
