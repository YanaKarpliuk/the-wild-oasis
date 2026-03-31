import Select from './Select.tsx';
import { useSearchParams } from 'react-router-dom';
import type { ChangeEvent } from 'react';

type Option = {
  value: string;
  label: string
}

type Props = {
  options: Option[]
}

function SortBy({ options }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sortBy') || '';

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    searchParams.set('sortBy', e.target.value);
    setSearchParams(searchParams);
  }

  return (
      <Select options={options}
              type={'white'}
              onChange={handleChange}
              value={sortBy}/>
  );
}

export default SortBy;
