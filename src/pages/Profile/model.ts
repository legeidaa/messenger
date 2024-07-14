import { Avatar, Button } from '@shared/partials/index.ts';
import { Block, IBlockProps } from '@shared/lib/Block/index.ts';
import { Form } from '@shared/partials/Form/index.ts';
import { User } from '@shared/Store/state';

export interface IProfilePageProps extends IBlockProps {
    asideButton: Button
    avatar: Avatar,
    profileName: string,
    profileFooter: Block | Block[],
    profileFooterError: string,
    form: Form
}

export interface IProfilePageState extends IBlockProps {
    profileName: string,
    user: User,
}