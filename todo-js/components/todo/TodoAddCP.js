"use client";

import { postTodo } from "@/actions/todoActions";
import { useActionState } from "react";
import { useRouter } from "next/navigation";

export default function TodoAddCP() {
  const [state, formAction, isPending] = useActionState(postTodo, {
    result: "",
  });

  const router = useRouter();
  const handleGoToList = () => {
    router.push("/todo/list"); //
  };

  return (
    <div className="max-w-md mx-auto p-8 mt-10 bg-white rounded-xl shadow-lg space-y-6 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 text-center">
        할 일 추가하기
      </h2>

      {state.result && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative text-center"
          role="alert"
        >
          <span className="block sm:inline">
            등록이 성공적으로 완료되었습니다! 🎉
          </span>
          <button
            onClick={handleGoToList}
            className="mt-2 px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            목록 화면으로 이동
          </button>
        </div>
      )}

      <form action={formAction} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            제목
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="할 일을 입력해주세요"
          />
        </div>

        <div>
          <label
            htmlFor="writer"
            className="block text-sm font-medium text-gray-700"
          >
            작성자
          </label>
          <input
            type="text"
            name="writer"
            id="writer"
            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="작성자 이름을 입력해주세요"
          />
        </div>
        <div>
          {isPending ? (
            <button
              type="button"
              disabled
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-400 cursor-not-allowed"
            >
              처리중...
            </button>
          ) : (
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              SAVE
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
