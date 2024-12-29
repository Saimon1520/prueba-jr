import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs'; // Asegúrate de instalar bcryptjs para la encriptación

export async function GET() {
    try {
        const users = await prisma.user.findMany();
        return NextResponse.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const {
            name,  // El nombre principal
            email,
            username,
            password,
            phone,
            website,
            address,  // Recibe todo el objeto address
            company,  // Recibe todo el objeto company
        } = await request.json();
        
        // Accede a los valores dentro de address
        const { street, suite, city, zipcode, geo } = address || {};
        const { lat, lng } = geo || {};  // Accede a lat y lng dentro de geo
        
        // Accede a los valores dentro de company
        const { name: companyName, catchPhrase, bs } = company || {};  // Desestructuración con alias para company name
        
        console.log(name);          // Nombre principal
        console.log(companyName);   // Nombre de la empresa (con alias)
        console.log(lat, lng);      // Latitud y longitud dentro de geo
        
        
        

        console.log('Datos recibidos del frontend:', {
            name,
            email,
            username,
            password,
            phone,
            website,
            address,
            company
        });
        

        // Validación de datos
        if (!name || !email || !username || !password) {
            return NextResponse.json(
                { error: "Name, email, username, and password are required" },
                { status: 400 }
            );
        }

        // Validación de la dirección
        if (!street || !suite || !city || !zipcode) {
            return NextResponse.json(
                { error: "Address fields are required" },
                { status: 400 }
            );
        }

        // Validación de la empresa
        if (!companyName) {
            return NextResponse.json(
                { error: "Company name is required" },
                { status: 400 }
            );
        }

        // Encriptar la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear la dirección, geo y empresa como subregistros
        const user = await prisma.user.create({
            data: {
                name,
                email,
                username,
                password: hashedPassword, // Contraseña encriptada
                phone,
                website,
                address: {
                    create: {
                        street,
                        suite,
                        city,
                        zipcode,
                        geo: {
                            create: {
                                lat,
                                lng,
                            },
                        },
                    },
                },
                company: {
                    create: {
                        name: companyName,
                        catchPhrase,
                        bs,
                    },
                },
            },
            include: {
                address: {
                    include: {
                        geo: true,
                    },
                },
                company: true,
            },
        });

        return NextResponse.json(user);
    } catch (error) {
        console.error("Error creating user:", error);

        // Si el error es de tipo Prisma, mostrar el error de manera más clara
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
    }
}

