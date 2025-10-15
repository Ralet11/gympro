import { v4 as uuid } from 'uuid'
import AppError from '../utils/appError.js'
import { getModels } from '../loaders/sequelize.js'
import { buildPagination, paginatedResponse } from '../utils/pagination.js'

export const syncCustomer = async ({ userId, context }) => {
  const { User } = getModels()
  const user = await User.findOne({ where: { id: userId, gymId: context.gymId } })
  if (!user) {
    throw new AppError('User not found', { statusCode: 404, code: 'USER_NOT_FOUND' })
  }
  const stripeCustomerId = user.stripeCustomerId || `cus_${uuid()}`
  await user.update({ stripeCustomerId })
  return { stripeCustomerId }
}

export const createPaymentIntent = async ({ context, payload }) => {
  const { Payment, User, Invoice } = getModels()

  const user = await User.findOne({ where: { id: payload.userId, gymId: context.gymId } })
  if (!user) {
    throw new AppError('User not found', { statusCode: 404, code: 'USER_NOT_FOUND' })
  }

  let invoiceId = payload.invoiceId
  if (!invoiceId) {
    invoiceId = `inv_${uuid()}`
    await Invoice.create({
      id: invoiceId,
      userId: user.id,
      amount: payload.amount,
      currency: payload.currency || 'ARS',
      status: 'open',
      dueDate: payload.dueDate,
      meta: payload.metadata || {},
    })
  }

  const paymentIntentId = `pi_${uuid()}`
  const payment = await Payment.create({
    id: paymentIntentId,
    userId: user.id,
    invoiceId,
    amount: payload.amount,
    currency: payload.currency || 'ARS',
    status: payload.captureMethod === 'manual' ? 'requires_capture' : 'requires_confirmation',
    captureMethod: payload.captureMethod || 'automatic',
    provider: 'stripe',
    meta: payload.metadata || {},
  })

  return {
    paymentIntentId: payment.id,
    status: payment.status,
    clientSecret: `secret_${paymentIntentId}`,
  }
}

export const capturePayment = async ({ paymentId }) => {
  const { Payment, Invoice } = getModels()
  const payment = await Payment.findByPk(paymentId)
  if (!payment) {
    throw new AppError('Payment not found', { statusCode: 404, code: 'PAYMENT_NOT_FOUND' })
  }
  if (!['requires_capture', 'requires_confirmation'].includes(payment.status)) {
    throw new AppError('Payment not capturable', { statusCode: 409, code: 'INVALID_PAYMENT_STATE' })
  }

  await payment.update({ status: 'succeeded' })
  if (payment.invoiceId) {
    const invoice = await Invoice.findByPk(payment.invoiceId)
    if (invoice) {
      await invoice.update({ status: 'paid' })
    }
  }

  return {
    paymentIntentId: payment.id,
    status: payment.status,
  }
}

export const cancelPayment = async ({ paymentId }) => {
  const { Payment } = getModels()
  const payment = await Payment.findByPk(paymentId)
  if (!payment) {
    throw new AppError('Payment not found', { statusCode: 404, code: 'PAYMENT_NOT_FOUND' })
  }
  await payment.update({ status: 'canceled' })
  return { paymentIntentId: payment.id, status: payment.status }
}

export const listInvoices = async ({ context, query }) => {
  const { Invoice } = getModels()
  const pagination = buildPagination(query)
  const where = {}
  if (query.userId) where.userId = query.userId
  if (query.status) where.status = query.status

  const result = await Invoice.findAndCountAll({
    where,
    limit: pagination.limit,
    offset: pagination.offset,
    order: [['createdAt', 'DESC']],
  })

  return paginatedResponse(
    {
      rows: result.rows.map((invoice) => invoice.toJSON()),
      count: result.count,
    },
    pagination,
  )
}

export const getInvoice = async ({ invoiceId }) => {
  const { Invoice } = getModels()
  const invoice = await Invoice.findByPk(invoiceId)
  if (!invoice) {
    throw new AppError('Invoice not found', { statusCode: 404, code: 'INVOICE_NOT_FOUND' })
  }
  return invoice.toJSON()
}
