import{ test as ORIGINAL_BASE} from '@playwright/test'
import {LoginPage} from '../Tests/loginPage'
import {Locator} from "playwright";

type MyFixtures = {
    loginPage: LoginPage,
}

 const test = ORIGINAL_BASE.extend<MyFixtures>({
    loginPage: async({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    }
})
export const MY_PLAYWRIGHT_PAGE = test;