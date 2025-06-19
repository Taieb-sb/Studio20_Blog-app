import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { MongoClient, ObjectId } from 'mongodb';
 
const client = new MongoClient(process.env.MONGODB_URI!);
 
// GET - Fetch single post
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await client.connect();
    const posts = client.db().collection('posts');
    const post = await posts.findOne({ _id: new ObjectId(params.id) });
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
 
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
  } finally {
    await client.close();
  }
}
 
// PUT - Update post
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
 
  try {
    const { title, content } = await request.json();
    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }
 
    await client.connect();
    const posts = client.db().collection('posts');
 
    // First check if post exists and user is author
    const existingPost = await posts.findOne({ _id: new ObjectId(params.id) });
    if (!existingPost) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
 
    if (existingPost.authorId !== session.user?.id) {
      return NextResponse.json({ error: 'Forbidden: You can only edit your own posts' }, { status: 403 });
    }
 
    // Update the post
    const result = await posts.updateOne(
      { _id: new ObjectId(params.id) },
      { 
        $set: { 
          title, 
          content, 
          updatedAt: new Date() 
        } 
      }
    );
 
    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
 
    // Fetch and return updated post
    const updatedPost = await posts.findOne({ _id: new ObjectId(params.id) });
    return NextResponse.json(updatedPost);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
  } finally {
    await client.close();
  }
}
 
// DELETE - Delete post
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
 
  try {
    await client.connect();
    const posts = client.db().collection('posts');
 
    // Check if post exists and user is author
    const existingPost = await posts.findOne({ _id: new ObjectId(params.id) });
    if (!existingPost) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
 
    if (existingPost.authorId !== session.user?.id) {
      return NextResponse.json({ error: 'Forbidden: You can only delete your own posts' }, { status: 403 });
    }
 
    // Delete the post
    const result = await posts.deleteOne({ _id: new ObjectId(params.id) });
 
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
 
    return NextResponse.json({ message: 'Post deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  } finally {
    await client.close();
  }
}