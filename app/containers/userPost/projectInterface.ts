import { IProps } from '../Login/LoginForm';
import { SSL_OP_LEGACY_SERVER_CONNECT } from 'constants';

export interface IValues {
    handleForm?: (action: any, action2: number) => void,
    rolePressed?: boolean,
    hadCD?: boolean,
    title?: string,
    studio?: string,
    parentCategory?: string,
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
}
export interface postProps {
    user?: IProps['user'],
    router?: IProps['router'],
    project?: IProps['project'],
    handleForm?: (action: any, action2: number) => void,
    userFolders?: IProps['user']['userFolders'],
}
export interface ITeam {
    job: string,
    name: string,
    email: string,
    priviledge: [string]
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
    user?: any,
    postProject?: (action: any) => void,
    projectData?: [
        {
            projectType: string
        },
        {
            parentCategory: string,
            parentFolder: string,
            studio: string,
            title: string,
            hasCD: boolean,
        },
        {
            budget: number,
            genres: string,
            location: string,
            premise: string,
            startDate: string,
            wrapDate: string,
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
                priviledge: Priviledge,
                email: string,
                job: string,
                name: string
            }]
        }
    ]
}

enum Priviledge { 'admin', 'collab', 'viewer', 'downloader' }