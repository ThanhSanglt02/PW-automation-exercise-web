import { Locator, Page, test } from '@playwright/test';
import { logger } from './logger';

class ActionUtilities {
    /**
     * Clicks an element and prints locator details.
     *
     * @param locator Element locator.
     * @param options Optional click options and page used to close ads URL after the action.
     */
    async clickElement(locator: Locator, options?: {}): Promise<void> {
        logger(`Click: ${locator} element`);

        await test.step(`I click element '${locator}'`, async () => {
            if (options) {
                options = { ...options, state: 'visible' };
                await locator.waitFor(options);
                await locator.scrollIntoViewIfNeeded();
            }
            await locator.click(options);
        });
    }

    /**
     * Fills an element and prints locator and data details.
     *
     * @param locator Element locator.
     * @param value Value to fill.
     * @param page Optional page used to close ads URL after the action.
     */
    async fillElement(locator: Locator, value: string, page?: Page): Promise<void> {
        logger(`Type: '${value}' in element: ${locator}`);
        await test.step(`I fill '${value}' into element '${locator}'`, async () => {
            await locator.fill(value);
        });
    }

    /**
     * Selects an option and prints locator and data details.
     *
     * @param locator Element locator.
     * @param value Value to select.
     * @param page Optional page used to close ads URL after the action.
     */
    async selectElementOption(locator: Locator, value: string, page?: Page): Promise<void> {
        logger(`Select '${value}' from drop-down element: ${locator}`);
        await test.step(`I select '${value}' from element '${locator}'`, async () => {
            await locator.selectOption(value);
        });
    }

    /**
     * Checks an element and prints locator details.
     *
     * @param locator Element locator.
     * @param page Optional page used to close ads URL after the action.
     */
    async checkElement(locator: Locator, page?: Page): Promise<void> {
        logger(`Check: ${locator} checkbox element`);
        await test.step(`I check element '${locator}'`, async () => {
            await locator.check();
        });
    }

    /**
     * Sets checkbox state and prints locator and data details.
     *
     * @param locator Element locator.
     * @param checked Checkbox state.
     * @param page Optional page used to close ads URL after the action.
     */
    async setElementChecked(locator: Locator, checked: boolean, page?: Page): Promise<void> {
        logger(`Set checkbox element: ${locator} checked state to '${checked}'`);
        await test.step(`I set element '${locator}' checked state to '${checked}'`, async () => {
            await locator.setChecked(checked);
        });
    }

    /**
     * Gets visible text or input value from an element.
     *
     * @param locator Element locator.
     * @returns Element text or value.
     */
    public async getElementText(locator: Locator): Promise<string> {
        logger(`Get text from element: ${locator}`);

        return await test.step(`I get text value for element '${locator}'`, async () => {
            const attributeValue = (await locator.getAttribute('value')) ?? '';
            const innerTextValue = await locator.innerText();
            logger(`Get text ${innerTextValue || attributeValue} from element: ${locator}`);

            return innerTextValue || attributeValue;
        });
    }
}

export const playwrightActions = new ActionUtilities();
