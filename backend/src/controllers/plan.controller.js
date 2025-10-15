import * as planService from '../services/plan.service.js'

export const listPlans = async (req, res) => {
  const plans = await planService.listPlans({ context: req.context, query: req.query })
  res.status(200).json(plans)
}

export const createPlan = async (req, res) => {
  const plan = await planService.createPlan({ context: req.context, payload: req.body })
  res.status(201).json(plan)
}

export const updatePlan = async (req, res) => {
  const plan = await planService.updatePlan({
    context: req.context,
    planId: req.params.id,
    payload: req.body,
  })
  res.status(200).json(plan)
}

export const deletePlan = async (req, res) => {
  await planService.deletePlan({ context: req.context, planId: req.params.id })
  res.status(204).send()
}
