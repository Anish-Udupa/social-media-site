import PostInteraction from '../controllers/posts.js';
import express from 'express';
const router = express.Router();

import PostSchema from '../models/posts.js';
import User from '../models/user.js';

import { login_required } from '../api/auth.js';
import multer_upload from '../lib/multer_upload.js';
// const multer_upload = multer({ dest: 'post-pics/' })

import { getAllTransactions, savePostInBlockchain } from '../utils/Blockchain.js';

router.get('/get/:post_id', async (req, res, next) => {
    if (req.params.post_id != null) {
        const post1 = await PostSchema.findOne({ _id: req.params.post_id });
        const post = post1.toJSON();
        // console.log(post)

        if (post != null) {
            const posts_in_blockchain = await getAllTransactions();
            const filtered_post = posts_in_blockchain.filter(_post => _post.username == post.username && _post.desc == post.desc && _post.pic == post.pic)
            // console.log(post);
            // console.log(filtered_post);

            if(filtered_post != null && filtered_post.length > 0) {
                res.send({ ...post, verified: true})
            }
            else {
                res.send({ ...post, verified: false})
            } 
            // res.send({, verified: true})
            // console.log("\n\n\n\n")
        } else {
            next(new Error('Invalid post id'));
        }
    } else {
        next(new Error('Invalid post id'));
    }

});

//routing the path
router.post(
    '/create',
    login_required,
    multer_upload.single('photo'),
    async (req, res) => {
        // console.log('Here!!');
        if (!req.file) {
            res.send('File not found.');
            return;
        }
        console.log(req.file);

        const user = await User.findOne({
            username: res.locals.token_data.username,
        });

        const posts1 = {
            username: user.username,
            desc: req.body.desc,
            pic: req.file.filename,
            comments: [],
            likes_count: 0,
            comments_count: 0,
        };
        console.log(posts1);

        const Interaction = new PostSchema(posts1); //convert the request body into schema

        try {
            const newInteraction = await Interaction.save(); //save the schema in mongodb
            user.posts.push(Interaction._id);
            await user.save();

            // Deploy post on blockchain
            savePostInBlockchain(user.username, req.body.desc, req.file.filename);
            res.status(200).json(newInteraction);
        } catch (err) {
            console.log(err);
            res.send(err);
        }
    }
);

// For testing the blockchain
router.get("/test", async (req, res) => {
    // sendTransactionToBlockchain();
    const ret = await getAllTransactions();
    // console.log(ret[1].username)
    res.send(ret);
})

export default router;
