import { User } from "@entities/User"
import { WSTransport } from "@shared/lib/WSTransport"

export type Chat = {
    id: number
    title: string
    avatar: string | null
    created_by: number
    unread_count: number
    last_message: {
        user: Partial<User>
        time: string
        content: string
        id: number
    }
}

export type Chats = Chat[]

export type WSConnection = Record<Chat['id'], WSTransport>

export type WSMessage = { type: string, content: string }

export type WSMessageData ={
    chat_id: number,
    time: string,
    type: string,
    user_id: string,
    content: string,
    file?: {
        id: number,
        user_id: number,
        path: string,
        filename: string,
        content_type: string,
        content_size: number,
        upload_date: string,
    }           
}


// [
//     {
//         "id": 7332,
//         "title": "e",
//         "avatar": "/c0288125-f7f3-4c24-8a18-d5c22d3527b6/5b450fde-4f4a-4941-b960-3cfbfc836a0f_cat_at_work_ai.jpeg",
//         "created_by": 505,
//         "unread_count": 8,
//         "last_message": {
//             "user": {
//                 "first_name": "Aasd",
//                 "second_name": "Aasdfasdfsdf",
//                 "display_name": "sffd",
//                 "login": "loginza",
//                 "avatar": "/a52e28aa-920b-4acb-a8de-f8d96e13302c/de8a38f7-b848-4786-adb8-2010d74c5cce_cat_at_work2.jpeg"
//             },
//             "time": "2024-05-18T07:40:46+00:00",
//             "content": "asdf",
//             "id": 5050
//         }
//     },
//     {
//         "id": 7331,
//         "title": "d",
//         "avatar": null,
//         "created_by": 505,
//         "unread_count": 2,
//         "last_message": {
//             "user": {
//                 "first_name": "Aasd",
//                 "second_name": "Aasdfasdfsdf",
//                 "display_name": "sffd",
//                 "login": "loginza",
//                 "avatar": "/a52e28aa-920b-4acb-a8de-f8d96e13302c/de8a38f7-b848-4786-adb8-2010d74c5cce_cat_at_work2.jpeg"
//             },
//             "time": "2024-05-17T19:35:14+00:00",
//             "content": "asdf",
//             "id": 4984
//         }
//     }
// ]