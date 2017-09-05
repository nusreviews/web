export class User {
    id: number;
    username: string;
    email: string;

    constructor(
        userId,
        displayName,
        email,
    ) {
        this.id = userId;
        this.username = displayName;
        this.email = email;
    }

    public static deserialiseJson(jsonObject: JSON) {
        let review = new User(
            jsonObject['userId'],
            jsonObject['displayName'],
            jsonObject['email'],
        ) 
        return review;
    }
}