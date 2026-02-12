"use server";

export async function postTodo(prevState, formData) {
  console.log("Add Todo .......");

  //complete 추가
  formData.set("completed", false);

  const res = await fetch(`http://localhost:8080/api/todos`, {
    method: "POST",
    body: formData,
  });

  const serverResult = await res.json();

  console.log(serverResult); //정상적이라면 새로운 tno값이 존재

  return { result: serverResult.tno };
}

export async function putTodo(prevState, formData) {
  console.log("Edit Todo .......");

  const tno = formData.get("tno");

  const res = await fetch(`http://localhost:8080/api/todos/${tno}`, {
    method: "PUT",
    body: formData,
  });

  const serverResult = await res.json();

  console.log(serverResult); //정상적이라면 새로운 tno값이 존재

  return { result: serverResult.tno };
}

export async function deleteTodo(prevState, formData) {
  console.log("Delete Todo .......", formData);

  const tno = formData.get("tno");

  const res = await fetch(`http://localhost:8080/api/todos/${tno}`, {
    method: "DELETE",
  });

  // {result: 'success'}
  const serverResult = await res.json();

  return { result: serverResult.result };
}
