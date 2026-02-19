"use client";

import { useAuthCheck } from "@/hooks/useAuthCheck";
import Link from "next/link";

export default function AddCartButton({ product, from }) {
  const { session, router } = useAuthCheck();

  console.log(session);

  return (
    <div className="pt-4">
      {session ? ( // Conditionally render the button based on the server session
        <button className="w-full px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200">
          구매하기
        </button>
      ) : (
        <button
          disabled
          className="w-full px-8 py-3 bg-gray-400 text-white font-semibold rounded-lg cursor-not-allowed"
        >
          로그인 후 구매 가능
        </button>
      )}

      {session?.user?.email === product.writer && (
        <button className="w-full px-8 py-3 bg-orange-600 mt-3 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200">
          <Link
            href={`/product/edit/${product.pno}?from=${encodeURIComponent(from)}`}
          >
            수정하기
          </Link>
        </button>
      )}
    </div>
  );
}
