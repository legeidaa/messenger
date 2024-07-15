import avatarSkeletonSrc from '@assets/avatar-skeleton.svg'
import { store } from "@shared/Store";

class AvatarController {

    public getAvatarSrc(): string {
        console.log(store.getState().user?.avatar)
        
        if (store.getState().user?.avatar) {
            return store.getState().user?.avatar as string
        } else {
            return avatarSkeletonSrc
        }
    }
}

export const avatarController = new AvatarController()