import { v4 as uuidv4 } from 'uuid';
import { db } from './firebase';

//##########3 user API
//create an user and store it at users/id path (it's an asynchronous func)
export const doCreateUser = (id, name, email, avatar_url) => {
    const userCredentials = {
        name,
        email,
        bio: '',
        username: uuidv4(),
        avatar_url,
        nationality: '',
        website: '',
        is_facebook_user: true,
        use_feet: false,
        created_at: new Date().toISOString(),
        id,
    };
    return db
        .doc(`/users/${id}`)
        .set(userCredentials)
        .then(() => {
            const username_info = {
                username: userCredentials.username,
                user_id: id,
            };
            return db
                .collection('usernames')
                .doc(userCredentials.username)
                .set(username_info);
        });
};

//returns all users from firebase realtime db
// export const onceGetUsers = () => db.ref('users').once('value');

// export const doGetAnUnser = (uid) => db.ref(`users/${uid}`).once('value');

// other APIs could come below
