import express from 'express'
import { protectRoute } from '../middleware/protectRoute.js'
import { commentOnPost, createPost, deletePost, getAllPosts, getFollowingPosts, getLikedPosts, getUserPosts, likeUnlikePost } from '../controllers/post.controller.js'
import multer from 'multer';

// Configure multer for file uploads
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({  storage: storage  });
const router =express.Router()

router.get("/all",protectRoute,getAllPosts)
router.get("/following",protectRoute,getFollowingPosts)
router.get("/likes/:id",protectRoute,getLikedPosts)
router.get("/user/:username",protectRoute,getUserPosts)
router.post('/create',protectRoute,upload.single('image'),createPost)
router.post('/like/:id',protectRoute,likeUnlikePost)
router.post('/comment/:id',protectRoute,commentOnPost)
router.delete('/:id',protectRoute,deletePost)
export default router