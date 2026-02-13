import Image from "next/image";
import Link from "next/link";

export default function ProductQueryListCP({ list, total, requestParam }) {
  const page = requestParam.page;
  const size = requestParam.size;
  const sort = requestParam.sort;
  const keyword = requestParam.keyword;

  console.log(page, size, sort, keyword);

  const queryObj = new URLSearchParams();
  queryObj.set("page", page);
  queryObj.set("size", size);

  if (sort) {
    queryObj.set("sort", sort);
  }
  if (keyword) {
    queryObj.set("keyword", keyword);
  }

  const from = encodeURIComponent(`/product/query?${queryObj.toString()}`);

  return (
    <div>
      <div>Product Query List Component</div>

      <ul>
        {list.map((product) => (
          <li key={product.pno} className="m-2 p-2 border-2">
            <Link href={`/product/view/${product.pno}?from=${from}`}>
              <div>{product.pno} </div>
              <div>
                {product.pname} =. {product.price}{" "}
              </div>
              <div className="relative aspect-4/3 max-w-75">
                <Image
                  src={`/api/backend/s_${product.fileName}`}
                  alt={product.pname}
                  fill
                  sizes="(max-width: 768px) 100vw, 300px" // 추가된 부분
                  style={{ objectFit: "cover" }}
                  priority
                />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
