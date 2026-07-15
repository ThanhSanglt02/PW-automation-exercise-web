import { softExpect, test } from '../../src/fixtures/appFixtures';
import { ADS_URL, LIST_ITEM_SELECTIONS } from '../../data/constant';
import { loginTestData } from '../../data/testData';

test.describe('View Product Detail', () => {
    test.beforeEach(async ({ homePage, loginPage }) => {
        await homePage.goToLoginPage();
        await loginPage.login(loginTestData.validUser.email, loginTestData.validUser.password);
    });
    test('Test Case 8: Verify All Products and product detail page', async ({ homePage, page, productPage }) => {
        await test.step('Go to Products page through header', async () => {
            await homePage.goToProductsPage();
            await productPage.waitForLoadState();
            softExpect(page.url()).toContain('/products');
        });

        await test.step('Open the first product detail on the product list page', async () => {
            await productPage.viewProduct(LIST_ITEM_SELECTIONS.FIRST);
        });

        await test.step('Verify product detail page is displayed', async () => {
            softExpect(page.url()).toContain('/product_details/1');
        });
    });
});
