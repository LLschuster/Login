import asyncstorage from "@react-native-async-storage/async-storage";

export interface userInfo{
    email: string,
}

export interface userCredential{
    firstname?: string,
    lastname?: string,
    phone?: string,
    email: string,
    password: string
}


export const saveCredentials = async (credential: userCredential) =>
{
    try {
        const userObject = await asyncstorage.getItem(credential.email.toLowerCase());
        if (userObject) return false;
        await asyncstorage.setItem(credential.email.toLowerCase(), JSON.stringify(credential))
        return true;
    } catch (error) {
       console.log(error);
       return false 
    }
}

export const loginUserWithCredentials = async (credential: userCredential) =>
{
    try {
        const userObject = await asyncstorage.getItem(credential.email.toLowerCase());

        if (!userObject) return false;

        const userdata = JSON.parse(userObject) as userCredential
        console.log("userdate login ", {userdata, credential})
        if (userdata.password === credential.password)
        {
            await setCurrentUser(userdata);
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