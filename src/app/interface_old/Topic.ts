export interface Topic{
    tid:number;
    name:string;
}
export interface TopicCard extends Topic{
    iconUrl:string;
    numberOfComments:number;
    follow:boolean;
    introduction?: string;
}