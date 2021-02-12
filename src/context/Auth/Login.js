import React, { createContext , useReducer } from 'react'

export const AuthContext = React.createContext();

export const AuthReducer =(state , action) =>{
    switch (action.type) {
        case 'login':
            const token = action.payload
            localStorage.setItem('token' , token)
            return {
                state : token
            }
    
        default:
            return state
    }
}
export default function AuthContextProvider(props) {
    const [state, dispatch] = useReducer(AuthReducer, '')
    return (
        <AuthContext.Provider value={{state , dispatch}}>
            {props.children}
        </AuthContext.Provider>
    )
}
