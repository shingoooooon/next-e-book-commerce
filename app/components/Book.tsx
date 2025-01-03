"use client";

import Image from "next/image";
import { BookType, User } from "../types/types";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "./Modal";
import StarRating from "./StarRating";

type BookProps = {
  book: BookType
  isPurchased: boolean
  user: User
}

// eslint-disable-next-line react/display-name
const Book = ({ book, isPurchased, user }: BookProps) => {
  const [showModal, setShowModal] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const router = useRouter();

  const startCheckout = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
          method: "POST",
          headers: { "Content-Type": "application/json"},
          body: JSON.stringify({
            title: book.title,
            price: book.price,
            userId: user.id,
            bookId: book.id,
          })
        }
      )

      const responseData = await response.json();
      if (responseData) {
        router.push(responseData.checkout_url);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handlePurchaseClick = () =>{
    if(isPurchased) {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
      // alert("You have already purchased this book.");
    } else {
      setShowModal(true);
    }
  }

  const handleCancel = () => {
    setShowModal(false);
  }

  const handlePurchaseConfirm = () => {
    if(!user) {
      setShowModal(false);
      router.push("api/auth/signin");
    } else {
      startCheckout();
    }
  }

  return (
    <>
      {/* アニメーションスタイル */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .modal {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>

      <div className="flex flex-col items-center m-4">
        <a onClick={handlePurchaseClick} className="cursor-pointer shadow-2xl duration-300 hover:translate-y-1 hover:shadow-none">
          <Image
            priority
            src={book.thumbnail.url}
            alt={book.title}
            width={450}
            height={350}
            className="rounded-t-md"
          />
          <div className="px-4 py-4 bg-slate-100 rounded-b-md">
            <h2 className="text-lg font-semibold">{book.title}</h2>
            <p className="mt-2 text-lg text-slate-600">{book.author}</p>
            <StarRating rating={book.rating} />
            <p className="text-md text-slate-700">￥{book.price}
            </p>
          </div>
        </a>
        {showModal && <Modal handlePurchaseConfirm={handlePurchaseConfirm} handleCancel={handleCancel}/>}
        {showNotification && (
          <div className="fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded shadow-lg modal z-[100]">
            You have already purchased this book.
          </div>
        )} 
      </div>
    </>
  );
};

export default Book;