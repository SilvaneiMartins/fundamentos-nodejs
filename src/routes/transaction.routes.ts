import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();
const transactionsRepository = new TransactionsRepository();


transactionRouter.get('/', (request, response) => {
  try {
    const transactions = transactionsRepository.all();
    const balance = transactionsRepository.getBalance();
    return response.json({ transactions, balance });
  } catch (e) {
    return response.status(400).json({ error: e.message });
  }
});


transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body;
    const createAppointment = new CreateTransactionService(
      transactionsRepository,
    );
    const appointment = createAppointment.execute({
      title,
      value,
      type,
    });
    return response.json(appointment);
  } catch (e) {
    return response.status(400).json({ error: e.message });
  }
});

export default transactionRouter;
