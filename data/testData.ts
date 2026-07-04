import { SignupAccountInformation, SignupTestData } from '../src/types/types';
import { fakerSignupAccountInformation, fakerSignupCredential } from '../src/utils/functional/faker';

/**
 * Hardcoded login users used for login scenarios on the public practice website.
 * This data is fixed because the test environment does not provide database access.
 * In a real project, credentials should be loaded from a secure source such as a database,
    secret manager, or protected test data service to avoid exposing sensitive information.
 */
export const loginTestData = {
    validUser: {
        email: 'Aida_Koepp@hotmail.com',
        password: 'bebiruvayumehax',
        username: 'Adelle94',
    },
    invalidUser: {
        email: 'invalid_user@example.com',
        password: 'invalid-password',
        username: 'InvalidUser',
    },
};

/**
 * Builds valid signup test data.
 *
 * @param accountInformationOptions Optional field overrides for the signup form.
 * @returns A complete signup test data payload.
 */
export function validSignupTestData(accountInformationOptions: Partial<SignupAccountInformation> = {}): SignupTestData {
    const credential = fakerSignupCredential();

    return {
        credential,
        accountInformation: {
            ...fakerSignupAccountInformation(accountInformationOptions),
        },
    };
}
