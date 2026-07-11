import { Locator, Page } from '@playwright/test';
import { playwrightActions } from '../../utils/functional/elementAction';
import { HomePage } from '../HomePage';

export class LoginPage extends HomePage {
    readonly signupFormHeadingSelector = '.signup-form h2';
    readonly signupNameInputSelector = '.signup-form [data-qa="signup-name"]';
    readonly signupEmailInputSelector = '.signup-form [data-qa="signup-email"]';
    readonly signupButtonSelector = '.signup-form [data-qa="signup-button"]';
    readonly loginFormHeadingSelector = '.login-form h2';
    readonly loginEmailInputSelector = '.login-form [data-qa="login-email"]';
    readonly loginPasswordInputSelector = '.login-form [data-qa="login-password"]';
    readonly loginButtonSelector = '.login-form [data-qa="login-button"]';
    readonly loginErrorMessageSelector = '.login-form p';

    readonly signupFormHeading: Locator;
    readonly signupNameInput: Locator;
    readonly signupEmailInput: Locator;
    readonly signupButton: Locator;
    readonly loginFormHeading: Locator;
    readonly loginEmailInput: Locator;
    readonly loginPasswordInput: Locator;
    readonly loginButton: Locator;
    readonly loginErrorMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.signupFormHeading = this.page.locator(this.signupFormHeadingSelector);
        this.signupNameInput = this.page.locator(this.signupNameInputSelector);
        this.signupEmailInput = this.page.locator(this.signupEmailInputSelector);
        this.signupButton = this.page.locator(this.signupButtonSelector);
        this.loginFormHeading = this.page.locator(this.loginFormHeadingSelector);
        this.loginEmailInput = this.page.locator(this.loginEmailInputSelector);
        this.loginPasswordInput = this.page.locator(this.loginPasswordInputSelector);
        this.loginButton = this.page.locator(this.loginButtonSelector);
        this.loginErrorMessage = this.page.locator(this.loginErrorMessageSelector);
    }

    /**
     * Checks whether the signup form heading is visible.
     *
     * @returns True when the signup form heading appears on the page.
     */
    async isSignupFormHeadingVisible(): Promise<boolean> {
        return this.signupFormHeading.isVisible();
    }

    /**
     * Checks whether the login form heading is visible.
     *
     * @returns True when the login form heading appears on the page.
     */
    async isLoginFormHeadingVisible(): Promise<boolean> {
        return this.loginFormHeading.isVisible();
    }

    /**
     * Gets the signup form heading text.
     *
     * @returns The trimmed heading text, or an empty string when no text is found.
     */
    async getSignupFormHeadingText(): Promise<string> {
        return (await this.signupFormHeading.textContent())?.trim() ?? '';
    }

    /**
     * Gets the login form heading text.
     *
     * @returns The trimmed login heading text, or an empty string when no text is found.
     */
    async getLoginFormHeadingText(): Promise<string> {
        return (await this.loginFormHeading.textContent())?.trim() ?? '';
    }

    async getErrorMessageLogin(): Promise<string> {
        return await playwrightActions.getElementText(this.loginErrorMessage);
    }
    /**
     * Starts signup by submitting the initial username and email fields.
     *
     * @param signupName Username used for signup.
     * @param signupEmail Email address used for signup.
     * @returns Promise that resolves when the signup form is submitted.
     */
    async signup(signupName: string, signupEmail: string): Promise<void> {
        await playwrightActions.fillElement(this.signupNameInput, signupName);
        await playwrightActions.fillElement(this.signupEmailInput, signupEmail);
        await playwrightActions.clickElement(this.signupButton);
        await this.waitForLoadState();
    }

    /**
     * Logs in with the provided email and password.
     *
     * @param email Email address used for login.
     * @param password Password used for login.
     * @returns Promise that resolves when the login form is submitted.
     */
    async login(email: string, password: string): Promise<void> {
        await playwrightActions.fillElement(this.loginEmailInput, email);
        await playwrightActions.fillElement(this.loginPasswordInput, password);
        await playwrightActions.clickElement(this.loginButton);
        await this.waitForLoadState();
        await this.waitForPageRender();
    }
}
