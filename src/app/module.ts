export class Module {
    id: number;
    code: string;
    modName: string;
    //modCredits: number;
    //////////////////////description: string;
    //professor: string;
    //lastTaught: string;
    lastReviewed: string;
    overallVerdict: string; // recommend, not-recommend
    percentageRecommend: number;
    teachingRating: number;
    enjoyabilityRating: number;
    difficultyRating: number;
    workloadRating: number;

    constructor(id: number, 
                modName: string,
                description: string,
                lastReviewed: string,
                percentageRecommend: number,
                teachingRating: number,
                enjoyabilityRating: number,
                difficultyRating: number,
                workloadRating: number) {
                    this.id = id;
                    this.modName = modName;
                    //this.description = description;
                    this.lastReviewed = lastReviewed;
                    this.percentageRecommend = percentageRecommend;
                    this.teachingRating = teachingRating;
                    this.enjoyabilityRating = enjoyabilityRating;
                    this.difficultyRating = difficultyRating;
                    this.workloadRating = workloadRating;
                }
    
    private getOverallVerdict() {
        if (this.percentageRecommend >= 50) {
            return 'recommend';
        } else {
            return 'not-recommend';
        }
    }

    private getRoundedPercentage() {
        return Math.round(this.percentageRecommend);
    }

    public static deserialiseJson(jsonObject: JSON) {
        let avgTeaching = 0;
        let avgEnjoyability = 0;
        let avgDifficulty = 0;
        let avgWorkload = 0;

        if (jsonObject['avgTeaching']) {
            avgTeaching = jsonObject['avgTeaching'];
        }

        if (jsonObject['avgEnjoyability']) {
            avgEnjoyability = jsonObject['avgEnjoyability'];
        }

        if (jsonObject['avgDifficulty']) {
            avgDifficulty = jsonObject['avgDifficulty'];
        }

        if (jsonObject['avgWorkload']) {
            avgWorkload = jsonObject['avgWorkload'];
        }

        let module = new Module(jsonObject['modId'],
                                jsonObject['name'],
                                jsonObject['description'],
                                jsonObject['dateUpdated'],
                                jsonObject['percentage'],
                                avgTeaching,
                                avgEnjoyability,
                                avgDifficulty,
                                avgWorkload);
        
        return module;
    }

}