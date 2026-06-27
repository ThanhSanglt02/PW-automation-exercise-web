import { Page } from '@playwright/test';
import { WAIT_TIMES } from '../../data/constant';
import { Header } from './components/Header';

export class BasePage {
    protected page: Page;
    readonly header: Header;

    constructor(page: Page) {
        this.page = page;
        this.header = new Header(this.page);
    }

    /**
     * Wait for loading DOm
     * @param timeout - maximun of time to wait
     */
    public async waitForLoadState(timeout: number = WAIT_TIMES.SHORT) {
        await this.page.waitForLoadState('domcontentloaded', { timeout: timeout });
        await this.page.waitForLoadState('load', { timeout: timeout });
    }

    /**
     * Wait for page to fully render
     * @param timeout - maximun of time to wait
     */
    public async waitForPageRendering(timeout: number = WAIT_TIMES.LONG) {
        // await ActionUtilities.waitForElementToDisappear(
        //     this.dangTaiDuLieuLoadingParaSelector,
        //     {
        //         state: 'hidden',
        //         timeout: timeout,
        //     },
        //     true,
        // );
        // await this.page.waitForTimeout(WAIT_TIMES.VERY_SHORT);
        // await ActionUtilities.waitForElementToDisappear(
        //     this.loadingInGridSvgSelector,
        //     {
        //         state: 'hidden',
        //         timeout: timeout,
        //     },
        //     true,
        // );
        // await this.page.waitForTimeout(WAIT_TIMES.VERY_SHORT);
    }
}
