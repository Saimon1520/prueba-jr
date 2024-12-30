import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const comments = await prisma.comment.findMany();
        return NextResponse.json(comments);
    } catch (error) {
        console.error("Error al obtener comentarios:", error);
        return NextResponse.json(
            { error: "Hubo un error al obtener los comentarios." },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    const { postId, name, email, body } = await request.json();

    try {
        const newComment = await prisma.comment.create({
            data: {
                postId,
                name,
                email,
                body,
            },
        });
        return NextResponse.json(newComment, { status: 201 });
    } catch (error) {
        console.error("Error al crear comentario:", error);
        return NextResponse.json(
            { error: "Hubo un error al crear el comentario." },
            { status: 500 }
        );
    }
}

export async function PATCH(request: Request) {
    const { id, name, email, body } = await request.json();

    if (!id || isNaN(id)) {
        return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    try {
        const updatedComment = await prisma.comment.update({
            where: { id },
            data: { name, email, body },
        });
        return NextResponse.json(updatedComment);
    } catch (error) {
        console.error("Error al editar comentario:", error);
        return NextResponse.json(
            { error: "Hubo un error al editar el comentario." },
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const { id } = await request.json();
    if (isNaN(id)) {
        return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    try {
        await prisma.comment.delete({
            where: { id },
        });
        return NextResponse.json({ message: "Comentario eliminado con éxito" });
    } catch (error) {
        console.error("Error al eliminar comentario:", error);
        return NextResponse.json(
            { error: "Hubo un error al eliminar el comentario." },
            { status: 500 }
        );
    }
}
