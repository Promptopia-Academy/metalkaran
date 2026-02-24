"use client";
import { getProductsForSite } from "@/lib/dev/getData";
import { IProduct, Pagination } from "@/types/type";
import React, { useEffect, useState } from "react";

function testComponent() {
  const [data, setData] = useState<{
    success: boolean;
    data: IProduct[];
    pagination: Pagination | null;
  }>({
    success: false,
    data: [],
    pagination: null,
  });

  useEffect(() => {
    async function getProducts() {
      const products = await getProductsForSite();
      setData(products);
    }
    getProducts();
  }, []);
  console.log(data);
  return <div></div>;
}

export default testComponent;
