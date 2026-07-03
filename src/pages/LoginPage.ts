import { Locator, Page } from '@playwright/test';
import { playwrightActions } from '../utils/functional/elementAction';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
    private readonly selectors = {
        signupForm: '.signup-form',
        signupFormHeading: 'h2',
        signupNameInput: '[data-qa="signup-name"]',
        signupEmailInput: '[data-qa="signup-email"]',
        signupButton: '[data-qa="signup-button"]',
    };

    readonly signupForm: Locator;
    readonly signupFormHeading: Locator;
    readonly signupNameInput: Locator;
    readonly signupEmailInput: Locator;
    readonly signupButton: Locator;

    constructor(page: Page) {
        super(page);
        this.signupForm = this.page.locator(this.selectors.signupForm);
        this.signupFormHeading = this.signupForm.locator(this.selectors.signupFormHeading);
        this.signupNameInput = this.signupForm.locator(this.selectors.signupNameInput);
        this.signupEmailInput = this.signupForm.locator(this.selectors.signupEmailInput);
        this.signupButton = this.signupForm.locator(this.selectors.signupButton);
    }

    /**
     * Checks whether the signup form heading is visible.
     *
     * @returns True when the signup form heading appears on the page.
     */
    async isSignupFormHeadingVisible() {
        return this.signupFormHeading.isVisible();
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
     * Create a new account via signing up
     * @param signupName - User Name for signup
     * @param signupEmail  - Email for signup
     */
    async signup(signupName: string, signupEmail: string) {
        await playwrightActions.fillElement(this.signupNameInput, signupName, this.page);
        await playwrightActions.fillElement(this.signupEmailInput, signupEmail, this.page);
        await playwrightActions.clickElement(this.signupButton, { page: this.page });
        await this.waitForLoadState();
    }
}
