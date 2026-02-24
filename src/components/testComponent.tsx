"use client";
import { IProduct } from "@/types/type";
import React, { useEffect } from "react";
type Props = {
  products: IProduct[];
};

function testComponent({ products }: Props) {
  useEffect(() => {
    console.log(products);
  }, [products]);
  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <h2>{product.title}</h2>
        </div>
      ))}
    </div>
  );
}

export default testComponent;
