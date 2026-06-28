import {defineConfig} from '@playwright/test';
import {loadConfig, loadProject} from "./config/utility";
// import { getProjects } from './config/projects';
/**
 * Load environment configuration with selectable profiles (dev, qa, test, ...).
 *
 * Select the profile at runtime with the ENV variable, e.g.
 *   ENV=qa npx playwright test
 * Defaults to "dev" when ENV is not provided.
 *
 * Loading order (later files override earlier ones):
 *   1. .env            -> shared defaults for all environments
 *   2. .env.<profile>  -> the selected profile (dev | qa | test | ...)
 * https://github.com/motdotla/dotenv
 */


loadConfig({profileName: process.env.PROFILE || 'dev', fileName: '.env'});

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
    testDir: './Tests',
    /* Run tests in files in parallel */
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 2 : 0,
    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 1 : undefined,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: 'html',
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        /* Base URL to use in actions like `await page.goto('')`.
         * Read from the active profile file (.env.<ENV>). */
        //baseURL: process.env.BASE_URL,

        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: 'on-first-retry',
    },

    /* Configure projects for major browsers.
     * Projects live in ./config/projects.ts and can be filtered with the
     * PROJECT env var, e.g. `PROJECT=chromium npx playwright test`. */
    projects: loadProject(process.env.PROJECT),
    // projects: getProjects(),

    /* Run your local dev server before starting the tests */
    // webServer: {
    //   command: 'npm run start',
    //   url: 'http://localhost:3000',
    //   reuseExistingServer: !process.env.CI,
    // },
});
