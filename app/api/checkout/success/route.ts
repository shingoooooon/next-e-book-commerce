// import prisma from "@/app/lib/prisma"
import prisma from "../../../lib/prisma"
import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// save purchase history
export const POST = async (request: Request, response: Response) => {
    const { sessionId } = await request.json();

    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        const existPurchase = await prisma.purchase.findFirst({
            where: {
                userId: session.client_reference_id!,
                bookId: session.metadata?.bookId!,
            }
        })

        if (!existPurchase) {
            const purchase = await prisma.purchase.create({
                data: {
                    userId: session.client_reference_id!,
                    bookId: session.metadata?.bookId!,
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