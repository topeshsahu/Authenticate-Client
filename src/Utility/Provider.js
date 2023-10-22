import React, { useState, createContext, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

const AppProvider = createContext();

const Provider = (props) => {
    const [values, setValues] = useState({
        status: "anonymous",
        user: null,
        email: null,
        token: null,
        refresh_token: null
    })
    const navigation = useNavigate();
    return (
        <AppProvider.Provider value={{ values: values, setValues: setValues, navigation: navigation }}>
            {props.children}
        </AppProvider.Provider>
    )
}


export { Provider, AppProvider }