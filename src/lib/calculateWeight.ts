import type { ICalculateWeightParams, IUnit } from "@/types/type";

function toCm(value: number, unit: IUnit): number {
  return unit === "m" ? value * 100 : value;
}

export function calculateWeight({
  length,
  width,
  height,
  lengthUnit,
  widthUnit,
  heightUnit,
  density,
}: ICalculateWeightParams): number | null {
  const l = parseFloat(length.replace(",", "."));
  const w = parseFloat(width.replace(",", "."));
  const h = parseFloat(height.replace(",", "."));

  if (Number.isNaN(l) || Number.isNaN(w) || Number.isNaN(h) || density <= 0) {
    return null;
  }

  const lengthCm = toCm(l, lengthUnit);
  const widthCm = toCm(w, widthUnit);
  const heightCm = toCm(h, heightUnit);
  const volumeCm3 = lengthCm * widthCm * heightCm;
  const weightG = density * volumeCm3;
  const weightKg = weightG / 1000;

  return weightKg;
}
