import { faker } from '@faker-js/faker';
import { SignupCredential } from '../../../data/types';

export function fakerAccountInfomation(): SignupCredential {
    return {
        username: faker.internet.username(),
        email: faker.internet.email(),
        password: faker.internet.password({ memorable: true }),
    };
}

/**
 * Using faker to genarate username
 * @returns Username
 */
export function userName() {
    return faker.internet.username();
}

/**
 * Using faker to genarate user email
 * @returns Email
 */
export function userEmail() {
    return faker.internet.email();
}

/**
 * Using faker to genarate password
 * @returns random password
 */
export function password() {
    return faker.internet.password({ memorable: true });
}
