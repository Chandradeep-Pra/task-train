import { Pencil } from "lucide-react";
import { useState } from "react";

export function EditableField({
  value,
  onSave,
  className = "",
  textarea = false,
}: {
  value: string;
  onSave: (newVal: string) => void;
  className?: string;
  textarea?: boolean;
}) {
  const [editing, setEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  const handleBlur = () => {
    onSave(tempValue);
    setEditing(false);
  };

  return (
    <div className={`relative group ${className}`}>
      {editing ? (
        textarea ? (
          <textarea
            className="w-full text-zinc-800 font-medium bg-zinc-100 p-2 rounded border border-zinc-300"
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            onBlur={handleBlur}
            autoFocus
            rows={3}
          />
        ) : (
          <input
            className="w-full text-zinc-800 font-medium bg-zinc-100 p-1 rounded border border-zinc-300"
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            onBlur={handleBlur}
            autoFocus
          />
        )
      ) : (
        <>
          <span>{value}</span>
          <Pencil
            size={14}
            className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 cursor-pointer text-zinc-400 hover:text-zinc-700 transition"
            onClick={() => setEditing(true)}
          />
        </>
      )}
    </div>
  );
}
