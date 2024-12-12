"use client"

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { NextResponse } from "next/server";

const PurchaseSuccess = () => {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [ bookUrl, setBookUrl ] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if(sessionId) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/checkout/success`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ sessionId }),
            }
          )
          const data = await res.json();
          console.log(data.purchase.bookId);
          setBookUrl(data.purchase.bookId);
        } catch (err) {
          console.log(err);
        }
      }
    }
    fetchData();
  }, [])

  return (
    <div className="flex items-center justify-center mt-20">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
            Thank you for your purchase!
        </h1>
        <p className="text-center text-gray-600">
            Details of your purchase have been sent to the registered email address.
        </p>
        <div className="mt-6 text-center">
          <Link
            href={`/book/${bookUrl}`}
            className="text-indigo-600 hover:text-indigo-800 transition duration-300"
          >
            Read the purchased article
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PurchaseSuccess;