import styled from 'styled-components';
import { formatCurrency } from '../../utils/helpers.ts';
import CreateCabinForm from './CreateCabinForm.tsx';
import type { Cabin } from '../../services/apiCabins.ts';
import { HiPencilSquare, HiSquare2Stack } from 'react-icons/hi2';
import { HiTrash } from 'react-icons/hi';
import useDeleteCabin from './useDeleteCabin.ts';
import useCreateCabin from './useCreateCabin.ts';
import Modal from '../../ui/Modal.tsx';
import ConfirmDelete from '../../ui/ConfirmDelete.tsx';
import Table from '../../ui/Table.tsx';
import Menus from '../../ui/Menus.tsx';

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

  // Mutate fns from custom hooks.
  const { deleteCabinMutate, isDeleting } = useDeleteCabin();
  const { createCabinMutate } = useCreateCabin();

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
      <Table.Row>
        <Img src={image} alt={name}/>
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount
            ? <Discount>{formatCurrency(discount)}</Discount>
            : <span>&mdash;</span>}
        <div>
          <Modal>
            <Menus.Menu id={id}>
              <Menus.Toggle id={id}/>

              <Menus.List id={id}>
                {/* Duplicate button. */}
                <Menus.Button icon={<HiSquare2Stack/>} onClick={onDuplicateClick}>
                  Duplicate
                </Menus.Button>

                {/* Edit button. */}
                <Modal.Open opens={'edit'}>
                  <Menus.Button icon={<HiPencilSquare/>}>
                    Edit
                  </Menus.Button>
                </Modal.Open>

                {/* Delete button. */}
                <Modal.Open opens={'delete'}>
                  <Menus.Button icon={<HiTrash/>}>
                    Delete
                  </Menus.Button>
                </Modal.Open>
              </Menus.List>

              <Modal.Window name={'edit'}>
                <CreateCabinForm cabinToEdit={cabin}/>
              </Modal.Window>

              <Modal.Window name={'delete'}>
                <ConfirmDelete
                    onConfirm={() => deleteCabinMutate(id)}
                    disabled={isDeleting}
                    resourceName={`cabin ${name}`}/>
              </Modal.Window>
            </Menus.Menu>
          </Modal>
        </div>
      </Table.Row>
  );
}
