import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const posts = await prisma.post.findMany();
        return NextResponse.json(posts);
    } catch (error) {
        console.error('Error al obtener publicaciones:', error);
        return NextResponse.json({ error: 'Hubo un error al obtener las publicaciones.' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const { title, body, userId } = await request.json();

    console.log('Datos recibidos:', { title, body });
    
    try {
        const newPost = await prisma.post.create({
            data: {
                title,
                body,
                userId,
            },
        });

        if (!newPost) {
            console.error('No se pudo crear la publicación.');
            return NextResponse.json({ error: 'Hubo un error al crear la publicación.' }, { status: 500 });
        }

        console.log('Publicación creada:', newPost);
        return NextResponse.json(newPost, { status: 201 });
    } catch (error) {
        console.error('Error al crear publicación:', error);
        return NextResponse.json({ error: 'Hubo un error al crear la publicación.' }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    const { id, title, body } = await request.json();

    try {
        const updatedPost = await prisma.post.update({
            where: { id },
            data: { title, body },
        });
        return NextResponse.json(updatedPost);
    } catch (error) {
        console.error('Error al editar publicación:', error);
        return NextResponse.json({ error: 'Hubo un error al editar la publicación.' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    const { id } = await request.json();

    try {
        await prisma.post.delete({
            where: { id },
        });
        return NextResponse.json({ message: 'Publicación eliminada.' });
    } catch (error) {
        console.error('Error al eliminar publicación:', error);
        return NextResponse.json({ error: 'Hubo un error al eliminar la publicación.' }, { status: 500 });
    }
}
