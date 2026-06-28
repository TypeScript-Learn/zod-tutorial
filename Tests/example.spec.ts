import {  expect } from '@playwright/test';
import  { MY_PLAYWRIGHT_PAGE} from '../config/fixures'

MY_PLAYWRIGHT_PAGE('has title', async ({ loginPage }) => {
  // No hardcoded URL — resolves against `baseURL` from the active .env profile.
  await loginPage.navigate();
  // await loginPage.bookClick.click();


  // Expect a title "to contain" a substring.
  await expect(loginPage.page).toHaveTitle('Marriott Bonvoy Hotels | Book Directly & Get Exclusive Rates');
});

