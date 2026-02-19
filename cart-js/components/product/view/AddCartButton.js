"use client";

import { useAuthCheck } from "@/hooks/useAuthCheck";
import { useState } from "react";
import AddCartModal from "./AddCartModal";
import Link from "next/link";
import { mutate } from "swr";

export default function AddCartButton({ product, from }) {
  const { session, router } = useAuthCheck();
  const [show, setShow] = useState(false);
  const isWriter = session?.user?.email === product.writer;

  const handleClickAdd = async (e) => {
    const param = {
      account: session?.user?.email,
      pno: product.pno,
      quantity: 1,
    };

    const res = await fetch("/api/cart/change", {
      method: "POST",
      body: JSON.stringify(param),
      headers: { "Content-Type": "application/json" },
    });
    setShow(() => true);
    const result = await res.json();
    mutate("/api/cart/list");

    console.log(result);
  };

  const closeModal = (value) => {
    setShow(() => false);
    if (value === "c") {
      router.back();
    } else if (value === "m") {
      router.push(`/mypage`);
    }
  };

  return (
    <div className="pt-4">
      {show && <AddCartModal closeModal={closeModal} />}
      {/* 1. 구매하기 버튼 영역 (3가지 상태로 분기) */}
      {!session ? (
        <button
          disabled
          className="w-full px-8 py-3 bg-gray-400 text-white font-semibold rounded-lg cursor-not-allowed"
        >
          로그인 후 구매 가능
        </button>
      ) : isWriter ? (
        <button
          disabled
          className="w-full px-8 py-3 bg-gray-400 mt-3 text-white font-semibold rounded-lg cursor-not-allowed"
        >
          내가 등록한 상품
        </button>
      ) : (
        <button
          onClick={handleClickAdd}
          className="w-full px-8 py-3 bg-blue-600 mt-3 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200"
        >
          구매하기
        </button>
      )}

      {/* 2. 수정하기 버튼 영역 (작성자 본인에게만 렌더링) */}
      {isWriter && (
        <button className="w-full px-8 py-3 bg-orange-600 mt-3 text-white font-semibold rounded-lg shadow-md hover:bg-orange-700 transition-colors duration-200">
          <Link
            href={`/product/edit/${product.pno}?from=${encodeURIComponent(from || "")}`}
            className="block w-full"
          >
            수정하기
          </Link>
        </button>
      )}
    </div>
  );
}
