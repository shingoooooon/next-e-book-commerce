import { getServerSession } from "next-auth";
import Image from "next/image";
import { nextAuthOptions } from "../lib/next-auth/options";
import { BookType, Purchase, User } from "../types/types";
import { getDetailBook } from "../lib/microcms/clients";
import Book from "../components/Book";
import PurchaseBook from "../components/PurchaseBook";

export default async function ProfilePage() {
  const session = await getServerSession(nextAuthOptions);
  const user = session?.user as User;

  let purchaseBooks: BookType[] = [];

  if (user) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/purchases/${user.id}`
    );
    const purchasesData = await res.json();

    purchaseBooks = await Promise.all(
      purchasesData.map(async (purchase: Purchase) => {
        return await getDetailBook(purchase.bookId);
      })
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Profile</h1>

      <div className="bg-white shadow-md rounded p-4">
        <div className="flex items-center">
          <Image
            priority
            src={user.image || "/default_icon.png"}
            alt="user profile_icon"
            width={60}
            height={60}
            className="rounded-full"
          />
          <h2 className="text-lg ml-4 font-semibold">Name：{user.name}</h2>
        </div>
      </div>

      <span className="font-medium text-lg mb-4 mt-4 block">My Books</span>
      {purchaseBooks?.map((purchaseBook: BookType) => {
        return (
          <div className="flex items-center gap-6">
            <PurchaseBook
              key={purchaseBook.id}
              purchaseBook={purchaseBook}
            />
          </div>
        )
      })}
    </div>
  );
}