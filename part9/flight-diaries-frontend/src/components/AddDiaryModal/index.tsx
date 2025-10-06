import {
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  Alert,
} from '@mui/material';

import AddPatientForm from './AddDiaryForm';
import { DiaryFormValues } from '../../types';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: DiaryFormValues) => void;
  error?: string;
}

const AddPatientModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>Add a new diary</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity='error'>{error}</Alert>}
      <AddPatientForm onSubmit={onSubmit} onCancel={onClose} />
    </DialogContent>
  </Dialog>
);

export default AddPatientModal;
