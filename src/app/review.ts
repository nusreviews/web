export class Review {
    id: number;
    moduleId: number;
    author: string;
    comments: string;
    dateCreated: string;
    dateLastEdited: string;
    // Possibly refactor these ratings into a Rating model
    teachingTeamRating: number; 
    enjoyabilityRating: number;
    workloadRating: number;
    difficultyRating: number;
    isRecommend: boolean;
}