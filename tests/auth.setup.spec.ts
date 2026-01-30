import { test as setup } from "../fixtures/custom-fixtures";


const authFile = 'user.json';

setup('authenticate', async ({ loginPage }) => {


  await loginPage.login("standard_user", "secret_sauce");
  await loginPage.storageSave(authFile)
});
