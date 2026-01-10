type Listener=(data:any)=>void

let listeners:Listener[]=[]

export function emitNotification(data:any){
    listeners.forEach((fn)=>fn(data))
}

export function onNotification(fn:Listener)
{
    listeners.push(fn)
    return ()=>{
        listeners=listeners.filter((l)=>l!=fn)
    }
}