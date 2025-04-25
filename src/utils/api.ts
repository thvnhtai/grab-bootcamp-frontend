import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { objectToQueryString } from './common';

export class ApiService {
  static defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json'
  };

  public readonly apiUrl: string;

  constructor(host: string) {
    this.apiUrl = `${host}/api/v1`;
  }

  static getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  static async request<T = unknown>(
    url: string,
    options: AxiosRequestConfig
  ): Promise<T> {
    const token = ApiService.getToken();
    const headersWithToken: Record<string, string> = {
      ...ApiService.defaultHeaders,
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    };

    try {
      const response: AxiosResponse<T> = await axios({
        url,
        ...options,
        headers: {
          ...headersWithToken,
          ...(options.headers || {})
        }
      });
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      throw axiosError.response ?? error;
    }
  }

  async get<T = unknown>(
    url: string,
    {
      query = {},
      ...options
    }: AxiosRequestConfig & {
      query?: Record<string, string | number | boolean>;
    } = {}
  ): Promise<T> {
    const fullUrl = url.startsWith('http')
      ? url
      : `${this.apiUrl}/${url}${objectToQueryString(query)}`;

    return ApiService.request<T>(fullUrl, {
      method: 'GET',
      ...options
    });
  }

  async post<T = unknown, D = Record<string, unknown>>(
    url: string,
    data: D = {} as D,
    options: AxiosRequestConfig = {}
  ): Promise<T> {
    const fullUrl = url.startsWith('http') ? url : `${this.apiUrl}/${url}`;
    return ApiService.request<T>(fullUrl, {
      method: 'POST',
      data,
      ...options
    });
  }

  async put<T = unknown, D = Record<string, unknown>>(
    url: string,
    data: D = {} as D,
    options: AxiosRequestConfig = {}
  ): Promise<T> {
    const fullUrl = url.startsWith('http') ? url : `${this.apiUrl}/${url}`;
    return ApiService.request<T>(fullUrl, {
      method: 'PUT',
      data,
      ...options
    });
  }

  async patch<T = unknown, D = Record<string, unknown>>(
    url: string,
    data: D = {} as D,
    options: AxiosRequestConfig = {}
  ): Promise<T> {
    const fullUrl = url.startsWith('http') ? url : `${this.apiUrl}/${url}`;
    return ApiService.request<T>(fullUrl, {
      method: 'PATCH',
      data,
      ...options
    });
  }

  async delete<T = unknown>(
    url: string,
    options: AxiosRequestConfig = {}
  ): Promise<T> {
    const fullUrl = url.startsWith('http') ? url : `${this.apiUrl}/${url}`;
    return ApiService.request<T>(fullUrl, {
      method: 'DELETE',
      ...options
    });
  }
}
