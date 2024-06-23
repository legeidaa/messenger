import { IBlockProps } from '@shared/lib/Block';
import { Avatar, Button, ProfileDataRow } from '@shared/partials';

export interface IProfilePageProps extends IBlockProps {
    asideButton: Button
    avatar: Avatar,
    // TODO добавить типы из entity
    profileName: string,
    canChangeData: boolean,
    canChangePassword: boolean,
    profileData: ProfileDataRow[],
}
