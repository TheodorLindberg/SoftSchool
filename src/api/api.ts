import axios, { AxiosResponse } from 'axios';
import { useState, useEffect } from 'react';
import {
    AbilityHistory,
    AbilityHistoryResponse,
    CourseList,
    Matrix,
    MatrixCommentHistory,
    MatrixCommentHistoryField,
    Message,
    MessageList,
    MessagesResponse
} from './apiDefinitions';
import { useToken } from './TokenProvider';

const JSESSIONID = '043C76C3CE935D01D4949A4F22DB360E';
export const desktop = true;
export const apiBaseUrl = desktop
    ? 'http://192.168.10.228:5000/api'
    : 'http://localhost:5000/api';

export interface cache {
    abilities: any;
    courses: any;
    matricies: any;
    messages: MessageList;
}

(window as any).apiCache = {};

export const cache: cache = (window as any).apiCache;
export function resetCache() {
    cache.abilities = {};
    cache.courses = {};
    cache.matricies = {};
    cache.messages = null as any;
}
resetCache();

export const dev = true;

export async function fetchResource<ResponseType>(
    path: string,
    token: string
): Promise<AxiosResponse<ResponseType>> {
    console.log('fetch: ', path);
    if (dev && token == '') {
        return axios.get(apiBaseUrl + path, {});
    } else {
        return axios.get(apiBaseUrl + path, {
            headers: {
                jsessionid: token
            }
        });
    }
}

type resourceStatus = 'loading' | 'loaded' | 'error';
export interface ApiResourceValue<T> {
    status: resourceStatus;
    data: T | null;
}

export function useResource<Resource>(
    url: string,
    cacheIndex: any
): ApiResourceValue<Resource> {
    const [status, setStatus] = useState<resourceStatus>('loading');
    const [data, setData] = useState<Resource | null>(null);
    const token = useToken();
    useEffect(() => {
        console.log('Fetching');
        if (cacheIndex && cacheIndex.data) {
            setStatus('loaded');
            setData(cacheIndex.data);
        } else if (token || dev) {
            fetchResource<any>(url, token as string)
                .then((response) => {
                    setData(response.data.data);
                    if (cacheIndex) cacheIndex.data = response.data.data;
                    setStatus('loaded');
                })
                .catch((error) => {
                    setStatus('error');
                });
        } else {
            setData(null);
            setStatus('error');
        }
    }, [url, token]);

    return { status, data };
}

export function useCoursesResource(): ApiResourceValue<CourseList> {
    return useResource(`/courses`, cache.courses);
}

export function useMatrixResource(course: number): ApiResourceValue<Matrix> {
    if (!cache.matricies[course]) cache.matricies[course] = {};
    return useResource(`/courses/${course}/matrix`, cache.matricies[course]);
}

export function useAbilityResource(
    ability: number
): ApiResourceValue<AbilityHistory> {
    return useResource(`/abilities/${ability}`, null);
}

export function useCommentHistoryResource(
    ability: number
): ApiResourceValue<MatrixCommentHistory> {
    if (!cache.abilities[ability]) cache.abilities[ability] = {};
    return useResource(`/comments/${ability}`, cache.abilities[ability]);
}

export interface MessageResource extends ApiResourceValue<MessageList> {
    load: (limit: number) => void;
}
export function useMessageResource(): MessageResource {
    const [status, setStatus] = useState<resourceStatus>('loading');
    const [messages, setMessages] = useState<MessageList | null>(null);

    const [loadingNew, setLoadingNew] = useState<boolean>(false);

    const token = useToken();
    useEffect(() => {
        if (cache.messages) {
            setStatus('loaded');
            setMessages(cache.messages);
        } else if (token || dev) {
            fetchResource<any>('/messages', token as string)
                .then((response) => {
                    const data: MessageList = response.data.data;

                    console.log(data);
                    setMessages(data);

                    cache.messages = data;
                    setStatus('loaded');
                })
                .catch((error) => {
                    setStatus('error');
                });
        }
    }, []);

    return {
        status: status,
        data: messages,
        load: (limit: number) => {
            if (loadingNew) return;
            setLoadingNew(true);
            fetchResource<MessagesResponse>(
                `/messages?offset=${messages?.offset || 0}`,
                token as string
            )
                .then((response) => {
                    const newMessages: MessageList = {
                        messages: [
                            ...(messages as MessageList).messages,
                            ...response.data.data.messages
                        ],
                        offset: response.data.data.offset,
                        total: response.data.data.total
                    };
                    setMessages(newMessages);
                    cache.messages = newMessages;
                    setStatus('loaded');
                    setLoadingNew(false);
                })
                .catch((error) => {
                    setStatus('error');
                    setLoadingNew(false);
                });
        }
    };
}
