import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET(
    request: Request,
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