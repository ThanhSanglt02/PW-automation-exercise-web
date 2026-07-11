import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { getEnvConfig } from '../utils/functional/setup';
import { WEB_URLS } from '../../data/constant';
import { playwrightActions } from '../utils/functional/elementAction';
import { String } from 'typescript-string-operations';

export class HomePage extends BasePage {
    readonly menuItemLinkSelector = `.shop-menu a[href="{0}"]`;
    readonly userNameLoggedLinkSelector = `//a[contains(normalize-space(.), 'Logged in as')]`;

    readonly userNameLoggedLink: Locator;

    constructor(page: Page) {
        super(page);
        this.userNameLoggedLink = this.page.locator(this.userNameLoggedLinkSelector);
    }

    /**
     * Gets the menu link locator for the provided path.
     *
     * @param path Menu item path.
     * @returns Menu link locator.
     */
    private menuLink(path: string): Locator {
        return this.page.locator(String.format(this.menuItemLinkSelector, path));
    }

    /**
     * Clicks a header menu link and prints locator details.
     *
     * @param path Menu item path.
     */
    private async clickMenuLink(path: string): Promise<void> {
        const menuLink = this.menuLink(path);
        await playwrightActions.clickElement(menuLink);
    }

    /**
     * Navigates to the login page from the header.
     */
    async goToLoginPage(): Promise<void> {
        await this.clickMenuLink(WEB_URLS.LOGIN_PAGE);
    }

    /**
     * Navigates to the products page from the header.
     */
    async goToProductsPage(): Promise<void> {
        await this.clickMenuLink(WEB_URLS.PRODUCT_PAGE);
    }

    /**
     * Gets the logged-in username text from the header.
     *
     * @returns Logged-in username text.
     */
    async getUserNameLogged(): Promise<string> {
        return await playwrightActions.getElementText(this.userNameLoggedLink);
    }

    async goToAutomationHomePage() {
        await this.waitForLoadState();
        await this.navigateTo(getEnvConfig().url);
        await this.waitForLoadState();
    }

    async goToSignupPage() {
        await this.navigateTo(`${getEnvConfig().url}/login`);
        await this.waitForLoadState();
    }
}
