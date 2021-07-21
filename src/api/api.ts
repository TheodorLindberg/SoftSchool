import * as def from './apiDefinitions';
import axios, { AxiosResponse } from 'axios';

(window as any).data = {};

const JSESSIONID = 'B4B52FD4D9E0EF69E6C56E834316C41A';
const baseUrl = 'http://localhost:3000/api';

export async function fetchResource<ResponseType>(
    path: string
): Promise<AxiosResponse<ResponseType>> {
    return axios.get(baseUrl + path, {
        headers: {
            jsessionid: JSESSIONID
        }
    });
}
