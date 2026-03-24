import styled from 'styled-components';
import { formatCurrency } from '../../utils/helpers.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditCabin, deleteCabin, type NewCabin } from '../../services/apiCabins.ts';
import toast from 'react-hot-toast';
import { useState } from 'react';
import CreateCabinForm from './CreateCabinForm.tsx';
import type { Cabin } from '../../services/apiCabins.ts';
import Button from '../../ui/Button.tsx';
import { HiPencilSquare, HiSquare2Stack } from 'react-icons/hi2';
import { HiTrash } from 'react-icons/hi';

type CreateTypes = {
  newCabinData: NewCabin
}

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

  const queryClient = useQueryClient();

  // Duplicate cabin.
  const { mutate: duplicateCabinMutate, isPending: isCreating } = useMutation({
    mutationFn: ({ newCabinData }: CreateTypes) => createEditCabin(newCabinData),
    onSuccess: () => {
      toast.success('Cabin was successfully duplicated.');
      // Refresh UI to display updated data.
      queryClient.invalidateQueries({
        queryKey: ['cabins']
      });
    },
    onError: (err) => toast.error(err.message)
  });

  // Delete cabin.
  const { mutate: deleteCabinMutate, isPending: isDeleting } = useMutation({
    mutationFn: (id: number) => deleteCabin(id),
    onSuccess: () => {
      toast.success('Cabin was successfully deleted.');
      // Refresh UI to display updated data.
      queryClient.invalidateQueries({
        queryKey: ['cabins']
      });
    },
    onError: (err) => toast.error(err.message)
  });

  function onDuplicateClick() {
    duplicateCabinMutate({
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
