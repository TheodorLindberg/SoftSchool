import React, { useContext, useState, useEffect, createContext } from 'react';
import { cache } from './api';

export interface TokenControllerHandler {
    make(token: string): void;
    destroy(): void;
}

const TokenContext = createContext<string | null>(null);

const TokenControllerContext = createContext<TokenControllerHandler>({
    make: (token: string) => {
        return;
    },
    destroy: () => {
        return;
    }
});

export function useToken() {
    return useContext(TokenContext);
}

export function useTokenController() {
    return useContext(TokenControllerContext);
}

export default function TokenProvider({ children }: any) {
    const value = `; ${document.cookie}`;
    const parts: string[] = value.split(`; JSESSIONID=`);
    let xsrf: string | undefined = '';
    if (parts && parts.length === 2) xsrf = parts?.pop()?.split(';')?.shift();

    const [token, setToken] = useState<string | null>(xsrf ? xsrf : null);

    useEffect(() => {
        if (xsrf) {
            // Api.get('api/user')
            //     .then((response: any) => {
            //         setUser(response.data.data);
            //     })
            //     .catch((error: any) => {
            //         setUser(null);
            //         document.cookie =
            //             'laravel_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            //         document.cookie =
            //             'XSRF-TOKEN=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            //     });
        }
    }, []);
    function make(token: string) {
        document.cookie = `JSESSIONID=${token}; expires=Thu, 01 Jan 2100 00:00:00 UTC; path=/;`;
        cache.abilities = {};
        cache.courses = {};
        cache.matricies = {};
        setToken(token);
    }

    function destroy() {
        setToken('');
        cache.abilities = {};
        cache.courses = {};
        cache.matricies = {};
        document.cookie =
            'JSESSIONID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }

    return (
        <TokenContext.Provider value={token}>
            <TokenControllerContext.Provider
                value={{ make: make, destroy: destroy }}
            >
                {children}
            </TokenControllerContext.Provider>
        </TokenContext.Provider>
    );
}
