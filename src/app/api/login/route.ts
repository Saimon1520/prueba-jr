import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
    const { email, password } = await request.json(); // Obtener datos del cuerpo de la solicitud

    try {
        // Buscar al usuario por email usando Prisma
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return new Response(
                JSON.stringify({ message: 'Email not found' }),
                { status: 404 }
            );
        }

        // Validar la contraseña cifrada
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return new Response(
                JSON.stringify({ message: 'Invalid password' }),
                { status: 401 }
            );
        }

        // Respuesta si la validación es exitosa
        return new Response(
            JSON.stringify({
                message: 'Login successful',
                userId: user.id, // Aquí estamos enviando el id del usuario
                login: true, // Indicamos que el login fue exitoso
            }),
            { status: 200 }
        );
    } catch (error) {
        console.error('Error during login:', error);
        return new Response(
            JSON.stringify({ message: 'Internal server error' }),
            { status: 500 }
        );
    }
}

