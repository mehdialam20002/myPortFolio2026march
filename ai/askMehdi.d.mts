export interface AskResult {
  ok: boolean;
  status: number;
  answer?: string;
  error?: string;
  detail?: string;
}

export function askMehdi(messages: unknown): Promise<AskResult>;
