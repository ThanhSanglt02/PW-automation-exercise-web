import { SignupTestData } from './types';
import { fakerSignupAccountInformation, fakerSignupCredential } from '../src/utils/functional/faker';

export function validSignupTestData(): SignupTestData {
    const credential = fakerSignupCredential();

    return {
        credential,
        accountInformation: {
            ...fakerSignupAccountInformation(),
        },
    };
}
