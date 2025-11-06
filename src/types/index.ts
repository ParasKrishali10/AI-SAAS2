export interface DiscordUser{
    id:string
    username:string
    avatar:string|null
    discriminator:string
    email?:string|null
}

export interface DiscordGuild{
    id:string
    name :string
    icon:string|null
    owner:boolean
    permissions:string
}

export interface DiscordChannel{
    id:string
    name:string
    type:number
}

export interface CreatePostInput{
    desciption:string
    serverId:string
    channelId:string
    scheduledTime:Date
    generateImage:boolean
}

export interface GeneratedContent{
    content:string
    imagePrompts?:string[]
    image?:string[]
}

export interface ScheduledPostData{
    id:string
    desciption:string
    generatedContent:string
    imageUrls:string[]
    schedueledFor:Date
    status:'SCHEDULED'|'POSTED'|'FAILED'
    channelName:string
    serverName:string
    error?:string
}