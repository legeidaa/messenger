import { Avatar, Button } from '@shared/partials/index.ts';
import { Block, IBlockProps } from '@shared/lib/Block/index.ts';
import { Form } from '@shared/partials/Form/index.ts';

export interface IProfilePageProps extends IBlockProps {
    asideButton: Button
    avatar: Avatar,
    profileName: string,
    profileFooter: Block,
    form: Form
}
