import { Document } from 'mongoose';
import { Request } from 'express';

export enum NotePriority {
  LOW = 'low',
  NORMAL = 'normal',
  HIGH = 'high',
  URGENT = 'urgent'
}

export interface INote extends Document {
  title: string;
  description: string;
  userId: string;
  priority: NotePriority;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface IRequest extends Request {
  userId?: string;
  user?: IUser;
}

export interface IError extends Error {
  statusCode?: number;
} 