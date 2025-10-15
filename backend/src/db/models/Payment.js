import { DataTypes, Model } from 'sequelize'

export default (sequelize) => {
  class Payment extends Model {}
  Payment.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'user_id',
      },
      invoiceId: {
        type: DataTypes.STRING,
        field: 'invoice_id',
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      currency: {
        type: DataTypes.STRING(3),
        allowNull: false,
        defaultValue: 'ARS',
      },
      status: {
        type: DataTypes.ENUM(
          'requires_confirmation',
          'requires_capture',
          'succeeded',
          'canceled',
          'failed',
        ),
        allowNull: false,
      },
      captureMethod: {
        type: DataTypes.ENUM('automatic', 'manual'),
        allowNull: false,
        defaultValue: 'automatic',
        field: 'capture_method',
      },
      provider: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'stripe',
      },
      meta: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: {},
      },
    },
    {
      sequelize,
      modelName: 'Payment',
      tableName: 'payments',
    },
  )

  return Payment
}
