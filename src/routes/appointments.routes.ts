import { Router, Request, Response } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';

const appointmentsRouter = Router();

import Appointment from '../models/Appointment';

const appointments: Appointment[] = [];

appointmentsRouter.post('/', (request: Request, response: Response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));
  const findAppointmentsInSameDate = appointments.find(appointment =>
    isEqual(parsedDate, appointment.date),
  );

  if (findAppointmentsInSameDate) {
    return response
      .status(400)
      .json({ message: 'This appointment is already booked' });
  }

  const appointment = new Appointment(provider, parsedDate);

  appointments.push(appointment);

  return response.json(appointment);
});

export default appointmentsRouter;
