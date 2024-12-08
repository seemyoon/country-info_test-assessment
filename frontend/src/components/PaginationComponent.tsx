import React, { FC } from 'react';

import { useSearchParams } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

interface IProps {
  count: number,
}

const PaginationComponent: FC<IProps> = ({ count }) => {
  const [searchParams, setSearchParams] = useSearchParams({ offset: '0' });

  const handlePageChange = (e: React.ChangeEvent<unknown>, value: number) => {
    e.preventDefault();
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = (value - 1) * limit;
    setSearchParams({ offset: offset.toString(), limit: limit.toString() });
  };

  const getPage = Math.floor(parseInt(searchParams.get('offset') || '0') / parseInt(searchParams.get('limit') || '20') + 1);
  const getAllPage = Math.ceil(count / parseInt(searchParams.get('limit') || '20'));

  return (

    <Stack spacing={2}>
      <div>
        <Pagination
          count={getAllPage}
          onChange={handlePageChange}
          page={getPage}
        />
      </div>
    </Stack>


  );
};

export default PaginationComponent;