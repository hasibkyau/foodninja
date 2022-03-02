import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        payload: {
            token: token,
            userId: userId,
        }
    }
}

export const authLoading = isLoading => {
    return {
        type: actionTypes.AUTH_LOADING,
        payload: isLoading,
    }
}

export const authFailed = errMsg => {
    return {
        type: actionTypes.AUTH_FAILED,
        payload: errMsg
    }
}


const getProfile = (userId) => {
    let profile = [];
    axios.get("https://foodninja-4c3c8-default-rtdb.firebaseio.com/user_profile.json")
        .then(response => {
            for (let key in response.data) {
                if (response.data[key].userId === userId) {
                    profile.push({
                        ...response.data[key],
                        id: key,
                    })
                }
            }
            localStorage.setItem("MyProfile", JSON.stringify(profile[0]))
        });
}

const createProfile = (authData, userId, mode) => {
    if (mode === "Sign Up") {
        const userProfile = {
            fName: authData.fName,
            lName: authData.lName,
            email: authData.email,
            userId: userId,
        }
        axios.post('https://foodninja-4c3c8-default-rtdb.firebaseio.com/user_profile.json', userProfile)
            .then(response => {
                getProfile(userId);
                window.alert("Account Created");
            })
    } else {
        getProfile(userId);
    }
}

export const auth = (email, password, mode, fName, lName) => dispatch => {
    dispatch(authLoading(true));

    const authData = {
        fName: fName,
        lName: lName,
        email: email,
        password: password,
        returnSecureToken: true,
    }

    let authUrl = null;

    if (mode === "Sign Up") {
        authUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
    } else {
        authUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
    }
    const API_KEY = "AIzaSyDdJvlmOsgrH_t3Jr_mXFkus6RlTqA6ZDg";
    axios.post(authUrl + API_KEY, authData)
        .then(response => {
            
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('userId', response.data.localId);
            const expirationTime = new Date(new Date().getTime() + response.data.expiresIn * 1000);
            localStorage.setItem('expirationTime', expirationTime);
            createProfile(authData, response.data.localId, mode);

            setTimeout(()=>{
            dispatch(authLoading(false));    
            dispatch(authSuccess(response.data.idToken, response.data.localId));
            },1000)
        })
        .then(data =>{
            
        })
        .catch(err => {
            dispatch(authLoading(false));
            dispatch(authFailed(err.response.data.error.message))
        })

}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('userId');
    localStorage.removeItem('MyProfile');
    return {
        type: actionTypes.AUTH_LOGOUT,
    }
}

export const authCheck = () => dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
        // Logout
        dispatch(logout());
    } else {
        const expirationTime = new Date(localStorage.getItem('expirationTime'));
        if (expirationTime <= new Date()) {
            // Logout
            dispatch(logout());
        } else {
            const userId = localStorage.getItem('userId');
            dispatch(authSuccess(token, userId));
        }
    }
}
