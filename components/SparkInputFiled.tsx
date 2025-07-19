import { Sparkle, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface SparkInputFieldProps {
  label: string;
  placeholder?: string;
  value: number;
  onChange: (value: number) => void;
  showButton?: boolean;
  onAIClick?: () => Promise<{ value: number; reason: string }>;
}

export const SparkInputField: React.FC<SparkInputFieldProps> = ({
  label,
  placeholder,
  value,
  onChange,
  showButton = false,
  onAIClick,
}) => {
  const [loading, setLoading] = useState(false);
  const [aiResult, setAiResult] = useState<null | string>(null);

  const handleAIClick = async () => {
    if (!onAIClick) return;
    setLoading(true);
    try {
      const result = await onAIClick();
      onChange(result.value);
      setAiResult(result.reason);
    } catch (err) {
      console.error('AI Estimation Failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <label className="block text-sm font-medium text-zinc-700">
          {label}
        </label>
        {showButton && (
          <Button
            onClick={handleAIClick}
            variant="outline"
            className="flex items-center gap-1 rounded-full px-3 py-1 text-xs"
          >
            {loading ? (
              <Loader2 className="w-3 h-3 animate-spin" />
            ) : (
              <Sparkle size={10} />
            )}
            AI Estimate
          </Button>
        )}
      </div>

      <Input
        type="number"
        min={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        placeholder={placeholder}
      />

      {aiResult && (
        <div className="text-[11px] text-muted-foreground mt-1 ml-auto max-w-xs text-right">
          {aiResult}
        </div>
      )}
    </div>
  );
};
