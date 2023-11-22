import { IUser } from './IUser'

export interface ICreateComment {
  postId: string | undefined
  content: string
}

export interface IComment {
  _id: string
  content: string
  postId: string
  user: IUser
}
