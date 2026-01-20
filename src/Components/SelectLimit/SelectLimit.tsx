import React from 'react';
import { useTranslation } from 'react-i18next';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '../ui/dropdown-menu';
import { FaChevronDown } from 'react-icons/fa6';
import './selectLimit.scss';

type SelectLimitProps = {
  setPageLimit: (pageLimit: number) => void;
  pageLimit: number;
};

export default function SelectLimit({ setPageLimit, pageLimit }: SelectLimitProps) {
  const { t } = useTranslation();
  const limitRanges = [20, 25, 30, 50];

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setPageLimit(Number((e.target as HTMLDivElement).innerText));
  };

  return (
    <DropdownMenu modal={false}>
      <div className="flex flex-row justify-center items-center gap-2">
      <h2>{t('main.search')}{': '}</h2>
      <DropdownMenuTrigger className="select__limit-trigger">
        <h2>{pageLimit}</h2>
        <FaChevronDown />
      </DropdownMenuTrigger>
      </div>
      <DropdownMenuContent align="end" className="select__limit-content">
      {limitRanges.map((numbers) => (
        <DropdownMenuItem key={numbers} className="select__limit-item" onClick={(e: React.MouseEvent<HTMLDivElement>) => handleClick(e as React.MouseEvent<HTMLDivElement>)}>
          {numbers}
        </DropdownMenuItem>
      ))}
      </DropdownMenuContent>
    </DropdownMenu>

  );
}
