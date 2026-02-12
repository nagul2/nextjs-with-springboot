"use client";

import { useActionState, useState } from "react";
import { putTodo } from "@/actions/todoActions";
import { useRouter } from "next/navigation";
import TodoDeleteModalCP from "./TodoDeleteModalCP";

export default function TodoEditCP({ todo, queryObj }) {
  const [putState, putAction, putPending] = useActionState(putTodo, {
    result: "",
  });

  const router = useRouter();
  const query = new URLSearchParams(queryObj);

  const [deleteShow, setDeleteShow] = useState(false);
  const deleteClose = () => {
    router.replace(`/todo/list`);
  };

  return (
    <div className="max-w-xl mx-auto p-8 mt-10 bg-white rounded-xl shadow-lg space-y-6 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 text-center">
        할 일 수정하기
      </h2>

      {deleteShow && (
        <TodoDeleteModalCP
          tno={todo.tno}
          onClose={deleteClose}
          changeShow={setDeleteShow}
        ></TodoDeleteModalCP>
      )}

      {putState.result && (
        <div
          className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4"
          role="alert"
        >
          <p className="font-bold">성공!</p>
          <p>할 일이 성공적으로 수정되었습니다. ✨</p>
          <button
            onClick={(e) => {
              router.replace(`/todo/read/${todo.tno}?${query.toString()}`);
            }}
            className="mt-2 px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            조회 화면으로 이동
          </button>
        </div>
      )}
      <form action={putAction} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            번호
          </label>
          <input
            type="text"
            name="tno"
            defaultValue={todo.tno}
            readOnly
            className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm cursor-not-allowed"
          />
        </div>
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
            defaultValue={todo.title}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            작성자
          </label>
          <input
            type="text"
            name="writer"
            defaultValue={todo.writer}
            readOnly
            className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm cursor-not-allowed"
          />
        </div>
        <div>
          <label
            htmlFor="completed"
            className="block text-sm font-medium text-gray-700"
          >
            완료 여부
          </label>
          <select
            id="completed"
            defaultValue={todo.completed ? "true" : "false"}
            name="completed"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="true">완료</option>
            <option value="false">미완료</option>
          </select>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="submit"
            disabled={putPending}
            className={`py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors duration-200 ${
              putPending
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            }`}
          >
            {putPending ? "저장 중..." : "저장"}
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setDeleteShow(() => true);
            }}
            className="py-2 px-4 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            삭제
          </button>
        </div>
      </form>
    </div>
  );
}
