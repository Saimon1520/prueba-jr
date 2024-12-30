import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
    const { email, password } = await request.json();

    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return new Response(
                JSON.stringify({ message: 'Email not found' }),
                { status: 404 }
            );
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return new Response(
                JSON.stringify({ message: 'Invalid password' }),
                { status: 401 }
            );
        }

        return new Response(
            JSON.stringify({
                message: 'Login successful',
                userId: user.id,
                login: true,
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

