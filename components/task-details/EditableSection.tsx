import { Check, Pencil, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ReasonText } from "./ReasonText";

type EditableSectionProps = {
  title: string;
  accentClass: string;
  value: string;
  tempValue: string;
  isEditing: boolean;
  loadingText?: string;
  renderMarkdown?: boolean;
  onTempChange: (value: string) => void;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
};

export function EditableSection({
  title,
  accentClass,
  value,
  tempValue,
  isEditing,
  loadingText = "Loading...",
  renderMarkdown = false,
  onTempChange,
  onEdit,
  onSave,
  onCancel,
}: EditableSectionProps) {
  return (
    <section className="tt-surface rounded-lg border p-5">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-[var(--tt-ink)]">{title}</h2>
        {!isEditing && (
          <Button variant="ghost" size="sm" onClick={onEdit}>
            <Pencil className="h-4 w-4" />
            Edit
          </Button>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-3">
          <Textarea value={tempValue} onChange={(event) => onTempChange(event.target.value)} />
          <div className="flex gap-2">
            <Button size="sm" onClick={onSave}>
              <Check className="h-4 w-4" />
              Save
            </Button>
            <Button size="sm" variant="outline" onClick={onCancel}>
              <X className="h-4 w-4" />
              Cancel
            </Button>
          </div>
        </div>
      ) : renderMarkdown && value ? (
        <div className={`border-l-4 pl-4 ${accentClass}`}>
          <ReasonText>{value}</ReasonText>
        </div>
      ) : (
        <p className={`whitespace-pre-line border-l-4 pl-4 text-sm leading-7 text-[var(--tt-soft)] ${accentClass}`}>
          {value || loadingText}
        </p>
      )}
    </section>
  );
}
