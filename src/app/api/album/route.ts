import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const albums = await prisma.album.findMany();
        return NextResponse.json(albums);
    } catch (error) {
        console.error('Error al obtener álbumes:', error);
        return NextResponse.json({ error: 'Hubo un error al obtener los álbumes.' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const { title, userId } = await request.json();

    if (!title || !userId) {
        return NextResponse.json({ error: 'El título y el userId son obligatorios.' }, { status: 400 });
    }

    try {
        const newAlbum = await prisma.album.create({
            data: {
                title,
                userId,
            },
        });
        return NextResponse.json(newAlbum, { status: 201 });
    } catch (error) {
        console.error('Error al crear álbum:', error);
        return NextResponse.json({ error: 'Hubo un error al crear el álbum.' }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    const { id, title } = await request.json();
    console.log(id);
    console.log(title);
    try {
        const updatedAlbum = await prisma.album.update({
            where: { id },
            data: { title }
        });
        return NextResponse.json(updatedAlbum);
    } catch (error) {
        console.error('Error al editar álbum:', error);
        return NextResponse.json({ error: 'Hubo un error al editar el álbum.' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    const { id } = await request.json();

    if (!id) {
        return NextResponse.json({ error: 'El id es obligatorio.' }, { status: 400 });
    }

    try {
        await prisma.album.delete({
            where: { id },
        });
        return NextResponse.json({ message: 'Álbum eliminado correctamente.' });
    } catch (error) {
        console.error('Error al eliminar álbum:', error);
        return NextResponse.json({ error: 'Hubo un error al eliminar el álbum.' }, { status: 500 });
    }
}