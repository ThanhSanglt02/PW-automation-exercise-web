import { Locator, Page } from '@playwright/test';
import { String } from 'typescript-string-operations';
import { Title, SignupAccountInformation } from '../types/types';
import { playwrightActions } from '../utils/functional/elementAction';
import { BasePage } from './BasePage';

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
    titleRadio(title: Title): Locator {
        return this.page.locator(String.format(this.selectors.titleRadio, title));
    }

    async selectTitle(title: Title) {
        await playwrightActions.checkElement(this.titleRadio(title), this.page);
    }

    async fillAccountInformation(accountInformation: SignupAccountInformation) {
        await this.selectTitle(accountInformation.title);
        await playwrightActions.fillElement(this.passwordInput, accountInformation.password, this.page);
        await playwrightActions.selectElementOption(this.daySelect, accountInformation.dateOfBirth.day, this.page);
        await playwrightActions.selectElementOption(this.monthSelect, accountInformation.dateOfBirth.month, this.page);
        await playwrightActions.selectElementOption(this.yearSelect, accountInformation.dateOfBirth.year, this.page);
        await this.setNewsletterSubscription(accountInformation.subscribeNewsletter);
        await this.setSpecialOffers(accountInformation.receiveSpecialOffers);
        await playwrightActions.fillElement(this.firstNameInput, accountInformation.firstName, this.page);
        await playwrightActions.fillElement(this.lastNameInput, accountInformation.lastName, this.page);
        await playwrightActions.fillElement(this.companyInput, accountInformation.company ?? '', this.page);
        await playwrightActions.fillElement(this.addressInput, accountInformation.address, this.page);
        await playwrightActions.fillElement(this.address2Input, accountInformation.address2 ?? '', this.page);
        await playwrightActions.selectElementOption(this.countrySelect, accountInformation.country, this.page);
        await playwrightActions.fillElement(this.stateInput, accountInformation.state, this.page);
        await playwrightActions.fillElement(this.cityInput, accountInformation.city, this.page);
        await playwrightActions.fillElement(this.zipcodeInput, accountInformation.zipcode, this.page);
        await playwrightActions.fillElement(this.mobileNumberInput, accountInformation.mobileNumber, this.page);
    }

    async submitSignUpForm() {
        await playwrightActions.clickElement(this.createAccountButton);
        await this.waitForLoadState();
    }

    async clickContinueButton() {
        let isVisible = await this.page.isVisible(this.selectors.continueButton);
        if (isVisible) {
            await playwrightActions.clickElement(this.continueButton);
        }
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
        await playwrightActions.setElementChecked(this.newsletterCheckbox, shouldSubscribe, this.page);
    }

    private async setSpecialOffers(shouldReceiveOffers = false) {
        await playwrightActions.setElementChecked(this.specialOffersCheckbox, shouldReceiveOffers, this.page);
    }
}
