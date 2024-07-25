import { IBlockProps } from '@shared/lib/Block';
import { InputField } from '@shared/partials/InputField';
import { Button } from '@shared/partials/Button';
import { Textarea } from 'shared/partials/Textarea';

export interface IMessagesFormProps extends IBlockProps {
    footerAttachInput?: InputField,
    footerTextarea: Textarea,
    footerSentBtn: Button,
}
