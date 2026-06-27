import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { getEnvConfig } from '../utils/functional/setup';

export class LandingPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async goToAutomationHomePage() {
        await this.waitForLoadState();
        await this.page.goto(getEnvConfig().url);

        await this.waitForLoadState();
    }

    async goToSignupPage() {
        await this.page.goto(`${getEnvConfig().url}/login`);
        await this.waitForLoadState();
    }
}
