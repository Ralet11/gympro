import * as billingService from '../services/billing.service.js'

export const syncCustomer = async (req, res) => {
  const result = await billingService.syncCustomer({
    userId: req.body.userId,
    context: req.context,
  })
  res.status(200).json(result)
}

export const createPaymentIntent = async (req, res) => {
  const result = await billingService.createPaymentIntent({
    context: req.context,
    payload: req.body,
  })
  res.status(201).json(result)
}

export const capturePaymentIntent = async (req, res) => {
  const result = await billingService.capturePayment({ paymentId: req.params.id })
  res.status(200).json(result)
}

export const cancelPaymentIntent = async (req, res) => {
  const result = await billingService.cancelPayment({ paymentId: req.params.id })
  res.status(200).json(result)
}

export const listInvoices = async (req, res) => {
  const invoices = await billingService.listInvoices({ context: req.context, query: req.query })
  res.status(200).json(invoices)
}

export const getInvoice = async (req, res) => {
  const invoice = await billingService.getInvoice({ invoiceId: req.params.id })
  res.status(200).json(invoice)
}

export const handleStripeWebhook = async (req, res) => {
  // Placeholder: integrate Stripe event validation if needed
  res.status(200).json({ received: true })
}
