import axios, {
  AxiosInstance,
  AxiosResponse,
  Method,
  InternalAxiosRequestConfig,
  AxiosPromise,
  AxiosRequestConfig
} from 'axios';

export type HttpPromise<T = any> = AxiosPromise<T>;

export class HttpClient {
  private httpClient: AxiosInstance;

  constructor() {
    this.httpClient = axios.create({
      baseURL: process.env.API_URL as string,
      timeout: 60000,
    });
    this.httpClient.interceptors.request.use(this.handleRequestUse);
    this.httpClient.interceptors.response.use(this.handleResponseUse);
  }

  private async handleRequest<T>(
    url: string,
    method: Method,
    config: AxiosRequestConfig = {},
  ): Promise<AxiosResponse<T>> {
    const { headers, data, params } = config;
    let c: { method: Method, url: string } & AxiosRequestConfig;
    c = { url, method, data, params };
    if (headers) {
      c.headers = headers;
    }
    const response = await this.httpClient.request(c);
    return response;
  }

  private handleRequestUse(config: InternalAxiosRequestConfig) {
    // handle request interceptor logic here
    return config;
  }

  private handleResponseUse(config: AxiosResponse) {
    // handle response interceptor logic here
    return config;
  }

  public get<T>(url: string, config: AxiosRequestConfig = {}): AxiosPromise<T> {
    return this.handleRequest<T>(url, 'get', config);
  }

  public post<T>(url: string, config: AxiosRequestConfig = {}): AxiosPromise<T> {
    return this.handleRequest<T>(url, 'post', config);
  }

  public put<T>(url: string, config: AxiosRequestConfig = {}): AxiosPromise<T> {
    return this.handleRequest<T>(url, 'put', config);
  }

  public delete<T>(url: string, config: AxiosRequestConfig = {}): AxiosPromise<T> {
    return this.handleRequest<T>(url, 'delete', config);
  }

  public patch<T>(url: string, config: AxiosRequestConfig = {}): AxiosPromise<T> {
    return this.handleRequest<T>(url, 'patch', config);
  }

}

const httpClient = new HttpClient();

export { httpClient };
