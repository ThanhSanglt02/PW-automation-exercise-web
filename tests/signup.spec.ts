import { test } from '@playwright/test';
import { VALID_SIGNUP_ACCOUNT_INFORMATION } from '../data/testData';
import { LandingPage } from '../src/pages/LandingPage';
import { LoginPage } from '../src/pages/LoginPage';
import { SignupPage } from '../src/pages/SignupPage';
import { fakerAccountInfomation } from '../src/utils/functional/faker';

const accountFaker = fakerAccountInfomation();
let landingPage: LandingPage;
let loginPage: LoginPage;
let signupPage: SignupPage;

test.beforeEach(async ({ page }) => {
    landingPage = new LandingPage(page);
    loginPage = new LoginPage(page);
    signupPage = new SignupPage(page);
});
test('Sign up', async () => {
    await test.step('Go to Singup page through header', async () => {
        await landingPage.goToAutomationHomePage();
        await landingPage.header.goToLoginPage();
        await loginPage.signup(accountFaker.username, accountFaker.email);
    });

    await test.step('Fill signup account information', async () => {
        await signupPage.fillAccountInformation({
            ...VALID_SIGNUP_ACCOUNT_INFORMATION,
            password: accountFaker.password,
        });
    });
});
