import {resolve} from "path";
import {config} from "dotenv";
import {existsSync, readdirSync, readFileSync} from "node:fs";
import type {Project} from '@playwright/test';
import {devices} from '@playwright/test';
import {load} from 'js-yaml';

export interface EnvData {
    profile: string;
    urls: any;
    headers: any;
    data: any;
}

export function loadEnvData(profile?: string): EnvData {
    const PROFILE = (profile ?? process.env.PROFILE)?.toUpperCase();
    if (!PROFILE) {
        throw new Error("Profile doesn't exist");
    }
    const dir = resolve(process.cwd(), 'Data', PROFILE);
    const urls = load(readFileSync(resolve(dir, 'urls.yaml'), 'utf8'));
    const headers = load(readFileSync(resolve(dir, 'All_Header.yaml'), 'utf8'));
    const data: any = load(readFileSync(resolve(dir, 'PropertyData.yaml'), 'utf8'));
    return {profile: PROFILE, urls, headers, data}
}


export function load_all_files(profile?: string): any[] {
    const PROFILE = (profile ?? process.env.PROFILE)?.toUpperCase();
    let fileList: any[] = [];
    if (!PROFILE) {
        throw new Error("Profile doesn't exist");
    }
    const dir = resolve(process.cwd(), 'Data', PROFILE);
    if (dir.length > 0) {
        const entries = readdirSync(dir, {withFileTypes: true});
        for (const entry of entries) {
            if (entry.isFile()) {
                const filePath = resolve(dir, entry.name);
                const fileContent = readFileSync(filePath, 'utf8');
                const parsedData = load(fileContent);
                fileList.push(parsedData)
            }
        }
    }
    return fileList;
}


interface ProfileOptions {
    profileName: string;
    fileName?: string;
    path?: string;
}

export function loadConfig(options: ProfileOptions) {
    const sharedDefaults = resolve(process.cwd(), '.env');
    if (existsSync(sharedDefaults)) {
        config({path: sharedDefaults});
    }

    if (options.profileName) {
        const ENV = options.profileName.toLowerCase();
        const fileName = resolve(process.cwd(), `.env.${ENV}`);
        if (existsSync(fileName)) {
            config({path: fileName, override: true});
            console.log(`[loadConfig] Loaded profile "${ENV}" -> BASE_URL=${process.env.BASE_URL}`);
        }
    } else if (options.fileName) {
        const fileName = resolve(process.cwd(), options.fileName.toLowerCase());
        if (existsSync(fileName)) {
            config({path: fileName, override: true});
        }
    } else if (options.path) {
        const pathm = resolve(process.cwd(), options.path);
        if (existsSync(pathm)) {
            config({path: pathm, override: true});
        }
    } else {
        throw new Error("No file name provided");
    }
}

const projectVariables = {
    "projectChrome": {name: 'chrome',
        use: {
            ...devices['Desktop Chrome'],
            headless: false,
            viewport: {width: 1440, height: 900},
            timezoneId: 'Europe/Paris'
        }
    },
    "projectFirefox": {name: 'firefox', use: {...devices['Firefox']}}
}

export function loadProject(projectName: string): Project[] {
    const splitProjectName = projectName.toLowerCase().split(",");
    console.log(" Loaded project " + splitProjectName[0], splitProjectName[1]);
    const projectArrayToPass: Project[] = [];
    for (const project of splitProjectName) {
        switch (project.toLowerCase()) {
            case 'chrome':
                // const p = { name: 'chrome', use: {...devices['Desktop Chrome']}}
                projectArrayToPass.push(projectVariables["projectChrome"]);
            case 'firefox':
                // const p1 = { name: 'firefox', use: {...devices['Firefox']}}
                projectArrayToPass.push(projectVariables["projectFirefox"]);

        }

    }
    return projectArrayToPass;
}
