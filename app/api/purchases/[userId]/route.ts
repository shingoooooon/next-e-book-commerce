import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export const GET = async (request: Request, { params }: { params: { userId: string }}) => {
    const userId = params.userId;

    try {
        const purchases = await prisma.purchase.findMany({
            where: {
                userId: userId
            }
        })

        return NextResponse.json(purchases);
    } catch (err) {
        return NextResponse.json(err);
    }
}