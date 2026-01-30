import { test as base, expect } from '@playwright/test';
import { InventoryPage } from '../pages/inventory.page';
import { CartPage } from '../pages/cart.page';
import { LoginPage } from '../pages/login.page';


type MyFixtures = {
    inventoryPage: InventoryPage;
    cartPage: CartPage;
    loginPage: LoginPage
};

export const test = base.extend<MyFixtures>({
    
    inventoryPage: async ({ page }, use) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.goto(); 
        await use(inventoryPage);
    },

    cartPage: async ({ page }, use) => {
        const cartPage = new CartPage(page);
        await use(cartPage);
    },

    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto(); 
        
        await use(loginPage);
    }
});


export { expect };