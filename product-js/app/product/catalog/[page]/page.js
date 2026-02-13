import ProductCatalogCP from "@/components/product/ProductCatalogCP";

export async function generateStaticParams() {
  //한 페이지당 4개씩 카탈로그 만들기
  const res = await fetch(
    `http://localhost:8080/api/products/countCatalog?size=4`,
  );

  const pageCount = await res.json();

  // [{page:'1'}, {page:'2'}...]와 같은 형태로 반환해야 함
  const arr = []; // 빈 배열 초기화
  for (let i = 1; i <= pageCount; i++) {
    arr.push({ page: String(i) }); // 배열에 i 값을 추가
  }

  // for 문을 아래의 함수형 코드처럼 작성해도 좋음 -> 자바스크립트에 익숙할 경우
  //   const arr = Array.from(
  //     { length: pageCount }, // 1. "pageCount 크기의 빈 칸을 만들어라"
  //     (_, i) => ({
  //       // 2. "각 칸(index)을 돌면서 객체를 만들어라"
  //       page: String(i + 1), // 3. "i는 0부터 시작하니까 +1 해서 문자열로!"
  //     }),
  //   );

  return arr;
}

export default async function ProductCatalogPage({ params, searchParams }) {
  const param = await params;

  const pageStr = param.page || "1";
  const sizeStr = "4";

  const res = await fetch(
    `http://localhost:8080/api/products/list?page=${pageStr}&size=${sizeStr}`,
    { next: { revalidate: 60 } },
  );

  const result = await res.json();

  console.log(result);
  const { list: products, total, pageRequestDTO } = result;

  return (
    <div>
      <div>Product Catalog Page {pageStr}</div>
      <ProductCatalogCP
        total={total}
        products={products}
        current={pageRequestDTO.page}
        size={pageRequestDTO.size}
      ></ProductCatalogCP>
    </div>
  );
}
