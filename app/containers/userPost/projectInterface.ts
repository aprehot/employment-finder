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

    user?: IReduxProps['user'],
    router?: IReduxProps['router'],
    project?: IReduxProps['project'],
    handleForm?: (action: any, action2: number) => void,
    userFolders?: IReduxProps['user']['userFolders'],
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

export interface IReduxProps {
    dispatch?: (action: any) => void;
    router?: {
        location?: {
            pathname: string
        }
    };
    user?: {
        payload?: {
            isAuth: boolean,
            id: string,
            message?: string
        },
        userFolders?: {
            ownerId: string
            folderName: string
            category: string
            _id: string,
        }[],
        folderContents?: {
            projects: actualProjectModel
        },
        userUpdates?: {
            text: string;
            image: string;
            time: string;
            _id: string;
        }[]

    };
    project?: {
        projectType: string,
        projectStart: Date,
        projectEnd: Date,
        projectRoles: {}[],
        activeBtn: number,
        projectData: any,
        projectId: any
    }
    folderContents?: actualProjectModel[]
}


export interface actualProjectModel {
    map?: any,
    projects?: {
        _id: any,

        projectType: string


        parentCategory: string,
        parentFolder: string,
        studio: string,
        title: string,
        hasCD: boolean,


        budget: number,
        genres: string,
        location: string,
        premise: string,
        startDate: string,
        wrapDate: string,


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
        teams: [{
            priviledge: Priviledge,
            email: string,
            job: string,
            name: string
        }]
    }
}


enum Priviledge { 'admin', 'collab', 'viewer', 'downloader' }