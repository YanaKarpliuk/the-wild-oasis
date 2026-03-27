import Button from '../../ui/Button.tsx';
import Modal from '../../ui/Modal.tsx';
import CreateCabinForm from './CreateCabinForm.tsx';

export default function AddCabin() {
  return (
      // Compound component needed for better architecture.
      // Modal will handle its state and structure.

      //// BEFORE:
      // <>
      //   <Button ariaLabel={'Add new cabin'}
      //           onClick={() => setIsOpenModal(prev => !prev)}>
      //     Add new cabin
      //   </Button>
      //   {isOpenModal && (
      //       <Modal onClose={() => setIsOpenModal(false)}>
      //         <CreateCabinForm onCloseModal={() => setIsOpenModal(false)}/>
      //       </Modal>
      //   )}
      // </>

      //// AFTER:
      <Modal>
        <Modal.Open opens={'cabin-form'}>
          <Button ariaLabel={'Add new cabin'}>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name={'cabin-form'}>
          <CreateCabinForm/>
        </Modal.Window>
      </Modal>
  );
}
