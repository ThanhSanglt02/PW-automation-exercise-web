import { APIRequestContext, APIResponse } from '@playwright/test';
import { logger } from '../functional/logger';
import { ApiRequestOptions } from '../../types/apiType';

/**
 * Send a GET API request.
 * @param request Playwright API request context.
 * @param url API URL.
 * @param options Optional request configuration.
 * @returns Promise that resolves to the API response.
 */
export async function getRequest(
    request: APIRequestContext,
    url: string,
    options?: ApiRequestOptions,
): Promise<APIResponse> {
    logger('Sending GET API request', { url, options });

    try {
        const response = await request.get(url, options);

        logger('Received GET API response', {
            url,
            status: response.status(),
            ok: response.ok(),
        });

        return response;
    } catch (error) {
        logger('GET API request failed', {
            url,
            error: error instanceof Error ? error.message : String(error),
        });

        throw error;
    }
}

/**
 * Send a POST API request.
 * @param request Playwright API request context.
 * @param url API URL.
 * @param options Optional request configuration.
 * @returns Promise that resolves to the API response.
 */
export async function postRequest(
    request: APIRequestContext,
    url: string,
    options?: ApiRequestOptions,
): Promise<APIResponse> {
    logger('Sending POST API request', { url, options });

    try {
        const response = await request.post(url, options);

        logger('Received POST API response', {
            url,
            status: response.status(),
            ok: response.ok(),
        });

        return response;
    } catch (error) {
        logger('POST API request failed', {
            url,
            error: error instanceof Error ? error.message : String(error),
        });

        throw error;
    }
}

/**
 * Send a PUT API request.
 * @param request Playwright API request context.
 * @param url API URL.
 * @param options Optional request configuration.
 * @returns Promise that resolves to the API response.
 */
export async function putRequest(
    request: APIRequestContext,
    url: string,
    options?: ApiRequestOptions,
): Promise<APIResponse> {
    logger('Sending PUT API request', { url, options });

    try {
        const response = await request.put(url, options);

        logger('Received PUT API response', {
            url,
            status: response.status(),
            ok: response.ok(),
        });

        return response;
    } catch (error) {
        logger('PUT API request failed', {
            url,
            error: error instanceof Error ? error.message : String(error),
        });

        throw error;
    }
}

/**
 * Send a PATCH API request.
 * @param request Playwright API request context.
 * @param url API URL.
 * @param options Optional request configuration.
 * @returns Promise that resolves to the API response.
 */
export async function patchRequest(
    request: APIRequestContext,
    url: string,
    options?: ApiRequestOptions,
): Promise<APIResponse> {
    logger('Sending PATCH API request', { url, options });

    try {
        const response = await request.patch(url, options);

        logger('Received PATCH API response', {
            url,
            status: response.status(),
            ok: response.ok(),
        });

        return response;
    } catch (error) {
        logger('PATCH API request failed', {
            url,
            error: error instanceof Error ? error.message : String(error),
        });

        throw error;
    }
}

/**
 * Send a DELETE API request.
 * @param request Playwright API request context.
 * @param url API URL.
 * @param options Optional request configuration.
 * @returns Promise that resolves to the API response.
 */
export async function deleteRequest(
    request: APIRequestContext,
    url: string,
    options?: ApiRequestOptions,
): Promise<APIResponse> {
    logger('Sending DELETE API request', { url, options });

    try {
        const response = await request.delete(url, options);

        logger('Received DELETE API response', {
            url,
            status: response.status(),
            ok: response.ok(),
        });

        return response;
    } catch (error) {
        logger('DELETE API request failed', {
            url,
            error: error instanceof Error ? error.message : String(error),
        });

        throw error;
    }
}
