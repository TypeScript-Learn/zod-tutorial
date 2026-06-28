import {Browser,BrowserContext,Locator, Page} from 'playwright'
import {loadEnvData,EnvData} from '../config/utility'


export class BasePage {
    static env: EnvData = loadEnvData();
    env= BasePage.env;
    page: Page = null;
    header: Locator;

    constructor(page: Page) {
        this.page = page;
        // this.page.locator(`header#global-nav`)
        this.header = this.page.locator(`header#global-nav`)
    }
    async waitForPage(page: Page): Promise<void> {
        await this.page.goto(page.url());
    }
}