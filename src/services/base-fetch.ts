import type { AppError } from '@/domain/shared/api-error';
import { result, type Result } from '@/domain/shared/result';

export class BaseFetch {
  readonly baseUrl: string;

  constructor(baseUrl = '') {
    this.baseUrl = baseUrl;
  }

  private buildUrl(url: string): string {
    return new URL(url, this.baseUrl).toString();
  }

  private async safeParseJson<T>(response: Response): Promise<T | null> {
    try {
      return (await response.json()) as T;
    } catch {
      return null;
    }
  }

  private mapHttpError(body: any): AppError {
    if (body?.error?.code) {
      return {
        type: 'ApiError',
        code: body.error.code,
        message: body.error.message,
      };
    }

    return { type: 'UnknownError' };
  }

  async fetch<T>(
    url: string,
    options?: RequestInit,
  ): Promise<Result<AppError, T>> {
    const fullUrl = this.buildUrl(url);

    try {
      const response = await fetch(fullUrl, options);
      const data = await this.safeParseJson<T>(response);
      if (!response.ok) {
        return result.err(this.mapHttpError(data));
      }
      return result.ok(data as T);
    } catch (err) {
      return result.err({ type: 'NetworkError' });
    }
  }

  async get<T>(
    url: string,
    options?: RequestInit,
  ): Promise<Result<AppError, T>> {
    return await this.fetch<T>(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    });
  }

  async post<T>(
    url: string,
    options?: RequestInit,
  ): Promise<Result<AppError, T>> {
    return await this.fetch<T>(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    });
  }

  async put<T>(
    url: string,
    options?: RequestInit,
  ): Promise<Result<AppError, T>> {
    return await this.fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    });
  }

  async patch<T>(
    url: string,
    options?: RequestInit,
  ): Promise<Result<AppError, T>> {
    return await this.fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    });
  }

  async delete<T>(
    url: string,
    options?: RequestInit,
  ): Promise<Result<AppError, T>> {
    return await this.fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    });
  }
}
