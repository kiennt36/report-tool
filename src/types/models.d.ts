import { EMAIL_STATUS, PROXY_STATUS } from './enums';

export interface Dawn {
  _id?: string;
  appId?: string;
  email?: string;
  points?: number;
  registerPoints?: number;
  signinPoints?: number;
  twitterPoints?: number;
  discordPoints?: number;
  telegramPoints?: number;
  bonusPoints?: number;
  epoch01Points?: number;
  refferalPoints?: number;
  totalPoints?: number;
  status?: EMAIL_STATUS;
  token?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Proxy {
  _id?: string;
  ipAddress?: string;
  v?: 4 | 6;
  status?: PROXY_STATUS;
  createdAt?: string;
  updatedAt?: string;
}
