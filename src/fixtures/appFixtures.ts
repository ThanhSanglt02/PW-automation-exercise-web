import { test as base, expect } from '@playwright/test';
import { WEB_URLS } from '../../data/constant';
import { LandingPage } from '../pages/LandingPage';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage } from '../pages/SignupPage';

type AppFixtures = {
    landingPage: LandingPage;
    loginPage: LoginPage;
    signupPage: SignupPage;
    homePage: LandingPage;
};

export const softExpect = expect.configure({ soft: true });

export const test = base.extend<AppFixtures>({
    landingPage: async ({ page }, use) => {
        await use(new LandingPage(page));
    },

    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    signupPage: async ({ page }, use) => {
        await use(new SignupPage(page));
    },

    homePage: async ({ page, landingPage }, use) => {
        await page.goto(WEB_URLS.HOME_PAGE);
        await landingPage.waitForLoadState();
        await use(landingPage);
    },
});
