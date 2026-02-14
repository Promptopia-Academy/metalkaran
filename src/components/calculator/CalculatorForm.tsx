"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { IUnit } from "@/types/type";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalculatorInput } from "./CalculatorInput";
import { Combobox } from "@/components/ui/combobox";
import { calculateWeight } from "@/lib/calculateWeight";
import { CATEGORIES_FROM_MOCK, PRODUCTS_FROM_MOCK_CALCULATOR } from "@/lib/constants";

export function CalculatorForm() {
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [length, setLength] = useState("");
  const [productValue, setProductValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");
  const [widthIUnit, setWidthIUnit] = useState<IUnit>("m");
  const [heightIUnit, setHeightIUnit] = useState<IUnit>("m");
  const [lengthIUnit, setLengthIUnit] = useState<IUnit>("m");
  const [resultKg, setResultKg] = useState<number | null>(null);

  const categoryOptions = useMemo(() => CATEGORIES_FROM_MOCK, []);

  const productOptions = useMemo(() => {
    if (!categoryValue) return [];
    return PRODUCTS_FROM_MOCK_CALCULATOR.filter((p) => p.categoryValue === categoryValue).map(
      (p) => ({ value: p.value, label: p.label })
    );
  }, [categoryValue]);

  const selectedProduct = useMemo(
    () => PRODUCTS_FROM_MOCK_CALCULATOR.find((p) => p.value === productValue),
    [productValue]
  );

  const density = selectedProduct?.density ?? 0;

  const handleCategoryChange = (value: string) => {
    setCategoryValue(value);
    setProductValue("");
    setResultKg(null);
  };

  const handleProductChange = (value: string) => {
    setProductValue(value);
    setResultKg(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = calculateWeight({
      length,
      width,
      height,
      lengthUnit: lengthIUnit,
      widthUnit: widthIUnit,
      heightUnit: heightIUnit,
      density,
    });
    setResultKg(result);
  };

  return (
    <div className="w-full flex justify-center items-center pb-12">
      <form
        onSubmit={handleSubmit}
        dir="rtl"
        className={cn(
          "w-full max-w-[400px] rounded-lg border bg-card p-6 text-card-foreground shadow-sm",
          "flex flex-col gap-5"
        )}
        style={{ width: 400 }}
      >
        <h2 className="text-xl font-bold text-center border-b pb-2">
          ماشین حساب وزن ورق
        </h2>

        <div className="space-y-2">
          <Label>دسته‌بندی</Label>
          <Combobox
            options={categoryOptions}
            value={categoryValue}
            onValueChange={handleCategoryChange}
            placeholder="انتخاب دسته‌بندی..."
            searchPlaceholder="جستجو..."
            emptyText="موردی یافت نشد."
          />
        </div>

        <div className="space-y-2">
          <Label>محصول</Label>
          <Combobox
            options={productOptions}
            value={productValue}
            onValueChange={handleProductChange}
            placeholder="انتخاب محصول..."
            searchPlaceholder="جستجو..."
            emptyText="موردی یافت نشد."
            disabled={!categoryValue}
          />
        </div>

        <CalculatorInput
          id="length"
          label="طول"
          placeholder="مثال: 100"
          value={length}
          onChange={setLength}
          unit={lengthIUnit}
          onUnitChange={setLengthIUnit}
          inputClassName="bg-white text-black"
        />

        <CalculatorInput
          id="width"
          label="عرض"
          placeholder="مثال: 50"
          value={width}
          onChange={setWidth}
          unit={widthIUnit}
          onUnitChange={setWidthIUnit}
          inputClassName="bg-white text-black"
        />

        <CalculatorInput
          id="height"
          label="ارتفاع (ضخامت)"
          placeholder="مثال: 2"
          value={height}
          onChange={setHeight}
          unit={heightIUnit}
          onUnitChange={setHeightIUnit}
          inputClassName="bg-white text-black"
          selectContentClassName="bg-white text-black"
        />

        <div className="space-y-1">
          <Label>چگالی (گرم بر سانتی‌متر مکعب)</Label>
          <Input
            readOnly
            value={density > 0 ? density : "—"}
            className="bg-muted/50"
            aria-readonly
          />
        </div>

        <Button
          type="submit"
          className="w-full text-white hover:opacity-90"
          style={{ backgroundColor: "#2C5D3F" }}
        >
          محاسبه وزن
        </Button>

        {resultKg !== null && (
          <div
            className="rounded-md border bg-muted/40 p-4 text-center"
            role="status"
            aria-live="polite"
          >
            <p className="text-sm text-muted-foreground mb-1">وزن ورق</p>
            <p className="text-2xl font-bold">
              {resultKg.toLocaleString("fa-IR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 4,
              })}
              <span className="text-base font-normal">کیلوگرم</span>
            </p>
          </div>
        )}
      </form>
    </div>
  );
}
