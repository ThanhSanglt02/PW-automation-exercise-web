import { Page } from '@playwright/test';
import { String } from 'typescript-string-operations';
import { WEB_URLS } from '../../../data/constant';

// components/Header.ts
export class Header {
    readonly menuItemLinkSelector = `.shop-menu a[href="{0}"]`;

    constructor(private page: Page) {}

    private menuLink(path: string) {
        return this.page.locator(String.format(this.menuItemLinkSelector, path));
    }

    async goToLoginPage() {
        await this.menuLink(WEB_URLS.LOGIN_PAGE).click();
    }

    async goToProductsPage() {
        await this.menuLink(WEB_URLS.PRODUCT_PAGE).click();
    }
}
