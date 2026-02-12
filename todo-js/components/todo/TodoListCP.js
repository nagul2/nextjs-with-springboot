import Link from "next/link";
import TodoPagingCP from "./TodoPagingCP";

export default function TodoListCP({ data, queryObj }) {
  const { list, total } = data;

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Todo List</h2>

      {/* Todo 목록 */}
      <ul className="divide-y divide-gray-200">
        {list.map((todo) => (
          <li key={todo.tno} className="py-3">
            <Link
              href={`/todo/read/${todo.tno}?${queryObj.toString()}`}
              className="flex justify-between items-center text-gray-700 hover:text-indigo-600 transition-colors duration-200"
            >
              <div className="flex-1 overflow-hidden">
                <span className="font-semibold">
                  {todo.tno}. {todo.title}
                </span>
                <span className="block text-sm text-gray-500 mt-1">
                  작성자: {todo.writer}
                </span>
              </div>
              <span className="text-sm font-medium text-indigo-500">
                보기 &gt;
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {/* 페이지네이션 컴포넌트 */}
      <div className="mt-6 flex justify-center">
        <TodoPagingCP
          totalCount={total}
          size={10}
          page={queryObj.get("page")}
        />
      </div>
    </div>
  );
}
