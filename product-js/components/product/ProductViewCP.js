import Image from "next/image";

export default function ProductViewCP({ product }) {
  console.log(product);

  return (
    <div>
      <div>Product View Component</div>
      <div>{product.pno}</div>
      <div>{product.pname}</div>
      <div>{product.price}</div>
      <div>{product.writer}</div>
      <div>{product.createdDate}</div>

      {product.fileNames.map((fileName) => (
        <div className="relative w-1/3 h-80" key={fileName}>
          <Image
            src={`/api/backend/${fileName}`}
            alt={product.pname}
            fill
            style={{ objectFit: "cover" }}
            sizes="33vw"
            priority={true}
          />
        </div>
      ))}
    </div>
  );
}
