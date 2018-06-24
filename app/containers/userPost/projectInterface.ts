import { IProps } from '../Login/LoginForm';

export interface IValues {
    handleForm?: (action: any, action2: number) => void,
    // userFolders?: any
    rolePressed?: boolean,
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
        minAge?: number | null,
        maxAge?: number | null,
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
    // userFolders?: any
}
export interface postProps {
    user?: IProps['user'],
    router?: IProps['router'],
    project?: IProps['project'],
    handleForm?: (action: any, action2: number) => void,
    userFolders?: IProps['user']['userFolders'],
    // dispatch?: (action: any) => void,
    // errors?: any
    // registerField: (name: string, resetFn: (nextValues?: any) => void) => void;
    // unregisterField: (name: string) => void;
}
export interface ITeam {
    job: string,
    name: string,
    email: string,
    Admin: boolean,
    Collaborator: boolean
}
export interface IRole {
    roleType: string,
    name: string,
    gender: string,
    ages: number[],
    specifics: string,
    description: string,
    isSag: boolean,
    isOpen: boolean,
    isLocal: boolean,
    isOnOffer: boolean
}


export interface IOverviewProps {
    postProject?: (action: any, action2: number) => void,
    projectData?: [
        {
            projectType: string
        },
        {
            parentCategory: string,
            parentFolder: string,
            studio: string,
            title: string
        },
        {
            budget: number,
            genres: string,
            location: string,
            premise: string,
            startDate: string,
            wrapDate: string
        },
        {
            roles: [{
                ages: number[],
                description: string,
                gender: string,
                isLocal: boolean,
                isOnOffer: boolean,
                isOpen: boolean,
                isSag: boolean,
                name: string,
                roleType: string,
                specifics: string
            }]
        },
        {
            teams: [{
                Admin: boolean,
                Collaborator: boolean,
                email: string,
                job: string,
                name: string
            }]
        }
    ]
}