"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ICalculatorInputProps, IUnit } from "@/types/type";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CalculatorInput({
  id,
  label,
  placeholder = "مثال: 100",
  value,
  onChange,
  unit,
  onUnitChange,
  inputClassName,
  selectContentClassName,
}: ICalculatorInputProps) {
  return (
    <div className="grid grid-cols-[1fr_auto] gap-2 items-end">
      <div className="space-y-1">
        <Label htmlFor={id}>{label}</Label>
        <Input
          id={id}
          type="text"
          inputMode="decimal"
          placeholder={placeholder}
          value={value}
          className={inputClassName}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
      <Select value={unit} onValueChange={(v) => onUnitChange(v as IUnit)}>
        <SelectTrigger
          className="h-9 min-w-[7rem]"
          aria-label={`واحد ${label}`}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent className={selectContentClassName}>
          <SelectItem value="m">m</SelectItem>
          <SelectItem value="cm">cm</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
