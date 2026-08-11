import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.lastRow = page.locator('tr').last();
    this.lastRowFirstName = this.lastRow.locator('td').first();
    this.lastRowLastName = this.lastRow.locator('td').nth(1);
    this.lastRowPostCode = this.lastRow.locator('td').nth(2);
    this.lastRowAccountNumber = this.lastRow.locator('td').nth(3);
    this.deleteButton = this.lastRow.locator('button');
    this.searchCustomerInput = page.getByRole('textbox', { name: 'Search Customer' }); 
    this.tableRows = page.locator('tbody tr');
  } 

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

  // async scrollToLastRow() {
  //   await this.lastRow.scrollIntoViewIfNeeded();
  // }

  async clickDeleteButton() {
    await this.deleteButton.click();
  }

  async assertCustomerNotInList(firstName, lastName) {
    await expect(this.lastRowFirstName).not.toHaveText(firstName);
    await expect(this.lastRowLastName).not.toHaveText(lastName);
  }

  async assertLastCustomerDetails(fistName, lastName, postCode) {
    await expect(this.lastRowFirstName).toHaveText(fistName);
    await expect(this.lastRowLastName).toHaveText(lastName);
    await expect(this.lastRowPostCode).toHaveText(postCode);
  }

  async assertLastRowAccountNumberEmpty() {
  await expect(this.lastRowAccountNumber).toBeEmpty();
  }

  async fillSearchCustomerInput(customerData) {
    await this.searchCustomerInput.fill(customerData);
  }

  async assertTableRowsCount(expectedCount) {
    await expect(this.tableRows).toHaveCount(expectedCount);
  }
}


