export class BaseFetch {
  readonly baseUrl: string;

  constructor(baseUrl = '') {
    this.baseUrl = baseUrl;
  }

  async fetch<T>(url: string, options?: RequestInit): Promise<T> {
    const fullUrl = new URL(url, this.baseUrl).toString();
    const response = await fetch(fullUrl, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json() as Promise<T>;
  }
}
