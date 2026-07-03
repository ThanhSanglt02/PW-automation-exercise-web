import { SignupAccountInformation, SignupTestData } from '../src/types/types';
import { fakerSignupAccountInformation, fakerSignupCredential } from '../src/utils/functional/faker';

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
