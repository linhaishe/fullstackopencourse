import { useState } from 'react';
import {
  Box,
  Table,
  Button,
  TableHead,
  Typography,
  TableCell,
  TableRow,
  TableBody,
} from '@mui/material';
import axios from 'axios';

import { DiaryFormValues, Diary } from '../../types';
import AddPatientModal from '../AddDiaryModal';

import patientService from '../../services/diaries';

interface Props {
  diaries: Diary[];
  setDiaries: React.Dispatch<React.SetStateAction<Diary[]>>;
}

const DiaryListPage = ({ diaries, setDiaries }: Props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewPatient = async (values: DiaryFormValues) => {
    try {
      const diary = await patientService.create(values);
      setDiaries(diaries.concat(diary));
      setModalOpen(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === 'string') {
          const message = e.response.data.replace(
            'Something went wrong. Error: ',
            ''
          );
          console.error(message);
          setError(message);
        } else {
          setError('Unrecognized axios error');
        }
      } else {
        console.error('Unknown error', e);
        setError('Unknown error');
      }
    }
  };

  return (
    <div className='App'>
      <Box>
        <Typography align='center' variant='h6'>
          Diary Entries
        </Typography>
      </Box>
      <Table style={{ marginBottom: '1em' }}>
        <TableHead>
          <TableRow>
            <TableCell>Time</TableCell>
            <TableCell>Visibility</TableCell>
            <TableCell>Weather</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.values(diaries).map((diary: Diary) => (
            <TableRow key={diary.id}>
              <TableCell>{diary.date}</TableCell>
              <TableCell>{diary.weather}</TableCell>
              <TableCell>{diary.visibility}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <AddPatientModal
        modalOpen={modalOpen}
        onSubmit={submitNewPatient}
        error={error}
        onClose={closeModal}
      />
      <Button variant='contained' onClick={() => openModal()}>
        Add New Diary
      </Button>
    </div>
  );
};

export default DiaryListPage;
