import styled from 'styled-components';
import { formatCurrency } from '../../utils/helpers.ts';
import { useState } from 'react';
import CreateCabinForm from './CreateCabinForm.tsx';
import type { Cabin } from '../../services/apiCabins.ts';
import Button from '../../ui/Button.tsx';
import { HiPencilSquare, HiSquare2Stack } from 'react-icons/hi2';
import { HiTrash } from 'react-icons/hi';
import useDeleteCabin from './useDeleteCabin.ts';
import useCreateCabin from './useCreateCabin.ts';

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

export default function CabinRow({ cabin }: { cabin: Cabin }) {
  const { id, name, maxCapacity, regularPrice, discount, image, description } = cabin;
  const [showForm, setShowForm] = useState<boolean>(false);

  // Mutate fns from custom hooks.
  const { deleteCabinMutate, isDeleting } = useDeleteCabin();
  const { createCabinMutate, isCreating } = useCreateCabin();

  function onDuplicateClick() {
    createCabinMutate({
      newCabinData: {
        description,
        discount,
        image,
        maxCapacity,
        name: `Copy of ${name}`,
        regularPrice
      }
    });
  }

  return (
      <>
        <TableRow role="row">
          <Img src={image} alt={name}/>
          <Cabin>{name}</Cabin>
          <div>Fits up to {maxCapacity} guests</div>
          <Price>{formatCurrency(regularPrice)}</Price>
          {discount
              ? <Discount>{formatCurrency(discount)}</Discount>
              : <span>&mdash;</span>}
          <div>
            <Button ariaLabel={`Duplicate the cabin ${name}`}
                    $variation={'secondary'} $size={'small'}
                    onClick={onDuplicateClick}
                    disabled={isDeleting || isCreating}>
              <HiSquare2Stack/>
            </Button>
            <Button ariaLabel={`Edit the cabin ${name}`}
                    $variation={'secondary'} $size={'small'}
                    onClick={() => setShowForm(prev => !prev)}
                    disabled={isDeleting}>
              <HiPencilSquare/>
            </Button>
            <Button ariaLabel={`Delete the cabin ${name}`}
                    $variation={'secondary'} $size={'small'}
                    onClick={() => deleteCabinMutate(id)}
                    disabled={isDeleting}>
              <HiTrash/>
            </Button>
          </div>
        </TableRow>
        {showForm && <CreateCabinForm cabinToEdit={cabin}/>}
      </>
  );
}
