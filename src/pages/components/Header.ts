import { Locator, Page } from '@playwright/test';
import { String } from 'typescript-string-operations';
import { WEB_URLS } from '../../../data/constant';
import { playwrightActions } from '../../utils/functional/elementAction';

// components/Header.ts
export class Header {
    private readonly selectors = {
        menuItemLink: `.shop-menu a[href="{0}"]`,
        userNameLoggedLink: `//a[contains(normalize-space(.), 'Logged in as')]`,
    };

    readonly userNameLoggedLink: Locator;

    constructor(private page: Page) {
        this.userNameLoggedLink = this.page.locator(this.selectors.userNameLoggedLink);
    }

    /**
     * Gets the menu link locator for the provided path.
     *
     * @param path Menu item path.
     * @returns Menu link locator.
     */
    private menuLink(path: string): Locator {
        return this.page.locator(String.format(this.selectors.menuItemLink, path));
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
}
