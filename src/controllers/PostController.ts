//import context
import { Context } from "hono"

//import prisma client
import prisma from "../../prisma/client"

//ambil seluruh data dalam posts
export const getPosts = async(c: Context) => {
  try{
    //get all posts
    const posts = await prisma.post.findMany({orderBy: {id:'desc'}})

    //return JSON
    return c.json({
      success: true,
      message: 'List data posts',
      data: posts
    },200)
  }catch(e: unknown){
    console.error(`Error getting posts: ${e}`)
    
  }
}

//create post
export async function createPosts(c: Context){
  try{
    //cek body request
    const body = await c.req.parseBody();

    //cek kalau title dan kontent adalah string
    const title = typeof body['title'] === 'string' ? body['title'] : ""
    const content = typeof body['content'] === 'string' ? body['content'] : ""

    //create post
    const post = await prisma.post.create({
      data: {
        title: title,
        content: content,
      }
    })

    //return JSON
    return c.json({
      success: true, 
      message: 'post berhasil dibuat',
      data: post
    },201)
  }catch(e:unknown){
    console.error(`Gagal membuat post: ${e}`)
  }
}


//get post by id
export async function getPostById(c: Context){
  try{
    //Konversi tipe id menjadi number
    const postId = parseInt(c.req.param('id'))

    //get post by id
    const post = await prisma.post.findUnique({
      where: {id:postId},
    })
    
    // if post not found
    if(!post){
      //return JSON
      return c.json({
        success:false,
        message: 'Post tidak ditemukan',
      },404)
    }

    //return JSON
    return c.json({
      success: true,
      message: `Detail data post by ID: ${postId}`,
      data:post
    },200)
  }catch(e:unknown){
    console.error(`Error mencari post: ${e}`)
  }
}

//update post
export async function updatePost(c: Context){
  try{
    //konversi id jadi number
    const postId = parseInt(c.req.param('id'))

    //get body request
    const body = await c.req.parseBody()

    //cek ketika title dan konten adalah string
    const title = typeof body['title'] === 'string' ?  body['title'] :''
    const content = typeof body['content'] === 'string' ?  body['content'] :''

    //update post with prisma
    const post = await prisma.post.update({
      where: {id:postId},
      data: {
        title: title,
        content: content,
        updatedAt: new Date(),
      },
    })

    //return JSON
    return c.json({
      success: true,
      message: 'Post berhasil diperbarui',
      data:post
    },200)

  }catch(e:unknown){
    console.error(`Gagal update post: ${e}`)

  }
}

// Delete
export async function deletePost(c:Context){
  try{
    //konversi id jadi number
    const postId = parseInt(c.req.param('id'))

    //delete post dengan prisma
    await prisma.post.delete({
      where: {id:postId},
    })

    //kembalikan json
    return c.json({
      success: true,
      message: 'Berhasil menghapus post'
    },200)

  }catch(e:unknown){
    console.error(`Error deleting post: ${e}`)
  }
}