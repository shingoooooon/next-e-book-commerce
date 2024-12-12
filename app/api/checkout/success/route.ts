// import prisma from "@/app/lib/prisma"
import prisma from "../../../lib/prisma"
import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// save purchase history
export const POST = async (request: Request) => {
    const { sessionId } = await request.json();

    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);


        const userId = session.client_reference_id;
        const bookId = session.metadata?.bookId;

        if (!userId || !bookId) {
            throw new Error("Missing required session data: userId or bookId");
        }

        const existPurchase = await prisma.purchase.findFirst({
            where: {
                userId: userId,
                bookId: bookId,
            }
        })

        if (!existPurchase) {
            const purchase = await prisma.purchase.create({
                data: {
                    userId: userId,
                    bookId: bookId,
                }
            })
            return NextResponse.json({ purchase });
        } else {
            NextResponse.json({ message: 'This book is already purchased'})
        }
    } catch (err) {
        return NextResponse.json(err);
    }
}