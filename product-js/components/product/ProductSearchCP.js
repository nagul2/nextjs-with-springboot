"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ProductSearchCP() {
  const searchParams = useSearchParams();
  const router = useRouter();

  //URL에서 초기 값 가져오기
  const currentPage = searchParams.get("page") || "1";
  const currentKeyword = searchParams.get("keyword") || "";
  const currentSort = searchParams.get("sort") || "b";
  const currentSize = searchParams.get("size") || "10"; // 기본값 10개

  const [keyword, setKeyword] = useState(currentKeyword);
  const [sort, setSort] = useState(currentSort);
  const [size, setSize] = useState(currentSize); // size 상태 추가

  const handleClickSearchButton = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const queryObj = new URLSearchParams({ page: "1", size: size });

    if (sort) {
      queryObj.append("sort", sort);
    }
    if (keyword) {
      queryObj.append("keyword", keyword);
    }

    router.push(`/product/query?${queryObj.toString()}`);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
        <div>
          <select
            name="size"
            value={size}
            onChange={(e) => setSize(() => e.target.value)}
          >
            <option value="10">10개 보기</option>
            <option value="20">20개 보기</option>
            <option value="50">50개 보기</option>
          </select>
        </div>
        <div className="w-full sm:w-auto sm:max-w-37.5">
          <select
            name="sort"
            value={sort}
            onChange={(e) => setSort(() => e.target.value)}
          >
            <option value="b">기본순</option>
            <option value="d">출시순</option>
            <option value="ph">높은 가격순</option>
            <option value="pl">낮은 가격순</option>
          </select>
        </div>
        {/* 키워드 검색 */}
        <div className="flex w-full sm:w-auto sm:max-w-xs">
          <input
            type="text"
            name="keyword"
            placeholder="상품명 검색..."
            onChange={(e) => setKeyword(e.target.value)}
            value={keyword}
          />
        </div>
        <button type="button" onClick={handleClickSearchButton}>
          검색
        </button>
      </div>
    </div>
  );
}
