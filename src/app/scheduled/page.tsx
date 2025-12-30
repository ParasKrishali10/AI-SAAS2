import { Grid2x2,TableOfContents } from 'lucide-react';
import Button from "./Button_Loader"

export default function Scheduled(){

    return (
        <div className="bg-gray-900 overflow-hidden min-h-screen">
          <div>
          <div className="p-10 flex justify-between">
            <div className="">
                <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Scheduled Post</h1>
                <h3 className="mt-3 font-semibold text-cyan-500 text-lg">Manage all your Discord scheduled content</h3>
            </div>
            <div className="flex p-4 bg-gray-900 gap-4">
                <button className="cursor-pointer">

                    <Grid2x2 className="w-10 h-10 p-1 text-cyan-500 hover:bg-gradient-to-r from-blue-500 to-purple-500 hover:text-white rounded-lg"/>

                </button>
                <button className="cursor-pointer">
                    <TableOfContents className="w-10 h-10 p-1 text-cyan-500 hover:bg-gradient-to-r from-blue-500 to-purple-500 hover:text-white rounded-lg"/>
                </button>
            </div>
          </div>

          </div>
          <div>
           <Button/>
          </div>
          <div>

          </div>
        </div>
    )
}