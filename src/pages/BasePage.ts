import { Page, test } from '@playwright/test';
import { ADS_URL, WAIT_TIMES } from '../../data/constant';
import { logger } from '../utils/functional/logger';
import { Header } from './components/Header';

export class BasePage {
    protected page: Page;
    readonly header: Header;

    constructor(page: Page) {
        this.page = page;
        this.header = new Header(this.page);
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
    public async closeAds(timeout = WAIT_TIMES.SHORT): Promise<void> {
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
