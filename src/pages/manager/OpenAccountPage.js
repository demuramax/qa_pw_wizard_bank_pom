import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.processButton = page.getByRole('button', { name: 'Process' });
    this.customersButton = page.getByRole('button', { name: 'Customers' });
    this.lastRow = page.locator('tr').last();
    this.lastRowAccountNumber = this.lastRow.locator('td').nth(3);
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/openAccount',
    );
  }

  async selectCurrencyOption(currency) {
    await this.page.getByTestId('currency').selectOption(currency);
  }

  async selectCustomerOption(customerName) {
    await this.page.getByTestId('userSelect').selectOption(customerName);
  }

  async assertCurrencyOptionSelected(currency) {
    await expect(this.page.getByTestId('currency')).toHaveValue(currency);
  }

  async clickProcessButton() {
    await this.processButton.click();
  }

  async reloadPage() {
    await this.page.reload();
  }

  async clickCustomersButton() {
    await this.customersButton.click();
  }

}
