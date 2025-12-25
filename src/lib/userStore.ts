import {create} from "zustand"
import { persist } from "zustand/middleware"
interface UserState{
    userId:string|null
    setUserId:(id:string)=>void
    clearUserId: () => void;
}
export const useUserInfo=create<UserState>()(
    persist(
        (set)=>({
            userId:null,
            setUserId:(id)=>set({userId:id}),
            clearUserId: () => set({ userId: null }),
        }),
        {
            name:"user-id-storage"
        }
    )
)