import ProductViewCP from "@/components/product/ProductViewCP";

export async function generateStaticParams() {
  //최신 상품 번호 10개를 가져오는 기능
  const res = await fetch(`http://localhost:8080/api/products/event?count=10`);

  const pnos = await res.json();

  // [{pno:'1'}, {pno:'2'}...]와 같은 형태로 반환해야 함
  return pnos.map((pno) => ({ pno: String(pno) }));
}

export default async function ProductViewPage({ params, searchParams }) {
  const param = await params;
  const pno = param.pno;
  console.log("pno", pno);

  const res = await fetch(`http://localhost:8080/api/products/${pno}`, {
    next: { revalidate: 120 },
  });
  if (!res.ok) {
    return (
      <div className="p-6 text-center">상품 정보를 불러올 수 없습니다.</div>
    );
  }
  const query = await searchParams;

  const from = query.from
    ? decodeURIComponent(query.from)
    : "/product/catalog/1";

  const product = await res.json();
  console.log(product);

  return (
    <div>
      <div>Product View Page</div>
      <ProductViewCP product={product} from={from}></ProductViewCP>
    </div>
  );
}
