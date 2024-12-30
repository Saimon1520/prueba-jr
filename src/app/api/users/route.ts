import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

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
            name,
            email,
            username,
            password,
            phone,
            website,
            address,
            company,
        } = await request.json();
        
        const { street, suite, city, zipcode, geo } = address || {};
        const { lat, lng } = geo || {};
        
        const { name: companyName, catchPhrase, bs } = company || {};
        
        console.log(name);
        console.log(companyName);
        console.log(lat, lng);
        
        
        

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
        

        if (!name || !email || !username || !password) {
            return NextResponse.json(
                { error: "Name, email, username, and password are required" },
                { status: 400 }
            );
        }

        if (!street || !suite || !city || !zipcode) {
            return NextResponse.json(
                { error: "Address fields are required" },
                { status: 400 }
            );
        }

        if (!companyName) {
            return NextResponse.json(
                { error: "Company name is required" },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                username,
                password: hashedPassword,
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

        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
    }
}

