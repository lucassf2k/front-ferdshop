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

  async get<T>(url: string, options?: RequestInit): Promise<T> {
    return await this.fetch<T>(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    });
  }

  async post<T>(url: string, options?: RequestInit): Promise<T> {
    return await this.fetch<T>(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    });
  }

  async put<T>(url: string, options?: RequestInit): Promise<T> {
    return await this.fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    });
  }

  async patch<T>(url: string, options?: RequestInit): Promise<T> {
    return await this.fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    });
  }

  async delete<T>(url: string, options?: RequestInit): Promise<T> {
    return await this.fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    });
  }
}
