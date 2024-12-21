import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BookType } from "../types/types";
import StarRating from "./StarRating";

type PurchaseBookProps = {
    purchaseBook: BookType
}

const PurchaseBook = ({ purchaseBook } : PurchaseBookProps) => {
  return (
    <Link
      href={`/book/${purchaseBook.id}`}
      className="cursor-pointer mt-5 shadow-2xl duration-300 hover:translate-y-1 hover:shadow-none"
    >
      <Image
        priority
        src={purchaseBook.thumbnail.url}
        alt={purchaseBook.title}
        width={450}
        height={350}
        className="rounded-t-md"
      />
      <div className="px-4 py-4 bg-slate-100 rounded-b-md">
        <h2 className="text-lg font-semibold">{purchaseBook.title}</h2>
        <p className="mt-2 text-lg text-slate-600">{purchaseBook.author}</p>
        <StarRating rating={purchaseBook.rating} />
        <p className="text-md text-slate-700">￥{purchaseBook.price}</p>
      </div>
    </Link>
  );
};

export default PurchaseBook;