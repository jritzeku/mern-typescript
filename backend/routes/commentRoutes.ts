import express from 'express'
import {
  getPostComments,
  createComment,
  editComment,
  deleteComment,
} from '../controllers/commentController'
import { protect, admin } from '../middlewares/authMiddleware'

const router = express.Router()

router.route('/post/:id').get(getPostComments)

router.route('/').post(protect, createComment)

router
  .route('/:id')
  .put(protect, editComment)
  .delete(protect, deleteComment)

 

export default router
