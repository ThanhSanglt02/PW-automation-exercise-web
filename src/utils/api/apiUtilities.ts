import { APIRequestContext, APIResponse } from '@playwright/test';
import { getEnvConfig } from '../functional/setup';
import { getRequest } from './apiRequest';

/**
 * Get all products list.
 * @param request Playwright API request context.
 * @returns Promise that resolves to the products list API response.
 */
export async function getAllProductsList(request: APIRequestContext): Promise<APIResponse> {
    return getRequest(request, `${getEnvConfig().url}/api/productsList`);
}
