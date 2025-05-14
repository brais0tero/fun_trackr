'use client';

import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  const options = [
    { code: 'en', label: '🇬🇧 EN' },
    { code: 'es', label: '🇪🇸 ES' },
    { code: 'de', label: '🇩🇪 DE' },
  ];

  return (
    <select
      value={i18n.language}
      onChange={handleChange}
      className="bg-brand-light border border-brand-medium/50 text-brand-dark rounded px-2 py-1 text-sm shadow-sm hover:shadow hover:shadow-brand-dark transition ease-in duration-200 hover:mouse-pointer"
    >
      {options.map((option) => (
        <option key={option.code} value={option.code}>
          {option.label}
        </option>
      ))}
    </select>
  );
}