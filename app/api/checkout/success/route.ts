// import prisma from "@/app/lib/prisma"
import prisma from "../../../lib/prisma"
import { NextResponse } from "next/server"
import Stripe from "stripe"
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/app/lib/next-auth/options";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// save purchase history
export async function POST(req: Request) {
    try {
        const session = await getServerSession(nextAuthOptions);
        
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        
        const { sessionId } = await req.json();
        const stripeSession = await stripe.checkout.sessions.retrieve(sessionId);

        if (!stripeSession?.metadata?.bookId) {
            return NextResponse.json(
                { error: "No bookId found in session" },
                { status: 400 }
            );
        }

        const userId = stripeSession.client_reference_id;
        const bookId = stripeSession.metadata?.bookId;

        // ユーザーの取得または作成
        let user = await prisma.user.findUnique({
            where: { email: session.user.email },
            });

            if (!user) {
            user = await prisma.user.create({
                data: {
                    id: userId!,
                    email: session.user.email!,
                    name: session.user.name || "",
                    image: session.user.image || "",
                },
            });
        }

        const existPurchase = await prisma.purchase.findFirst({
            where: {
                userId: userId!,
                bookId: bookId,
            }
        })

        if (!existPurchase) {
            // 購入記録の作成
            const purchase = await prisma.purchase.create({
                data: {
                    userId: user.id,
                    bookId: stripeSession.metadata.bookId,
                },
            });
            console.log('purchase');
            console.log(purchase);
            return NextResponse.json({ purchase });
        } else {
            return NextResponse.json({ message: 'This book is already purchased'})
        }

    } catch (error) {
        console.error("Checkout success error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}