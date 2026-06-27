import { softExpect, test } from '../src/fixtures/appFixtures';
import { validSignupTestData } from '../data/testData';

const signupTestData = validSignupTestData();

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
});
