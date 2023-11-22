import express from 'express'
import {
  createPost,
  editPost,
  getPost,
  getPosts,
  getMyPosts,
  deletePost
} from '../controllers/postController'
import { protect, admin } from '../middlewares/authMiddleware'

const router = express.Router()

router.route('/').post(protect, createPost).get(getPosts)
router.route('/myPosts').get(protect, getMyPosts)
router
  .route('/:id')
  .get(getPost)
  .put(protect, editPost)
  .delete(protect, deletePost)

export default router
