import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET(
    request: Request,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { params }: any
  ): Promise<NextResponse> {
    const { userId } = await params;
  
    try {
      const purchase = await prisma.purchase.findMany({
        where: { userId: userId },
      });
  
      return NextResponse.json(purchase);
    } catch (err) {
      return NextResponse.json(err);
    }
  }