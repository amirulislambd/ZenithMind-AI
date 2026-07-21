export interface IMessage {
  role: "user" | "assistant" | "model";
  content: string;
  timestamp?: number | string;
}

export interface IChatSession {
  userId: string;
  messages: IMessage[];
}
export interface PlanStep {
  title: string;
  detail: string;
}
