import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
    private readonly selectors = {
        signupForm: '.signup-form',
        signupNameInput: '[data-qa="signup-name"]',
        signupEmailInput: '[data-qa="signup-email"]',
        signupButton: '[data-qa="signup-button"]',
    } as const;

    readonly signupForm: Locator;
    readonly signupNameInput: Locator;
    readonly signupEmailInput: Locator;
    readonly signupButton: Locator;

    constructor(page: Page) {
        super(page);
        this.signupForm = this.page.locator(this.selectors.signupForm);
        this.signupNameInput = this.signupForm.locator(this.selectors.signupNameInput);
        this.signupEmailInput = this.signupForm.locator(this.selectors.signupEmailInput);
        this.signupButton = this.signupForm.locator(this.selectors.signupButton);
    }

    /**
     * Create a new account via signing up
     * @param signupName - User Name for signup
     * @param signupEmail  - Email for signup
     */
    async signup(signupName: string, signupEmail: string) {
        await this.signupNameInput.fill(signupName);
        await this.signupEmailInput.fill(signupEmail);
        await this.signupButton.click();
    }
}
