import {create} from "zustand"
interface UserInfo{
    userId:string
    setUserId:(id:string)=>void
}
export const useUserInfo=create<UserInfo>((set)=>({
    userId:"",
    setUserId:(id)=>set({userId:id})
}))