import { softExpect, test } from '../../src/fixtures/appFixtures';
import { ApiSteps } from '../../src/utils/api/apiUtilities';

test.describe('Product API', () => {
    test('API 1: Get All Products List', async ({ request }) => {
        await test.step('Verify all products list is returned', async () => {
            const response = await ApiSteps.getAllProductsList(request);
            const data = await response.json();
            softExpect(response.status()).toBe(200);
            softExpect(Array.isArray(data.products)).toBeTruthy();
            softExpect(data.products.length).toBeGreaterThan(0);
        });
    });
});
