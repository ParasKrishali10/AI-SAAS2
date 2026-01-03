import { TriangleAlert } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
type DeleteProps={
    onClose: () => void;
  onSaved:()=>Promise<void>
  post:string
}
export default function Delete({post,onSaved,onClose}:DeleteProps){
    const handleDelete=async()=>{
        try{
            const res=await axios.delete(`/api/posts/?postId=${post}`)
            onSaved()
            onClose()
        }catch(error)
        {
            toast.error("Error in deleting the post")
            return;
        }
    }
    return (

    <div>
        <div className="flex flex-col justify-center items-center ">
                <div className='relative' >
                     <span
              className={`pointer-events-none absolute -inset-1 rounded-full bg-gradient-to-r from-red-500/60 to-orange-500/60 blur-lg opacity-75 animate-pulse`}
            />
                    <TriangleAlert className='w-18 h-18 text-red-500'/>
                </div>
                <div className='mt-5 text-2xl font-bold'>
                    Delete Post?
                </div>
                <div className='mt-4 text-cyan-500 font-semibold text-lg text-center'>
                    This action cannot be undone. The scheduled post will be permanently deleted.
                </div>
                <div className='flex mt-6 items-center justify-center w-full gap-3'>
                    <button className='border border-cyan-500 p-3 w-full rounded-xl text-lg font-semibold cursor-pointer scale-100 hover:scale-110 transiton ease-in-out duration-500' onClick={()=>onClose()}>Cancel</button>
                    <button className='bg-red-600 p-3 w-full rounded-xl text-lg font-semibold cursor-pointer scale-100 hover:scale-110 transiton ease-in-out duration-500' onClick={handleDelete}>Delete</button>
                </div>
        </div>
    </div>
    )
}