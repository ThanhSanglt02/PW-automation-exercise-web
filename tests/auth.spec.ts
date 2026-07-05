import { softExpect, test } from '../src/fixtures/appFixtures';
import { validSignupTestData, loginTestData } from '../data/testData';
import { ERROR_MESSAGE } from '../data/constant';

const signupTestData = validSignupTestData({
    subscribeNewsletter: true,
    receiveSpecialOffers: false,
});

test.describe('Sign up & Login @signup', () => {
    test('Test Case 1: Register User', async ({ homePage, loginPage, signupPage }) => {
        await test.step('Go to Signup page through header', async () => {
            await homePage.header.goToLoginPage();
            softExpect(await loginPage.isSignupFormHeadingVisible()).toBeTruthy();
            softExpect(await loginPage.getSignupFormHeadingText()).toBe('New User Signup!');
        });

        await test.step('Enter username and email before entering detail information', async () => {
            await loginPage.signup(signupTestData.credential.username, signupTestData.credential.email);
        });

        await test.step('Fill signup account information', async () => {
            await signupPage.fillAccountInformation(signupTestData.accountInformation);
            await signupPage.submitSignUpForm();
        });

        await test.step("Verify that 'Account Created!' is visible", async () => {
            softExpect(await signupPage.isAccountCreatedHeadingVisible()).toBeTruthy();
            softExpect(await signupPage.getAccountCreatedHeadingText()).toBe('Account Created!');
        });

        await test.step(` Verify that 'Logged in as ${signupTestData.credential.username}' is visible`, async () => {
            await signupPage.clickContinueButton();
            softExpect(await loginPage.header.getUserNameLogged()).toContain(signupTestData.credential.username);
        });
    });
});

test.describe('Login @login', () => {
    test('Test Case 2: Login User with correct email and password', async ({ homePage, loginPage, signupPage }) => {
        await test.step('Go to Login page through header', async () => {
            await homePage.header.goToLoginPage();
            softExpect(await loginPage.isLoginFormHeadingVisible()).toBeTruthy();
            softExpect(await loginPage.getLoginFormHeadingText()).toBe('Login to your account');
        });

        await test.step('Enter correct email address and password', async () => {
            await loginPage.login(loginTestData.validUser.email, loginTestData.validUser.password);
        });

        await test.step(` Verify that 'Logged in as ${loginTestData.validUser.username}' is visible`, async () => {
            await signupPage.clickContinueButton();
            softExpect(await loginPage.header.getUserNameLogged()).toContain(loginTestData.validUser.username);
        });
    });

    test('Test Case 3: Login User with incorrect email and password', async ({ homePage, loginPage, signupPage }) => {
        await test.step('Go to Login page through header', async () => {
            await homePage.header.goToLoginPage();
            softExpect(await loginPage.isLoginFormHeadingVisible()).toBeTruthy();
            softExpect(await loginPage.getLoginFormHeadingText()).toBe('Login to your account');
        });

        await test.step('Enter incorrect email address and password', async () => {
            await loginPage.login(loginTestData.invalidUser.email, loginTestData.invalidUser.password);
        });

        await test.step(` Verify that 'Logged in as ${ERROR_MESSAGE.INVALID_LOGIN_FORM}' is visible`, async () => {
            softExpect(await loginPage.getErrorMessageLogin()).toEqual(ERROR_MESSAGE.INVALID_LOGIN_FORM);
        });
    });
});
