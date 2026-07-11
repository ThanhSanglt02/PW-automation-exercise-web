import { test as base, expect } from '@playwright/test';
import { WEB_URLS } from '../../data/constant';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/login/LoginPage';
import { SignupPage } from '../pages/login/SignupPage';
import ProductPage from '../pages/product/ProductPage';

type AppFixtures = {
    homePage: HomePage;
    loginPage: LoginPage;
    productPage: ProductPage;
    signupPage: SignupPage;
};

export const softExpect = expect.configure({ soft: true });

export const test = base.extend<AppFixtures>({
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await page.goto(WEB_URLS.HOME_PAGE);
        await homePage.waitForLoadState();
        await use(homePage);
    },

    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    productPage: async ({ page }, use) => {
        await use(new ProductPage(page));
    },

    signupPage: async ({ page }, use) => {
        await use(new SignupPage(page));
    },
});
