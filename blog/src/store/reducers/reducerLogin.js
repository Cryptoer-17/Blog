import * as actionTypes from '../actions/actionTypes';
import updateObject from '../../utility/updateObject';
import { auth } from '../../utility/firebase';

const initialState = {
    token: null,
    userId: null,
    error:null,
    loading:false,
    user:null
}

const loginStart = (state) =>{
    return updateObject( state, {error: null,  loading : true} );
}


const loginFail= (state, action) =>{
    return updateObject( state, { error : action.error, loading:false } );
    
}

const loginSuccess = (state,action) =>{
    return updateObject (state , {
        token : action.idToken,
        userId: action.userId,
        error : null,
        loading : false
    } );
}

const logout = (state,action) =>{
    auth.signOut(); 
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    return updateObject( state, initialState );

}


const signUpStart = (state) =>{
    return updateObject( state, { loading:true } );

}


const signUpFail= (state) =>{
    return updateObject( state, { loading:false } );
   
}

const signUpSuccess = (state,action) =>{
   
    
}

export const googleAuthStart= (state,action) =>{
    return updateObject( state, { loading:true } );
}


export const googleAuthFail= (state,action) =>{
    console.log(action.error);
    return updateObject( state, { loading:false } );
}

export const googleAuthSuccess = (state,action) =>{
    localStorage.setItem("userId", JSON.stringify(action.user));
    return updateObject( state, { user:action.user, userId: action.user.uid, loading:false } );
}


const reducer = (state = initialState,action) => {

    switch(action.type){
        case actionTypes.LOGIN_START: return loginStart(state,action);
        case actionTypes.LOGIN_SUCCESS: return loginSuccess(state,action);   
        case actionTypes.LOGIN_FAIL: return loginFail(state,action);  
        case actionTypes.LOGOUT: return logout(state,action);  
        case actionTypes.SIGN_UP_START: return signUpStart(state,action);  
        case actionTypes.SIGN_UP_SUCCESS: return signUpSuccess(state,action);  
        case actionTypes.SIGN_UP_FAIL: return signUpFail(state,action);  
        case actionTypes.GOOGLE_AUTH_START: return googleAuthStart(state,action);
        case actionTypes.GOOGLE_AUTH_SUCCESS: return googleAuthSuccess(state,action);  
        case actionTypes.GOOGLE_AUTH_FAIL: return googleAuthFail(state,action);  
        default: return state;

    }
};

export default reducer;