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
}