import { IDataTableProps } from "@/types/type";

const TABLE_RADIUS = "8px";
const HEADER_BG = "#05ABFF";

export function DataTable<T extends object>({
  columns,
  data,
  title,
}: IDataTableProps<T>) {
  return (
    <div className="w-full overflow-hidden rounded-[8px]" style={{ borderRadius: TABLE_RADIUS }}>
      {title && (
        <h3 className="text-2xl font-semibold mb-3" dir="rtl">
          {title}
        </h3>
      )}
      <table className="w-full border-collapse overflow-hidden" dir="rtl">
        <thead>
          <tr>
            {columns.map((col, i) => (
              <th
                key={String(col.accessor)}
                className={`px-4 py-3 text-base bg-[#05ABFF] text-center font-normal ${i === 0 ? "rounded-tr-lg" : ""} ${i === columns.length - 1 ? "rounded-tl-lg" : ""}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {columns.map((col, i) => (
              <td
                key={String(col.accessor)}
                className={`px-4 py-4 text-xl text-center bg-[#bfc0c1] font-medium border-b border-border ${i === 0 ? "rounded-br-lg" : ""} ${i === columns.length - 1 ? "rounded-bl-lg" : ""}`}
              >
                {String(data[col.accessor as keyof T] ?? "—")}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
