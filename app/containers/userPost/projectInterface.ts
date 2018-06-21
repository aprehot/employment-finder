import { IProps } from '../Login/LoginForm';

export interface IValues {
    title?: string,
    studio?: string,
    startDate?: string,
    wrapDate?: string,
    location?: string
    budget?: number,
    genres?: string,
    premise?: string,
    roles?: {
        roleType?: string,
        name?: string,
        gender?: string,
        minAge?: number,
        maxAge?: number,
        specifics?: string,
        description?: string,
        isSag?: boolean,
        isOpen?: boolean,
        isLocal?: boolean,
        isOnOffer?: boolean
    }[]

}
export interface OtherProps {
    dispatch?: (action: any) => void;
    project?: {
        projectStart: Date,
        projectEnd: Date,
        activeBtn: number
    },
    user?: {
        userFolders?: any
    }
}
export interface postProps {
    user?: IProps['user'],
    router?: IProps['router'],
    project?: IProps['project'],
    // registerField: (name: string, resetFn: (nextValues?: any) => void) => void;
    // unregisterField: (name: string) => void;
}