import { type Page, type Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;
  


  constructor(page: Page) {
    this.page = page;
    this.cartLink = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  
  async goto() {
    await this.page.goto('https://www.saucedemo.com/inventory.html');
  }

  async addToCart(productName: string) {
    await this.page.locator('.inventory_item')
      .filter({ hasText: productName })
      .getByRole('button', { name: 'Add to cart' })
      .click();
  }

   checkProduct(productName: string): Locator {
    return this.page.locator('.cart_item')
      .filter({ hasText: productName })
  }

   async removeFromCart(productName: string){
    await this.page.locator('.cart_item')
      .filter({ hasText: productName })
      .getByRole('button', { name: 'Remove'})
      .click()
   }
}

