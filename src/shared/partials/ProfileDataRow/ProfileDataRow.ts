import { Block } from '@shared/lib/Block'
import ProfileDataRowTemplate from './ProfileDataRow.hbs?raw';
import { IProfileDataRowProps } from './model';

export class ProfileDataRow extends Block {
    constructor(props: IProfileDataRowProps) {
        super(props)
    }

    render() {
        return this.compile(ProfileDataRowTemplate, this.props);
    }
}
