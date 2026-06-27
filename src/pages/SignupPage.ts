import { Locator, Page } from '@playwright/test';
import { Title, SignupAccountInformation } from '../../data/types';
import { BasePage } from './BasePage';
import { String } from 'typescript-string-operations';

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
    }

    titleRadio(title: Title): Locator {
        return this.page.locator(String.format(this.selectors.titleRadio, title));
    }

    async selectTitle(title: Title) {
        await this.titleRadio(title).check();
    }

    async fillAccountInformation(accountInformation: SignupAccountInformation) {
        await this.selectTitle(accountInformation.title);
        await this.passwordInput.fill(accountInformation.password);
        await this.daySelect.selectOption(accountInformation.dateOfBirth.day);
        await this.monthSelect.selectOption(accountInformation.dateOfBirth.month);
        await this.yearSelect.selectOption(accountInformation.dateOfBirth.year);
        await this.setNewsletterSubscription(accountInformation.subscribeNewsletter);
        await this.setSpecialOffers(accountInformation.receiveSpecialOffers);
        await this.firstNameInput.fill(accountInformation.firstName);
        await this.lastNameInput.fill(accountInformation.lastName);
        await this.companyInput.fill(accountInformation.company ?? '');
        await this.addressInput.fill(accountInformation.address);
        await this.address2Input.fill(accountInformation.address2 ?? '');
        await this.countrySelect.selectOption(accountInformation.country);
        await this.stateInput.fill(accountInformation.state);
        await this.cityInput.fill(accountInformation.city);
        await this.zipcodeInput.fill(accountInformation.zipcode);
        await this.mobileNumberInput.fill(accountInformation.mobileNumber);
    }

    async submitSignUpForm() {
        await this.createAccountButton.click();
        await this.waitForLoadState();
    }

    /**
     * Checks whether the account created heading is visible after signup submission.
     *
     * @returns True when the account created heading appears on the page.
     */
    async isAccountCreatedHeadingVisible() {
        return this.accountCreatedHeading.isVisible();
    }

    /**
     * Gets the account created heading text after signup submission.
     *
     * @returns The trimmed account created heading text, or an empty string when no text is found.
     */
    async getAccountCreatedHeadingText() {
        return (await this.accountCreatedHeading.textContent())?.trim() ?? '';
    }

    private async setNewsletterSubscription(shouldSubscribe = false) {
        await this.newsletterCheckbox.setChecked(shouldSubscribe);
    }

    private async setSpecialOffers(shouldReceiveOffers = false) {
        await this.specialOffersCheckbox.setChecked(shouldReceiveOffers);
    }
}
