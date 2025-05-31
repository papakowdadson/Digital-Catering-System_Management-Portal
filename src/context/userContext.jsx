import React,{ createContext, useState,useEffect } from "react";


export const UserContext = createContext('userContext');

const UserContextProvider=({children})=>{
    const [user,setUser]=useState(() => {
        const storedUser = localStorage.getItem("userProfile");
        return storedUser ? JSON.parse(storedUser) : null;
      })



    async function setLocalUser(userResponse){
        // console.log('=========data to set local storage===')
        // console.log(userResponse)
        localStorage.setItem("userProfile",JSON.stringify(userResponse))
        setUser(userResponse)
        // TODO:find a way to make local storage setitem happen in real time
    }
    function getLocalUser(){
        const storedUser=localStorage.getItem('userProfile')
        if(storedUser){
            setUser(JSON.parse(storedUser))
            // console.log('==========local user============')
            // console.log([item])
            return storedUser
        }
        return null
    }
    function removeLocalUser(){
        localStorage.removeItem('userProfile')
        setUser(null);
    }

    useEffect(()=>{
        getLocalUser();
        // setActivePage(path);
       },[])

    return (
        <UserContext.Provider value={{setUser,user,setLocalUser,removeLocalUser}}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;