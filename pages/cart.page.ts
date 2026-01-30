import { type Page, type Locator } from '@playwright/test';

export class CartPage {
    readonly page: Page
    readonly checkoutButton: Locator
    readonly continueShoppingButton: Locator


    constructor(page: Page){
        this.page = page
        this.checkoutButton = page.getByRole("button", { name: 'Checkout'}) 
        this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping'})
    }

    async removeFromCart(productName: string){
        await this.page.locator('.cart_item')
            .filter({ hasText: productName })
            .getByRole('button', { name: 'Remove'})
            .click()
   }

    checkProduct(productName: string): Locator {
        return this.page.locator('.cart_item')
            .filter({ hasText: productName })
  }
}