import { auth, facebookProvider } from './firebase';

export const doFacebookSignIn = () => auth.signInWithPopup(facebookProvider);

export const doResetPassword = (actionCode, newPassword) =>
    auth
        .verifyPasswordResetCode(actionCode)
        .then(function (email) {
            auth.confirmPasswordReset(actionCode, newPassword)
                .then(function (resp) {})
                .catch(function (error) {
                    throw new Error(error);
                });
        })
        .catch(function (error) {
            throw new Error(error);
        });
