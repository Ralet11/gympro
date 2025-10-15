import { DataTypes, Model } from 'sequelize'

export default (sequelize) => {
  class Plan extends Model {}
  Plan.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      gymId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'gym_id',
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      currency: {
        type: DataTypes.STRING(3),
        allowNull: false,
        defaultValue: 'ARS',
      },
      billingPeriod: {
        type: DataTypes.ENUM('weekly', 'monthly', 'quarterly', 'yearly'),
        allowNull: false,
        defaultValue: 'monthly',
        field: 'billing_period',
      },
      includesJson: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: {},
        field: 'includes_json',
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: 'Plan',
      tableName: 'plans',
    },
  )

  return Plan
}
