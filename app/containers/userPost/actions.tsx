// export const HANDLE_PROJ_TYPE = 'HANDLE_PROJ_TYPE';
export const HANDLE_START_DATE = 'HANDLE_START_DATE';
export const HANDLE_END_DATE = 'HANDLE_END_DATE';

// export const handleProjectType = (projectType: string) => ({ type: HANDLE_PROJ_TYPE, projectType });
export const handleStartDate = (projectStart: any) => ({ type: HANDLE_START_DATE, projectStart });
export const handleEndDate = (projectEnd: any) => ({ type: HANDLE_END_DATE, projectEnd });

