const express = require('express');
const PostModel = require('../models/PostModel');
const UserModel = require('../models/UserModel');
const router = express.Router();

//create a post
router.post('/', async (req, res) => {
    const newPost = await new PostModel(req.body)
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost)
    } catch (err) {
        res.status(500).json(err)
    }
})
//update a post
router.put("/:id", async (req, res) => {
    try {
        const post = await PostModel.findById(req.params.id);
    if (post.userId === req.body.userId) {
        await post.updateOne({
            $set: req.body
        })
        res.status(200).json("Your post has been updated")
    } else {
        res.status(403).json("You can only update your post")
    }
    } catch (err) {
        res.status(500).json(err)
    }
})
//delete a post
router.delete("/:id", async (req, res) => {
    try {
        const post = await PostModel.findById(req.params.id);
    if (post.userId === req.body.userId) {
        await post.deleteOne()
        res.status(200).json("Your post has been deleted")
    } else {
        res.status(403).json("You can only delete your post")
    }
    } catch (err) {
        res.status(500).json(err)
    }
})
//like/ unlike a post
router.put("/:id/like", async (req, res) => {
    try {
        const post = await PostModel.findById(req.params.id);
        
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } })
            res.status(200).json("The post has been liked")
        } else {
            await post.updateOne({ $pull: { likes: req.body.userId } })
            res.send(200).json("The post has been unliked")
        }

    } catch (err) {
        res.send(500).json(err)
    }    
})
//get a post
router.get("/:id", async (req, res) => {
    try {
        const post = await PostModel.findById(req.params.id);
        res.status(200).json(post)
    } catch (err) {
       res.status(500).json(err) 
    }
})
//get timeline posts
router.get("/timeline/all", async (req, res) => {
    let postArray = [];
    try {
        const currentUser = await UserModel.findById(req.body.userId);
        const userPosts = await PostModel.find({ userId: currentUser._id })
        const friendPosts = await Promise.all(
            currentUser.following.map(friendId => {
                return PostModel.find({userId: friendId})
            })
        )
        res.json(userPosts.concat(...friendPosts))
    } catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router;
