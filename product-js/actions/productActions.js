"use server";
import { revalidatePath } from "next/cache";

const API_SERVER_HOST = process.env.API_SERVER_HOST || "http://localhost:8080";

export const postProduct = async (prevState, formData) => {
  console.log("postProduct called with formData:", prevState);

  const pname = formData.get("pname");
  const price = formData.get("price");
  const writer = formData.get("writer");
  const files = formData.getAll("files");

  const updatedFormData = new FormData();

  updatedFormData.append("pname", pname);
  updatedFormData.append("price", price);
  updatedFormData.append("writer", writer);
  updatedFormData.append("sale", true);
  if (files.length > 0) {
    files.forEach((file) => {
      console.log("----------------------------------", file);
      if (file && file.size > 0) {
        updatedFormData.append("files", file);
      }
    });
  }

  const response = await fetch(`${API_SERVER_HOST}/api/products`, {
    method: "POST",
    body: updatedFormData,
  });

  if (!response.ok) {
    throw new Error("Failed to create product");
  }

  revalidatePath("/product/catalog/1"); // 캐시 지우고 다시 등록

  return { message: "Product created successfully", result: "success" };
};
