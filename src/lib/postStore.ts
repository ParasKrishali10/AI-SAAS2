import {create} from "zustand"
interface PostData{
    content:string
    images:string[]
    setPost:(content:string,images:string[])=>void
}
export const usePostStore=create<PostData>((set)=>({
    content:"",
    images:[],
    setPost:(content,images)=>set({content,images})
}))