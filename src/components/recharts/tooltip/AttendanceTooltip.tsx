'use client';

import { TooltipProps } from 'recharts';
import { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';

interface AttendanceTooltipProps extends TooltipProps<ValueType, NameType> {
  t: (key: string) => string;
}

export default function AttendanceTooltip({
  active,
  payload,
  label,
  t,
}: AttendanceTooltipProps) {
  if (active && payload && payload.length) {
    const value = payload[0].value as number;
    return (
      <div className="bg-white p-3 rounded shadow text-sm border border-brand-light text-brand-dark">
        <p className="font-semibold">{label}</p>
        <p>
          {t('park_detail.attendance')}: {(value / 1_000_000).toFixed(1)}M
        </p>
        <p>ESTO NO ESTÁ FUNCIONANDO GPT</p>
      </div>
    );
  }

  return null;
}
