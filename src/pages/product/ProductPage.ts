import { Locator, Page } from '@playwright/test';
import { LIST_ITEM_SELECTIONS } from '../../../data/constant';
import { ListItemSelection } from '../../types/types';
import { playwrightActions } from '../../utils/functional/elementAction';
import { HomePage } from '../HomePage';

export default class ProductPage extends HomePage {
    readonly viewProductLinksSelector =
        "//div[@class='single-products']/following-sibling::div//a[text() = 'View Product']";
    readonly viewProductLinks: Locator;

    constructor(page: Page) {
        super(page);
        this.viewProductLinks = this.page.locator(this.viewProductLinksSelector);
    }

    /**
     * Gets the product link that matches the requested product selection.
     *
     * @param productSelection Product selection used from the listing.
     * @returns Product detail link locator.
     * @throws Error when the product listing has no products.
     */
    private async getProductViewLink(productSelection: ListItemSelection): Promise<Locator> {
        const productCount = await this.viewProductLinks.count();
        if (productCount === 0) {
            throw new Error('No products are available to view.');
        }
        const productIndexBySelection: Record<ListItemSelection, number> = {
            [LIST_ITEM_SELECTIONS.FIRST]: 0,
            [LIST_ITEM_SELECTIONS.LAST]: productCount - 1,
            [LIST_ITEM_SELECTIONS.RANDOM]: Math.floor(Math.random() * productCount),
        };
        return this.viewProductLinks.nth(productIndexBySelection[productSelection]);
    }

    /**
     * Opens a product detail page from the product listing.
     *
     * @param productSelection Product selection used from the listing.
     * @returns Promise that resolves when the product detail page finishes loading.
     */
    async viewProduct(productSelection: ListItemSelection = LIST_ITEM_SELECTIONS.RANDOM): Promise<void> {
        const productViewLink = await this.getProductViewLink(productSelection);
        await playwrightActions.clickElement(productViewLink);
        await this.waitForLoadState();
    }
}
