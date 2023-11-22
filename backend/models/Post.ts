import mongoose from 'mongoose'
import { IComment } from '../models/Comment'

export interface IPost extends mongoose.Document {
  title: string
  content: string
  keywords: [string]
  user: mongoose.Types.ObjectId
  comments: [IComment]
  createdAt: Date
  updatedAt: Date
}

const PostSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    keywords: [
      {
        type: String,
      },
    ],

    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  {
    timestamps: true,
  }
)

const Post = mongoose.model<IPost>('Post', PostSchema)

export default Post
