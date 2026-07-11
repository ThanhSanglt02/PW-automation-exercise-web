import { Locator, Page } from '@playwright/test';
import { String } from 'typescript-string-operations';
import { Title, SignupAccountInformation } from '../../types/types';
import { playwrightActions } from '../../utils/functional/elementAction';
import { BasePage } from '../BasePage';

export class SignupPage extends BasePage {
    private readonly selectors = {
        titleRadio: `input[type="radio"][name="title"][value="{0}"]`,
        passwordInput: '[data-qa="password"]',
        daySelect: '[data-qa="days"]',
        monthSelect: '[data-qa="months"]',
        yearSelect: '[data-qa="years"]',
        newsletterCheckbox: '#newsletter',
        specialOffersCheckbox: '#optin',
        firstNameInput: '[data-qa="first_name"]',
        lastNameInput: '[data-qa="last_name"]',
        companyInput: '[data-qa="company"]',
        addressInput: '[data-qa="address"]',
        address2Input: '[data-qa="address2"]',
        countrySelect: '[data-qa="country"]',
        stateInput: '[data-qa="state"]',
        cityInput: '[data-qa="city"]',
        zipcodeInput: '[data-qa="zipcode"]',
        mobileNumberInput: '[data-qa="mobile_number"]',
        createAccountButton: '[data-qa="create-account"]',
        accountCreatedHeading: '[data-qa="account-created"]',
        continueButton: `//a[@data-qa="continue-button"]`,
    };

    readonly passwordInput: Locator;
    readonly daySelect: Locator;
    readonly monthSelect: Locator;
    readonly yearSelect: Locator;
    readonly newsletterCheckbox: Locator;
    readonly specialOffersCheckbox: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly companyInput: Locator;
    readonly addressInput: Locator;
    readonly address2Input: Locator;
    readonly countrySelect: Locator;
    readonly stateInput: Locator;
    readonly cityInput: Locator;
    readonly zipcodeInput: Locator;
    readonly mobileNumberInput: Locator;
    readonly createAccountButton: Locator;
    readonly accountCreatedHeading: Locator;
    readonly continueButton: Locator;

    constructor(page: Page) {
        super(page);
        this.passwordInput = this.page.locator(this.selectors.passwordInput);
        this.daySelect = this.page.locator(this.selectors.daySelect);
        this.monthSelect = this.page.locator(this.selectors.monthSelect);
        this.yearSelect = this.page.locator(this.selectors.yearSelect);
        this.newsletterCheckbox = this.page.locator(this.selectors.newsletterCheckbox);
        this.specialOffersCheckbox = this.page.locator(this.selectors.specialOffersCheckbox);
        this.firstNameInput = this.page.locator(this.selectors.firstNameInput);
        this.lastNameInput = this.page.locator(this.selectors.lastNameInput);
        this.companyInput = this.page.locator(this.selectors.companyInput);
        this.addressInput = this.page.locator(this.selectors.addressInput);
        this.address2Input = this.page.locator(this.selectors.address2Input);
        this.countrySelect = this.page.locator(this.selectors.countrySelect);
        this.stateInput = this.page.locator(this.selectors.stateInput);
        this.cityInput = this.page.locator(this.selectors.cityInput);
        this.zipcodeInput = this.page.locator(this.selectors.zipcodeInput);
        this.mobileNumberInput = this.page.locator(this.selectors.mobileNumberInput);
        this.createAccountButton = this.page.locator(this.selectors.createAccountButton);
        this.accountCreatedHeading = this.page.locator(this.selectors.accountCreatedHeading);
        this.continueButton = this.page.locator(this.selectors.continueButton);
    }
    /**
     * Gets the title radio button locator by title value.
     *
     * @param title Title value supported by the signup form.
     * @returns Locator for the matching title radio button.
     */
    titleRadio(title: Title): Locator {
        return this.page.locator(String.format(this.selectors.titleRadio, title));
    }

    /**
     * Selects a title on the signup account information form.
     *
     * @param title Title value supported by the signup form.
     * @returns Promise that resolves when the title is selected.
     */
    async selectTitle(title: Title): Promise<void> {
        await playwrightActions.checkElement(this.titleRadio(title), this.page);
    }

    /**
     * Fills the signup account information form.
     *
     * @param accountInformation Account information used for registration.
     * @returns Promise that resolves when all account information fields are filled.
     */
    async fillAccountInformation(accountInformation: SignupAccountInformation): Promise<void> {
        await this.selectTitle(accountInformation.title);
        await playwrightActions.fillElement(this.passwordInput, accountInformation.password);
        await playwrightActions.selectElementOption(this.daySelect, accountInformation.dateOfBirth.day);
        await playwrightActions.selectElementOption(this.monthSelect, accountInformation.dateOfBirth.month);
        await playwrightActions.selectElementOption(this.yearSelect, accountInformation.dateOfBirth.year);
        await this.setNewsletterSubscription(accountInformation.subscribeNewsletter);
        await this.setSpecialOffers(accountInformation.receiveSpecialOffers);
        await playwrightActions.fillElement(this.firstNameInput, accountInformation.firstName);
        await playwrightActions.fillElement(this.lastNameInput, accountInformation.lastName);
        await playwrightActions.fillElement(this.companyInput, accountInformation.company ?? '');
        await playwrightActions.fillElement(this.addressInput, accountInformation.address);
        await playwrightActions.fillElement(this.address2Input, accountInformation.address2 ?? '');
        await playwrightActions.selectElementOption(this.countrySelect, accountInformation.country);
        await playwrightActions.fillElement(this.stateInput, accountInformation.state);
        await playwrightActions.fillElement(this.cityInput, accountInformation.city);
        await playwrightActions.fillElement(this.zipcodeInput, accountInformation.zipcode);
        await playwrightActions.fillElement(this.mobileNumberInput, accountInformation.mobileNumber);
    }

    /**
     * Submits the signup account information form.
     *
     * @returns Promise that resolves when the form submission finishes loading.
     */
    async submitSignUpForm(): Promise<void> {
        await playwrightActions.clickElement(this.createAccountButton);
        await this.waitForLoadState();
    }

    /**
     * Clicks the continue button after account creation when it is visible.
     *
     * @returns Promise that resolves when post-signup navigation and ad handling are completed.
     */
    async clickContinueButton(): Promise<void> {
        let isVisible = await this.page.isVisible(this.selectors.continueButton);
        if (isVisible) {
            await playwrightActions.clickElement(this.continueButton);
        }
        await this.waitForLoadState();
        await this.closeAds();
    }

    /**
     * Checks whether the account created heading is visible after signup submission.
     *
     * @returns True when the account created heading appears on the page.
     */
    async isAccountCreatedHeadingVisible(): Promise<boolean> {
        return this.accountCreatedHeading.isVisible();
    }

    /**
     * Gets the account created heading text after signup submission.
     *
     * @returns The trimmed account created heading text, or an empty string when no text is found.
     */
    async getAccountCreatedHeadingText(): Promise<string> {
        return (await this.accountCreatedHeading.textContent())?.trim() ?? '';
    }

    /**
     * Sets the newsletter subscription checkbox state.
     *
     * @param shouldSubscribe Whether the newsletter checkbox should be checked.
     * @returns Promise that resolves when the checkbox state is updated.
     */
    private async setNewsletterSubscription(shouldSubscribe = false): Promise<void> {
        await playwrightActions.setElementChecked(this.newsletterCheckbox, shouldSubscribe, this.page);
    }

    /**
     * Sets the special offers checkbox state.
     *
     * @param shouldReceiveOffers Whether the special offers checkbox should be checked.
     * @returns Promise that resolves when the checkbox state is updated.
     */
    private async setSpecialOffers(shouldReceiveOffers = false): Promise<void> {
        await playwrightActions.setElementChecked(this.specialOffersCheckbox, shouldReceiveOffers, this.page);
    }
}
