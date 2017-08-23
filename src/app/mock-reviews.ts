import { Review } from './review';

export const REVIEWS: Review[] = [
    {
        id: 0,
        moduleId: 0,
        author: "See Soon Kiat",
        comments: "Enjoyable module, 10/10 would take again.",
        dateCreated: "29/08/2017",
        dateLastEdited: "29/08/2017",
        teachingTeamRating: 5,
        enjoyabilityRating: 5,
        workloadRating: 5,
        difficultyRating: 5,
        isRecommend: true
    },
    {
        id: 1,
        moduleId: 3,
        author: "See Choon Kiat",
        comments: "Bad module, 0/10 would scold Wai Kay again.",
        dateCreated: "19/08/2017",
        dateLastEdited: "30/08/2017",
        teachingTeamRating: 1,
        enjoyabilityRating: 2.5,
        workloadRating: 5,
        difficultyRating: 5,
        isRecommend: false
    },
];