import { userAPI } from "@shared/api/UserApi";
import { fileInput } from "./ChangeAvatarModal";

class ChangeAvatarModalController {

    // еслии инпут пустой, выкидывать ошибку

    public sendAvatar(e: Event) {
        e.preventDefault()
        const input = fileInput.children.input.getContent()
        console.log(input);

        const formData = new FormData()
        formData.append('avatar', input.files[0])
        // console.log(formData.get('avatar'), input.files);
        // input.addEventListener("change", () => {
        //     if (input.files.length == 1) {
        //         console.log("File selected: ", elem.files[0]);
        //     }
        // });

        userAPI.changeProfileAvatar({ data: formData })
    }
}

export const changeAvatarModalController = new ChangeAvatarModalController()