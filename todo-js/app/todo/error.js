"use client"; // 이 컴포넌트는 반드시 클라이언트 컴포넌트여야 합니다.

export default function Error({ error, reset }) {
  console.dir(error);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="text-center p-8 bg-white rounded-xl shadow-2xl max-w-lg w-full transform transition-transform duration-300 hover:scale-105">
        <div className="flex justify-center mb-4 text-red-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-20 w-20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h2 className="text-3xl font-extrabold text-gray-800 mb-2">
          오류가 발생했습니다
        </h2>
        <p className="text-lg text-gray-600 mb-6 font-medium leading-relaxed">
          {error.message}
        </p>
      </div>
    </div>
  );
}
