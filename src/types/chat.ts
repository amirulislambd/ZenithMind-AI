export interface IMessage {
  role: 'user' | 'model';
  content: string;
  timestamp: string; // ISO
}

export interface IChatSession {
  userId: string;
  messages: IMessage[];
}
