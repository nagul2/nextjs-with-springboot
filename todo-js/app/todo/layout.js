import Link from "next/link";

export default function TodoLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-800">
      {/* 헤더 메뉴 */}
      <header className="bg-white shadow-md p-4 sticky top-0 z-10">
        <div className="flex justify-between items-center max-w-2xl mx-auto">
          {/* 로고 또는 제목 */}
          <h1 className="text-2xl font-bold text-indigo-600">Todo App</h1>

          {/* 메뉴 링크 */}
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link
                  href="/todo/list"
                  className="text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
                >
                  목록
                </Link>
              </li>
              <li>
                <Link
                  href="/todo/new"
                  className="text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
                >
                  등록
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* 메인 콘텐츠 영역 */}
      <main className="flex-grow p-4 max-w-2xl mx-auto w-full">{children}</main>
    </div>
  );
}
