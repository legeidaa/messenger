import { Block } from '@shared/lib/Block'
import { UserCard } from '@widgets/UserCard';
import DeleteUserModalTemplate from './DeleteUserModal.hbs?raw';
import { IDeleteUserModalProps } from './model';

export class DeleteUserModal extends Block {
    constructor(props: IDeleteUserModalProps) {
        super(props)
    }

    render() {
        return this.compile(DeleteUserModalTemplate, this.props);
    }
}

export const usersList: UserCard[] = []

export const deleteUserModal = new DeleteUserModal({
    modalTitleError: false,
    modalTitle: 'Удалить пользователя',
    usersList,
})
