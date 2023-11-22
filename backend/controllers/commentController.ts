import { NextFunction, Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import bcrypt from 'bcrypt'
import { IUserRequest } from '../models/User'
import Comment from '../models/Comment'
import generateToken from '../utils/generateToken'
import Post from '../models/Post'

export const getPostComments = asyncHandler(
  async (req: IUserRequest, res: Response, next: NextFunction) => {
    const { id } = req.params

    let comments = await Comment.find({ postId: id })
      .populate('user')
      .sort('-createdAt')

    res.status(200).json(comments)
  }
)

export const createComment = asyncHandler(
  async (req: IUserRequest, res: Response, next: NextFunction) => {
    console.log('Inside addComment')
    const { content, postId } = req.body

    const comment = await Comment.create({
      content,
      postId,
      user: req.user._id,
    })

    const post = await Post.findById(postId)

    post?.comments.push(comment)

    await post?.save()

    res.status(200).json(comment)
  }
)

export const editComment = asyncHandler(
  async (req: IUserRequest, res: Response, next: NextFunction) => {
    const { content } = req.body
    const { id } = req.params

    console.log('Inside editComment')
    let comment = await Comment.findById(id)

    console.log('comment: ',comment)

    if (!comment) {
      res.status(404)
      throw new Error('Comment not found!')
    }

    if (comment.user.toString() !== req.user._id.toString()) {
      res.status(404)
      throw new Error('You can not modify someone else resource')
    }

    comment = await Comment.findByIdAndUpdate(id, { content }, { new: true })

    res.status(200).json(comment)
  }
)

export const deleteComment = asyncHandler(
  async (req: IUserRequest, res: Response, next: NextFunction) => {
    const { id } = req.params

    let comment = await Comment.findById(id)

    if (!comment) {
      res.status(404)
      throw new Error('Comment not found!')
    }

    if (comment.user.toString() !== req.user._id.toString()) {
      res.status(404)
      throw new Error('You can not modify someone else resource')
    }
    await comment.remove()

    res.status(200).json(comment)
  }
)
