import { NextFunction, Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import bcrypt from 'bcrypt'
import { IUserRequest } from '../models/User'
import Post from '../models/Post'
import generateToken from '../utils/generateToken'

export const createPost = asyncHandler(
  async (req: IUserRequest, res: Response, next: NextFunction) => {
    console.log('Inside createPost')
    const { title, content, keywords } = req.body

    console.log('req body', req.body)

    //removes duplicates and lowercases every entry
    let keywordsUnique = [
      ...new Set(
        keywords.split(',').map((word: any) => word.trim().toLowerCase())
      ),
    ]

    console.log('keywordsSet:', keywordsUnique)

    console.log('req body: ', req.body)

    const post = await Post.create({
      title,
      content,
      keywords: keywordsUnique,
      user: req.user._id,
    })

    console.log('post', post)
    res.status(200).json(post)
  }
)

export const editPost = asyncHandler(
  async (req: IUserRequest, res: Response, next: NextFunction) => {
    console.log('Inside editPost()')
    const { title, content, keywords } = req.body
    const { id } = req.params

    let post: any = await Post.findById(id)

    if (!post) {
      res.status(404)
      throw new Error('Post not found!')
    }

    post = await Post.findByIdAndUpdate(
      id,
      { title, content, keywords },
      { new: true }
    )

    console.log('post:', post)

    if (post.user.toString() !== req.user._id.toString()) {
      res.status(404)
      throw new Error('You can not modify someone else resource')
    }

    res.status(200).json(post)
  }
)

export const getPost = asyncHandler(
  async (req: IUserRequest, res: Response, next: NextFunction) => {
    const { id } = req.params

    const post = await Post.findById(id).populate('user').populate('comments')

    if (!post) {
      res.status(404)
      throw new Error('Post not found')
    }

    res.status(200).json(post)
  }
)

export const deletePost = asyncHandler(
  async (req: IUserRequest, res: Response, next: NextFunction) => {
    const { id } = req.params

    const post: any = await Post.findById(id)
    console.log('post user', post.user)
    console.log('req.user id', req.user.id)

    if (!post) {
      res.status(404)
      throw new Error('Post not found')
    }

    if (post.user.toString() !== req.user._id.toString()) {
      res.status(404)
      throw new Error('You can not modify someone else resource')
    }

    await post.remove()

    res.status(200).json(post)
  }
)

export const getMyPosts = asyncHandler(
  async (req: IUserRequest, res: Response, next: NextFunction) => {
    const posts = await Post.find({ user: req.user._id })
      .populate('user')
      .populate('comments')
    res.status(200).json(posts)
  }
)

export const getPosts = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const posts = await Post.find({}).populate('user').sort('-createdAt')

    res.status(200).json(posts)
  }
)
