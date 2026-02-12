import Link from "next/link";

export default function TodoReadCP({ todo, queryObj }) {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-indigo-600">
        Todo 상세 정보
      </h2>

      {/* Todo 상세 내용 */}
      <div className="space-y-4">
        {/* 번호 */}
        <div className="p-3 bg-gray-100 rounded-md">
          <p className="text-sm text-gray-500">번호</p>
          <p className="text-lg font-semibold">{todo.tno}</p>
        </div>

        {/* 제목 */}
        <div className="p-3 bg-gray-100 rounded-md">
          <p className="text-sm text-gray-500">제목</p>
          <p className="text-lg font-semibold">{todo.title}</p>
        </div>

        {/* 작성자 */}
        <div className="p-3 bg-gray-100 rounded-md">
          <p className="text-sm text-gray-500">작성자</p>
          <p className="text-lg font-semibold">{todo.writer}</p>
        </div>

        {/* 완료 여부 */}
        <div className="p-3 bg-gray-100 rounded-md">
          <p className="text-sm text-gray-500">완료 여부</p>
          <p
            className={`text-lg font-semibold ${todo.completed ? "text-green-600" : "text-red-500"}`}
          >
            {todo.completed ? "완료" : "미완료"}
          </p>
        </div>
        {/* 생성일 */}
        <div className="p-3 bg-gray-100 rounded-md">
          <p className="text-sm text-gray-500">생성일</p>
          <p className="text-lg font-semibold">{todo.createdDate}</p>
        </div>
      </div>

      {/* 버튼 그룹 */}
      <div className="mt-6 flex justify-end space-x-4">
        <Link href={`/todo/list?${queryObj.toString()}`}>
          <button className="bg-gray-500 text-white font-semibold py-2 px-6 rounded-md hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2">
            목록으로
          </button>
        </Link>
        <Link href={`/todo/edit/${todo.tno}?${queryObj.toString()}`}>
          <button className="bg-indigo-600 text-white font-semibold py-2 px-6 rounded-md hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            수정/삭제
          </button>
        </Link>
      </div>
    </div>
  );
}
