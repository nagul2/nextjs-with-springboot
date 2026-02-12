type SearchParams = { [key: string]: string };

interface PageProps {
  searchParams: Promise<SearchParams>; // Next.js 15: Promise
}

export default async function TodoListPage({ searchParams }: PageProps) {
  const query = await searchParams;
  const page = query?.page || "1";

  const res = await fetch(`http://localhost:8080/api/todos/list?page=${page}`);

  const result = await res.json();
  console.log(result);
  return (
    <div>
      <div>투두 리스트 페이지</div>
    </div>
  );
}
