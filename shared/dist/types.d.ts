export interface IUser {
    uid: string;
    email: string;
    emailVerified: boolean;
    displayName: string;
    photoURL: string;
    disabled: boolean;
    metadata: {
        lastSignInTime: string;
        creationTime: string;
        lastRefreshTime: string;
    };
    providerData: {
        uid: string;
        email: string;
        displayName: string;
        photoURL?: string;
        providerId: string;
    }[];
}
export {};
