import { COUNTRIES, LIST_ITEM_SELECTIONS, TITLES, WEB_URLS } from '../../data/constant';

export type Title = (typeof TITLES)[keyof typeof TITLES];

export type WebUrl = (typeof WEB_URLS)[keyof typeof WEB_URLS];

export type Country = (typeof COUNTRIES)[keyof typeof COUNTRIES];
export type ListItemSelection = (typeof LIST_ITEM_SELECTIONS)[keyof typeof LIST_ITEM_SELECTIONS];

export type DateOfBirth = {
    day: string;
    month: string;
    year: string;
};

export type SignupAccountInformation = {
    title: Title;
    password: string;
    dateOfBirth: DateOfBirth;
    firstName: string;
    lastName: string;
    company?: string;
    address: string;
    address2?: string;
    country: Country;
    state: string;
    city: string;
    zipcode: string;
    mobileNumber: string;
    subscribeNewsletter?: boolean;
    receiveSpecialOffers?: boolean;
};

export type SignupCredential = {
    username: string;
    email: string;
    password: string;
};

export type SignupTestData = {
    credential: SignupCredential;
    accountInformation: SignupAccountInformation;
};
