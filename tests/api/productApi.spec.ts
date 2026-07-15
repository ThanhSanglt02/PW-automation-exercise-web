import { softExpect, test } from '../../src/fixtures/appFixtures';
import { ProductsListResponse } from '../../src/types/apiType';
import { getAllProductsList } from '../../src/utils/api/apiUtilities';

test.describe('Product API', () => {
    test('API 1: Get All Products List', async ({ request }) => {
        const response = await test.step('Send request to get all products list', async () => {
            const response = await getAllProductsList(request);

            softExpect(response.status()).toBe(200);
            return response;
        });

        const responseBody = await test.step('Read products list response body', async () => {
            return response.json() as Promise<ProductsListResponse>;
        });

        await test.step('Verify all products list is returned', async () => {
            softExpect(responseBody.responseCode).toBe(200);
            softExpect(Array.isArray(responseBody.products)).toBeTruthy();
            softExpect(responseBody.products.length).toBeGreaterThan(0);
        });
    });
});
