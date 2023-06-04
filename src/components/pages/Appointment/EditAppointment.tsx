import {
  Button,
  Center,
  Flex,
  Loader,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { AppointmentResponseType } from '../../../helpers/types';

const FETCH_APPOINTMENT_URL = 'http://localhost:8080/api/appointments/';

const EditAppointment = () => {
  const { width } = useViewportSize();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const appointmentId = pathname.split('/')[2];
  const [diagnose, setDiagnose] = useState('');
  const [recommendations, setRecommendations] = useState('');
  console.log('diagnoza', diagnose);
  console.log('zalecenia', recommendations);
  const fetchAppointment = async () => {
    const response = await axios.get(
      `${FETCH_APPOINTMENT_URL}${appointmentId}`
    );
    return response.data as AppointmentResponseType;
  };

  const appointmentQuery = useQuery(
    ['appointment-edit', appointmentId],
    fetchAppointment
  );

  return (
    <Flex p="md" w="100%" justify="center">
      <Flex
        w={width < 1080 ? '100%' : '50rem'}
        direction="column"
        p="md"
        h="fit-content"
        gap="md"
        sx={(theme) => {
          return {
            borderRadius: theme.radius.md,
            border: '3px #fd7e14 solid',
          };
        }}
      >
        {appointmentQuery.isLoading ? (
          <Center>
            <Loader />
          </Center>
        ) : (
          <>
            <Title fw={700} align="center">
              Wizyta nr {appointmentQuery.data?.appointmentId}
            </Title>
            <Flex
              w="100%"
              justify="space-between"
              direction={width < 1080 ? 'column' : 'row'}
            >
              <TextInput
                w={width < 1080 ? '100%' : '30%'}
                label={'Pacjent'}
                disabled
                value={appointmentQuery.data?.patientName}
              />
              <TextInput
                w={width < 1080 ? '100%' : '30%'}
                label={'Doktor'}
                disabled
                value={appointmentQuery.data?.doctorName}
              />
              <TextInput
                w={width < 1080 ? '100%' : '30%'}
                label={'Data wizyty'}
                disabled
                value={appointmentQuery.data?.appointmentDate}
              />
            </Flex>
            <Flex
              w="100%"
              justify="space-around"
              gap="md"
              direction={width < 1080 ? 'column' : 'row'}
            >
              <Textarea
                w={width < 1080 ? '100%' : '50%'}
                label={'Objawy pacjenta'}
                disabled
                value={appointmentQuery.data?.patientSymptoms}
              />
              <Textarea
                w={width < 1080 ? '100%' : '50%'}
                label={'Stosowane leki'}
                disabled
                value={appointmentQuery.data?.medicinesTaken}
              />
            </Flex>
            <Flex w="100%" justify="space-around">
              <Textarea
                w="100%"
                label={'Diagnoza'}
                value={diagnose}
                placeholder='Niedobór snu i chroniczny stres...'
                onChange={e => setDiagnose(e.currentTarget.value)}
              />
            </Flex>
            <Flex w="100%" justify="space-around">
              <Textarea
                w="100%"
                label={'Zalecenia lekarza'}
                value={recommendations}
                placeholder='Paracetamol 500mg, Ibuprofen 3mg, Amoksycylina 500mg...'
                onChange={e => setRecommendations(e.currentTarget.value)}
              />
            </Flex>
            <Flex justify="flex-end" align="flex-end" gap="md">
              <Button variant='outline' onClick={() => navigate(-1)}>Powrót</Button>
              <Button>Zapisz</Button>
            </Flex>
          </>
        )}
      </Flex>
    </Flex>
  );
};
export default EditAppointment;
