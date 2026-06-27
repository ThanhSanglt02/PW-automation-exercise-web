import { expect } from '@playwright/test';

export function getEnvConfig() {
    return {
        url: process.env.URL!,
    };
}
