"use client";

import { deleteTodo } from "@/actions/todoActions";
import { useActionState, useEffect } from "react";

export default function TodoDeleteModalCP({ tno, onClose, changeShow }) {
  const [deleteState, deleteAction, deletePending] = useActionState(
    deleteTodo,
    { result: "" },
  );

  useEffect(() => {
    if (deleteState.result === "success") {
      onClose(); // 부모 컴포넌트의 deleteClose 함수 실행 (라우팅)
      changeShow(false); // 모달을 닫기 위해 부모의 상태 변경
    }
  }, [deleteState.result]); // deleteState.result가 변경될 때마다 이펙트 실행

  return (
    <div className="fixed inset-0 bg-gray-600/50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
      <div className="relative p-8 w-full max-w-sm mx-auto bg-white rounded-xl shadow-lg">
        {/* 모달 제목 */}
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-gray-900">할 일 삭제 확인</h3>
          <p className="mt-2 text-sm text-gray-500">
            정말로 이 할 일을 삭제하시겠습니까?
          </p>
        </div>

        <form action={deleteAction}>
          <input type="hidden" name="tno" defaultValue={tno}></input>
          {/* 모달 푸터 (버튼 그룹) */}
          <div className="mt-6 flex justify-center space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={deletePending}
              className={`px-4 py-2 text-sm font-semibold text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors duration-200 ${
                deletePending
                  ? "bg-red-400 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700"
              }`}
            >
              {deletePending ? "삭제 중..." : "삭제"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
