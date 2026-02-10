import { DataTable } from "@/components/ui/data-table";
import { MECHANICAL_COLUMNS, PHYSICAL_COLUMNS } from "@/lib/constants";
import type { IMechanicalProperties, IPhysicalProperties, IProductTableProps } from "@/types/type";

const ProductTable = ({
  mechanicalProperties,
  physicalProperties,
}: IProductTableProps) => {
  return (
    <div className="flex flex-col gap-8" dir="rtl">
      {mechanicalProperties && (
        <div className="w-full overflow-x-auto">
          <DataTable<IMechanicalProperties>
          title="خواص مکانیکی"
          columns={MECHANICAL_COLUMNS}
          data={mechanicalProperties}
        />
        </div>
      )}
      {physicalProperties && (
        <div className="w-full overflow-x-auto">
          <DataTable<IPhysicalProperties>
          title="خواص فیزیکی"
          columns={PHYSICAL_COLUMNS}
          data={physicalProperties}
        />
        </div>
      )}
    </div>
  );
};

export default ProductTable;
