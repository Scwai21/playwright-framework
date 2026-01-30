import { test, expect } from "../fixtures/custom-fixtures";
import { PRODUCTS } from "../data/products.data";

test.describe('Smoke test', () => {
    test("User should see inventory without manual login", async ({ inventoryPage }) => {
        await expect(inventoryPage.cartLink).toBeVisible();
    });

    test.describe('Visual test', ()=>{
        test('Main page', async ({ inventoryPage }) => {
            await expect(inventoryPage.page).toHaveScreenshot('inventory-main.png', {
                fullPage: true,
                mask: [inventoryPage.cartBadge]
            })
        })
    })
})

test.describe("Positive case", () => {
    test(`User add all product to list`, async ({ inventoryPage }) => {
        let n = 1;
        for (const productName of PRODUCTS) {
            await inventoryPage.addToCart(productName);
            await expect(inventoryPage.cartBadge).toHaveText(`${n}`);
            n += 1;
        }
        await inventoryPage.cartLink.click();
        for (const productName of PRODUCTS) {
            const product = inventoryPage.checkProduct(productName);
            await expect(product).toBeVisible();
        }
    });

    test.describe("Deletion tests", () => {
        for (const productName of PRODUCTS) {
            test(`User delete product from cart ${productName}`, async ({
                inventoryPage,
                cartPage,
            }) => {
                await inventoryPage.addToCart(productName);
                await expect(inventoryPage.cartBadge).toHaveText("1");

                await inventoryPage.cartLink.click();

                const product = cartPage.checkProduct(productName);
                await cartPage.removeFromCart(productName);
                await expect.soft(inventoryPage.cartBadge).toBeHidden();
                await expect.soft(product).toBeHidden();
            });
        }
    })
})