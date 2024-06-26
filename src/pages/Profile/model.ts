import { IBlockProps } from '@shared/lib/Block';
import { Avatar, Button, ProfileDataRow } from '@shared/partials';
import { Form } from 'shared/partials/Form';

export interface IProfilePageProps extends IBlockProps {
    asideButton: Button
    avatar: Avatar,
    profileName: string,
    // canChangeData: boolean,
    // canChangePassword: boolean,
    form: Form
    // profileData: ProfileDataRow[],
}
