import asyncstorage from "@react-native-async-storage/async-storage";

export interface userInfo{
    email: string,
}

export interface userCredential{
    email: string,
    password: string
}


export const saveCredentials = async (credential: userCredential) =>
{
    try {
        await asyncstorage.setItem(credential.email, JSON.stringify(credential))
        return true;
    } catch (error) {
       console.log(error);
       return false 
    }
}

export const loginUserWithCredentials = async (credential: userCredential) =>
{
    try {
        const userObject = await asyncstorage.getItem(credential.email);

        if (!userObject) return false;

        const userdata = JSON.parse(userObject) as userCredential
        if (userdata.password === credential.password)
        {
            return true;
        }
        return false
    } catch (error) {
       console.log(error); 
    }
}

export const setCurrentUser = async (credential: userCredential) =>
{
    try {
        await asyncstorage.setItem("currentUser", JSON.stringify(credential))
        return true;
    } catch (error) {
       console.log(error); 
    }
}

export const getCurrentUser = async () =>
{
    try {
        const userObject = await asyncstorage.getItem("currentUser") 
        if (!userObject) return null;
        return JSON.parse(userObject);
    } catch (error) {
       console.log(error); 
       return null;
    }
}

export const removeCurrentUser = async () =>
{
    try {
        await asyncstorage.removeItem("currentUser") 
        return true;
    } catch (error) {
       console.log(error); 
       return false;
    }
}