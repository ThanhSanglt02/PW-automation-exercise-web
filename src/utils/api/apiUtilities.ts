import { APIRequestContext, APIResponse } from '@playwright/test';
import { getEnvConfig } from '../functional/setup';
import { getRequest } from './apiRequest';
class ApiUtils {
    /**
     * Get all products list.
     * @param request Playwright API request context.
     * @returns Promise that resolves to the products list API response.
     */
    async getAllProductsList(request: APIRequestContext): Promise<APIResponse> {
        const endpoint = `${getEnvConfig().url}/api/productsList`;
        const description = `Get all products`;
        const response = await getRequest(request, endpoint, description);
        return response;
    }
}
export const ApiSteps = new ApiUtils();
