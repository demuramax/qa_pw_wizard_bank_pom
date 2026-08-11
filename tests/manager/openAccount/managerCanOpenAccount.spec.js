import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage.js';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage.js';  

let openAccountPage;
let addCustomerPage;
const firstName = faker.person.firstName();
const lastName = faker.person.lastName();
const postCode = faker.location.zipCode(); 

test.beforeEach(async ({ page }) => {
  addCustomerPage = new AddCustomerPage(page);
  openAccountPage = new OpenAccountPage(page);
  

  /* 
  Pre-conditons:
  1. Open Add Customer page
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  6. Reload the page (This is a simplified step to close the popup).
  */

  await addCustomerPage.open();
  await addCustomerPage.fillFirstName(firstName);
  await addCustomerPage.fillLastName(lastName);
  await addCustomerPage.fillPostCode(postCode);
  await addCustomerPage.clickAddCustomerButton();
  await addCustomerPage.reloadPage();


});

test('Assert manager can add new customer', async ({ page }) => {
  /* 
  Test:
  1. Click [Open Account].
  2. Select Customer name you just created.
  3. Select currency.
  4. Click [Process].
  5. Reload the page (This is a simplified step to close the popup).
  6. Click [Customers].
  7. Assert the customer row has the account number not empty.

  Tips:
  1. Do not rely on the customer row id for the step 13. 
    Use the ".last()" locator to get the last row.
  */

    await addCustomerPage.clickOpenAccountButton();
    await openAccountPage.selectCustomerOption(`${firstName} ${lastName}`); 
    await openAccountPage.selectCurrencyOption('Dollar');
    await openAccountPage.clickProcessButton();
    await openAccountPage.reloadPage(); 
    await addCustomerPage.clickCustomersButton();
    await openAccountPage.assertLastRowAccountNumberNotEmpty();


});
