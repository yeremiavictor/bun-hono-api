//import hono
import {Hono} from 'hono'

//import controller
import {getPosts, createPosts, getPostById, updatePost, deletePost} from '../controllers/PostController'

//initialize router
const router = new Hono()

//routes posts index
router.get('/',(c) => getPosts(c))

// routes post create
router.post('/', (c)=> createPosts(c))

// routes post create
router.get('/:id', (c)=> getPostById(c))

// routes post create
router.patch('/:id', (c)=> updatePost(c))

//routes hapus
router.delete('/:id', (c)=> deletePost(c))

export const Routes = router


