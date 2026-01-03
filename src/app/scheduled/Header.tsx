import { Grid2x2,TableOfContents } from 'lucide-react';
export default function Header(){
    return (
    <div className="p-10 flex justify-between">
      <div>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Scheduled Post
        </h1>
        <h3 className="mt-3 font-semibold text-cyan-500 text-lg">
          Manage all your Discord scheduled content
        </h3>
      </div>

      <div className="flex gap-4">
        <Grid2x2 className="w-10 h-10 p-1 text-cyan-500" />
        <TableOfContents className="w-10 h-10 p-1 text-cyan-500" />
      </div>
    </div>
  )
}