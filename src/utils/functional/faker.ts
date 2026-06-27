import { faker, SexType } from '@faker-js/faker';
import { COUNTRIES, TITLES } from '../../../data/constant';
import { Country, DateOfBirth, SignupAccountInformation, SignupCredential, Title } from '../../../data/types';

/**
 * Generates the login/signup credential used on the first signup form.
 * Keep this separate from account information because the signup page needs
 * username and email before it asks for the detailed profile fields.
 *
 * @returns A random username, email, and password.
 */
export function fakerSignupCredential(): SignupCredential {
    return {
        username: username(),
        email: email(),
        password: password(),
    };
}

/**
 * Generates the detailed profile fields for the account information form.
 * The returned shape matches `SignupAccountInformation`, so tests can pass it
 * directly to `SignupPage.fillAccountInformation()`.
 *
 * @returns A complete random signup account information payload.
 */
export function fakerSignupAccountInformation(): SignupAccountInformation {
    return {
        title: title(),
        password: password(),
        dateOfBirth: dateOfBirth(),
        firstName: firstName(),
        lastName: lastName(),
        company: companyName(),
        address: address(),
        address2: secondaryAddress(),
        country: country(),
        state: state(),
        city: city(),
        zipcode: zipcode(),
        mobileNumber: phone(),
        subscribeNewsletter: faker.datatype.boolean(),
        receiveSpecialOffers: faker.datatype.boolean(),
    };
}

/**
 * Picks a title from the values supported by the Automation Exercise form.
 *
 * @returns A valid signup title option.
 */
function title(): Title {
    return faker.helpers.arrayElement(Object.values(TITLES));
}

/**
 * Picks a country from the values supported by the Automation Exercise form.
 *
 * @returns A valid country option.
 */
function country(): Country {
    return faker.helpers.arrayElement(Object.values(COUNTRIES));
}

/**
 * Generates a username for the signup entry form.
 *
 * @returns A random username.
 */
function username() {
    return faker.internet.username();
}

/**
 * Generates an email address for the signup entry form.
 *
 * @returns A random email address.
 */
function email() {
    return faker.internet.email();
}

/**
 * Generates a memorable password that can be reused across signup steps.
 *
 * @returns A random password.
 */
function password() {
    return faker.internet.password({ memorable: true });
}

/**
 * Generates a first name for the detailed account form.
 *
 * @param sex Gender hint used by Faker.
 * @returns A random first name.
 */
function firstName(sex: SexType = 'female') {
    return faker.person.firstName(sex);
}

/**
 * Generates a last name for the detailed account form.
 *
 * @param sex Gender hint used by Faker.
 * @returns A random last name.
 */
function lastName(sex: SexType = 'female') {
    return faker.person.lastName(sex);
}

/**
 * Generates a numeric mobile number accepted by the signup form.
 *
 * @returns A 10-digit mobile number.
 */
function phone() {
    return faker.string.numeric(10);
}

/**
 * Generates a primary street address for the detailed account form.
 *
 * @returns A random full street address.
 */
function address() {
    return faker.location.streetAddress({ useFullAddress: true });
}

/**
 * Generates a secondary address line for the detailed account form.
 *
 * @returns A random secondary address.
 */
function secondaryAddress() {
    return faker.location.secondaryAddress();
}

/**
 * Generates a company name for the optional company field.
 *
 * @returns A random company name.
 */
function companyName() {
    return faker.company.name();
}

/**
 * Generates a state or province value for the detailed account form.
 *
 * @returns A random state name.
 */
function state() {
    return faker.location.state();
}

/**
 * Generates a city value for the detailed account form.
 *
 * @returns A random city name.
 */
function city() {
    return faker.location.city();
}

/**
 * Generates a ZIP code matching the numeric format used by the current test.
 *
 * @returns A 5-digit ZIP code.
 */
function zipcode() {
    return faker.location.zipCode('#####');
}

/**
 * Generates a date of birth and converts it to select option values.
 *
 * @returns Day, month, and year strings compatible with the signup form selects.
 */
function dateOfBirth(): DateOfBirth {
    const birthDate = faker.date.birthdate({ min: 18, max: 65, mode: 'age' });

    return {
        day: birthDate.getDate().toString(),
        month: (birthDate.getMonth() + 1).toString(),
        year: birthDate.getFullYear().toString(),
    };
}
