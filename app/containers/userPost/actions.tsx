export const HANDLE_START_DATE = 'HANDLE_START_DATE';
export const HANDLE_END_DATE = 'HANDLE_END_DATE';
export const POST_PROJECT = 'POST_PROJECT';

export const handleStartDate = (projectStart: any) => ({ type: HANDLE_START_DATE, projectStart });
export const handleEndDate = (projectEnd: any) => ({ type: HANDLE_END_DATE, projectEnd });
export const postProj = (project: any) => ({ type: POST_PROJECT, project });

