import TodoReadCP from "@/components/todo/TodoReadCP";

export default async function TodoReadPage({ params, searchParams }) {
  const paramObj = await params;
  const query = await searchParams;

  const page = query?.page || "1";
  const queryObj = new URLSearchParams();
  queryObj.set("page", page);

  const res = await fetch(`http://localhost:8080/api/todos/${paramObj.tno}`, {
    cache: "no-store",
  });

  if (res.status === 404) {
    const error = new Error("해당 할 일을 찾을 수 없습니다.");
    throw error;
  }

  const todo = await res.json();

  return (
    <div>
      <div>Todo List Page</div>
      <TodoReadCP todo={todo} queryObj={queryObj}></TodoReadCP>
    </div>
  );
}
