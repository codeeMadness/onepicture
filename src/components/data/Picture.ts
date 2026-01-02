export interface Picture {
    ID: string;
    Priority: number;
    Name: string;
    Status: string;
    TopicID: string;
    URL: string;
    Views: number;
    Prompt: string | null;
    Tags: string | null;
    Type: string | null;
}

export const isProContent = (item: Picture | null) : boolean => {
    if(item && item.Type)
        return item.Type == "PRO";
    return false;

}