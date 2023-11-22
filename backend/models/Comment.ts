import { Request } from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

export interface IComment extends mongoose.Document {
  content: string
  user: mongoose.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

const CommentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Post',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)

const Comment = mongoose.model<IComment>('Comment', CommentSchema)

export default Comment
