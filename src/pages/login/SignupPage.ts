import { Locator, Page } from '@playwright/test';
import { String } from 'typescript-string-operations';
import { Title, SignupAccountInformation } from '../../types/types';
import { playwrightActions } from '../../utils/functional/elementAction';
import { BasePage } from '../BasePage';

export class SignupPage extends BasePage {
    readonly titleRadioSelector = `input[type="radio"][name="title"][value="{0}"]`;
    readonly passwordInputSelector = '[data-qa="password"]';
    readonly daySelectSelector = '[data-qa="days"]';
    readonly monthSelectSelector = '[data-qa="months"]';
    readonly yearSelectSelector = '[data-qa="years"]';
    readonly newsletterCheckboxSelector = '#newsletter';
    readonly specialOffersCheckboxSelector = '#optin';
    readonly firstNameInputSelector = '[data-qa="first_name"]';
    readonly lastNameInputSelector = '[data-qa="last_name"]';
    readonly companyInputSelector = '[data-qa="company"]';
    readonly addressInputSelector = '[data-qa="address"]';
    readonly address2InputSelector = '[data-qa="address2"]';
    readonly countrySelectSelector = '[data-qa="country"]';
    readonly stateInputSelector = '[data-qa="state"]';
    readonly cityInputSelector = '[data-qa="city"]';
    readonly zipcodeInputSelector = '[data-qa="zipcode"]';
    readonly mobileNumberInputSelector = '[data-qa="mobile_number"]';
    readonly createAccountButtonSelector = '[data-qa="create-account"]';
    readonly accountCreatedHeadingSelector = '[data-qa="account-created"]';
    readonly continueButtonSelector = `//a[@data-qa="continue-button"]`;

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
        this.passwordInput = this.page.locator(this.passwordInputSelector);
        this.daySelect = this.page.locator(this.daySelectSelector);
        this.monthSelect = this.page.locator(this.monthSelectSelector);
        this.yearSelect = this.page.locator(this.yearSelectSelector);
        this.newsletterCheckbox = this.page.locator(this.newsletterCheckboxSelector);
        this.specialOffersCheckbox = this.page.locator(this.specialOffersCheckboxSelector);
        this.firstNameInput = this.page.locator(this.firstNameInputSelector);
        this.lastNameInput = this.page.locator(this.lastNameInputSelector);
        this.companyInput = this.page.locator(this.companyInputSelector);
        this.addressInput = this.page.locator(this.addressInputSelector);
        this.address2Input = this.page.locator(this.address2InputSelector);
        this.countrySelect = this.page.locator(this.countrySelectSelector);
        this.stateInput = this.page.locator(this.stateInputSelector);
        this.cityInput = this.page.locator(this.cityInputSelector);
        this.zipcodeInput = this.page.locator(this.zipcodeInputSelector);
        this.mobileNumberInput = this.page.locator(this.mobileNumberInputSelector);
        this.createAccountButton = this.page.locator(this.createAccountButtonSelector);
        this.accountCreatedHeading = this.page.locator(this.accountCreatedHeadingSelector);
        this.continueButton = this.page.locator(this.continueButtonSelector);
    }
    /**
     * Gets the title radio button locator by title value.
     *
     * @param title Title value supported by the signup form.
     * @returns Locator for the matching title radio button.
     */
    titleRadio(title: Title): Locator {
        return this.page.locator(String.format(this.titleRadioSelector, title));
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
        const isVisible = await this.page.isVisible(this.continueButtonSelector);
        if (isVisible) {
            await playwrightActions.clickElement(this.continueButton);
        }
        await this.waitForLoadState();
        await this.waitForPageRender();
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
