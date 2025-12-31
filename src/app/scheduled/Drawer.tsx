"use client"
import {CircleX,Save} from 'lucide-react';
import { useState } from "react"
import {motion,AnimatePresence,type Variants} from "framer-motion"
import toast from 'react-hot-toast';
type DrawerProps = {
  open: boolean;
  initialContent: string;
  initialChannel: string;
  post: string;
  onClose: () => void;
};

const drawerVariants: Variants = {
  hidden: {
    x: "100%",
  },
  visible: {
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
  exit: {
    x: "100%",
    transition: {
      duration: 0.2,
    },
  },
};


export default function Drawer({open,initialContent,initialChannel,post,onClose}:DrawerProps){
    const [changeContent,setChangeContent]=useState(initialContent)
    const [dirty,setDirty]=useState(false)
    const [save,setSave]=useState(false)
    const handleClosing=()=>{
      if(dirty && !save)
      {
        toast("Please save content first")
        return
      }
      toast("Content saved successfully")
      onClose()
    }
    return (
        <AnimatePresence>
             <motion.div
            className="fixed inset-y-0 right-0 z-50 hidden w-full max-w-md  border-l border-cyan-500/30 md:block"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
<div>
            <div className="flex flex-col ">
                <div>
                    <div className="flex items-center justify-between p-4">
                        <h2 className="text-2xl font-bold">Edit Post</h2>
                        <button  className="text-cyan-500 hover:text-cyan-400">
                            {/* <CircleX className="w-8 h-8 cursor-pointer" onClick={()=>onClose()} /> */}
                            <CircleX className="w-8 h-8 cursor-pointer" onClick={handleClosing} />
                        </button>
                    </div>
                </div>
                <div className=' px-6 py-6'>
                    <div>
                    <label className='text-cyan-500 font-semibold text-xl'>Channel</label>
                    <div className='mt-2'>

                    <input type="text" disabled placeholder={`${initialChannel}`} className='text-white text-lg border border-cyan-500 w-full p-2.5 rounded-xl'/>
                    </div>

                    </div>
                </div>
                <div className=' px-6 py-6'>
                    <div>
                    <label className='text-cyan-500 font-semibold text-xl'>Content</label>
                    <div className='mt-2'>

                    <textarea value={changeContent} onChange={(e)=>{
                    setChangeContent(e.target.value);
                      setDirty(true); }  }
                  className='text-white text-lg border border-cyan-500 w-full p-2.5 rounded-xl h-48'/>
                    </div>

                    </div>
                </div>
                <div className=' px-6 py-6'>
                    <button className='bg-gradient-to-r from-blue-400 to-purple-400 w-full p-3 text-xl rounded-xl flex justify-center cursor-pointer font-semibold items-center gap-2 scale-100 hover:scale-105 transition ease-in-out duration-500' onClick={()=>setSave(true)}>
                        <Save className="w-6 h-6 mr-2" />
                        Save Changes
                   </button>
                </div>
            </div>
        </div>
          </motion.div>

        </AnimatePresence>
    )
}