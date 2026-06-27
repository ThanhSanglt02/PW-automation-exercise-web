import { COUNTRIES, TITLES } from './constant';
import { SignupAccountInformation } from './types';

export const VALID_USER = {
    FIRST_NAME: 'Nguyen',
    LAST_NAME: 'Van A',
    EMAIL: 'vana@example.com',
    PHONE: '0901234567',
} as const;

export const VALID_SIGNUP_ACCOUNT_INFORMATION: Omit<SignupAccountInformation, 'password'> = {
    title: TITLES.Mr,
    dateOfBirth: {
        day: '1',
        month: '1',
        year: '1995',
    },
    firstName: 'Nguyen',
    lastName: 'Van A',
    company: 'Automation Exercise',
    address: '123 Test Street',
    address2: 'Floor 2',
    country: COUNTRIES.UnitedStates,
    state: 'California',
    city: 'Los Angeles',
    zipcode: '90001',
    mobileNumber: '0901234567',
    subscribeNewsletter: true,
    receiveSpecialOffers: true,
};
