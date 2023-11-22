import { IComment } from './IComment'
import { IUser } from './IUser'

export interface ICreatePost {
  title: string
  content: string
  keywords: string |  Array<string>
}

export interface IPost {
  _id: string
  title: string
  user: IUser
  content: string
  createdAt: Date
  keywords: Array<string>
  comments: Array<IComment>
}
