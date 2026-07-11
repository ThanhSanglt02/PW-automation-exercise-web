import { Page, test } from '@playwright/test';
import { ADS_URL, WAIT_TIMES } from '../../data/constant';
import { logger } from '../utils/functional/logger';

export class BasePage {
    protected page: Page;

    readonly pageLoadingIndicatorSelector = '.spinner-dots';
    readonly pageLoadingTitleSelector = '.loading-spinner-heading';
    readonly pageLoadingOverlaySelector = '.loading';

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Waits for the page load states used by this project.
     *
     * @param timeout Maximum time to wait.
     */
    public async waitForLoadState(timeout: number = WAIT_TIMES.SHORT): Promise<void> {
        logger('Wait for page load states', {
            states: 'domcontentloaded, load',
            timeout,
        });
        await test.step('I wait for page load states', async () => {
            await this.page.waitForLoadState('domcontentloaded', { timeout: timeout });
            await this.page.waitForLoadState('load', { timeout: timeout });
        });
    }

    /**
     * Waits until the page is ready for user actions.
     *
     * @param timeout Maximum time to wait.
     */
    public async waitForPageRender(timeout: number = WAIT_TIMES.SHORT): Promise<void> {
        await this.waitForLoadState(timeout);
        await this.waitForOptionalElementToDisappear(this.pageLoadingIndicatorSelector, timeout);
        await this.waitForOptionalElementToDisappear(this.pageLoadingTitleSelector, timeout);
        await this.waitForOptionalElementToDisappear(this.pageLoadingOverlaySelector, timeout);
        await this.closeAds(timeout);
    }

    /**
     * Waits for an optional loading element to disappear without failing when it does not exist.
     *
     * @param selector Loading element selector.
     * @param timeout Maximum time to wait.
     */
    private async waitForOptionalElementToDisappear(selector: string, timeout: number): Promise<void> {
        logger('Wait for optional loading element to disappear', {
            selector,
            timeout,
        });

        await test.step(`I wait for optional loading element '${selector}' to disappear`, async () => {
            try {
                await this.page.locator(selector).waitFor({
                    state: 'hidden',
                    timeout,
                });
            } catch (error) {
                logger('Optional loading element did not disappear within timeout. Continue test flow.', {
                    selector,
                    error,
                });
            }
        });
    }

    /**
     * Navigate to a URL and print navigation details.
     *
     * @param url URL to open.
     */
    protected async navigateTo(url: string): Promise<void> {
        logger('Go to URL', {
            url,
        });

        await test.step(`I go to URL '${url}'`, async () => {
            await this.page.goto(url);
        });
    }

    /**
     * Removes the ads URL fragment when it appears on the current page.
     *
     * @param timeout Maximum time to check for the ads URL.
     */
    // Exposes a reusable page-level action for closing the ads redirect.
    public async closeAds(timeout: number = WAIT_TIMES.SHORT): Promise<void> {
        try {
            // Poll the browser URL until the ads fragment appears or the timeout is reached.
            await this.page.waitForFunction((adsUrl) => window.location.href.includes(adsUrl), ADS_URL, {
                // Check the current URL once per second.
                polling: 1000,
                // Stop checking after the configured timeout.
                timeout,
            });

            const currentUrl = this.page.url();
            const cleanUrl = currentUrl.replace(ADS_URL, '');
            await test.step('Close ads redirect', async () => {
                await this.page.goto(cleanUrl);
            });
        } catch (error) {
            logger('Ads redirect did not appear within timeout. Continue test flow.', {
                error,
                currentUrl: this.page.url(),
            });
        }
    }
}
