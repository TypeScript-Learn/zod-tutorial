import {BasePage as ORIGINAL_BASE} from "./basePage";
import {Page,Locator} from "@playwright/test";

export class LoginPage extends ORIGINAL_BASE{
    page:Page;
    place: Locator;
    Destination: Locator;
    bookClick: Locator;

    constructor(page: Page) {
      super(page);
      this.page = page;
      this.Destination = page.locator("//div[contains(@id,'search-field-dropdown']");
      this.place = page.locator("//div[contains(@name,'input-text-Destination')]");
      this.bookClick = page.locator("//a[contains(@class,'custom_click_track')]");
    }
    async navigate(){
        await this.page.goto(this.env.urls.TST1.BASEURL);
    }

}