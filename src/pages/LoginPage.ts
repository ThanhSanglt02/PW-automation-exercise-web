import { Locator, Page } from '@playwright/test';
import { playwrightActions } from '../utils/functional/elementAction';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
    private readonly selectors = {
        signupFormHeading: '.signup-form h2',
        signupNameInput: '.signup-form [data-qa="signup-name"]',
        signupEmailInput: '.signup-form [data-qa="signup-email"]',
        signupButton: '.signup-form [data-qa="signup-button"]',
        loginFormHeading: '.login-form h2',
        loginEmailInput: '.login-form [data-qa="login-email"]',
        loginPasswordInput: '.login-form [data-qa="login-password"]',
        loginButton: '.login-form [data-qa="login-button"]',
    };

    readonly signupFormHeading: Locator;
    readonly signupNameInput: Locator;
    readonly signupEmailInput: Locator;
    readonly signupButton: Locator;
    readonly loginFormHeading: Locator;
    readonly loginEmailInput: Locator;
    readonly loginPasswordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        super(page);
        this.signupFormHeading = this.page.locator(this.selectors.signupFormHeading);
        this.signupNameInput = this.page.locator(this.selectors.signupNameInput);
        this.signupEmailInput = this.page.locator(this.selectors.signupEmailInput);
        this.signupButton = this.page.locator(this.selectors.signupButton);
        this.loginFormHeading = this.page.locator(this.selectors.loginFormHeading);
        this.loginEmailInput = this.page.locator(this.selectors.loginEmailInput);
        this.loginPasswordInput = this.page.locator(this.selectors.loginPasswordInput);
        this.loginButton = this.page.locator(this.selectors.loginButton);
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
    }
}
