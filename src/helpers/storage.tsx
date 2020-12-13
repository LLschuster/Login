import asyncstorage from "@react-native-async-storage/async-storage";

export const saveCredentials = async () =>
{
    try {
        await asyncstorage.setItem("email", "password")
        return true;
    } catch (error) {
       console.log(error);
       return false 
    }
}

export const loginUserWithCredentials = async () =>
{
    try {
        const pass = await asyncstorage.getItem("email");
        if (pass === "pass")
        {
            return true;
        }
        return false
    } catch (error) {
       console.log(error); 
    }
}
