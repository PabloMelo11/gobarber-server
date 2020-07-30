import { Router, Request, Response } from 'express';
import { startOfHour, parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();

const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.post('/', (request: Request, response: Response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));

  const findAppointmentsInSameDate = appointmentsRepository.findByDate(
    parsedDate,
  );

  if (findAppointmentsInSameDate) {
    return response
      .status(400)
      .json({ message: 'This appointment is already booked' });
  }

  const appointment = appointmentsRepository.create(provider, parsedDate);

  return response.json(appointment);
});

export default appointmentsRouter;
