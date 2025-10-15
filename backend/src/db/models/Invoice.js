import { DataTypes, Model } from 'sequelize'

export default (sequelize) => {
  class Invoice extends Model {}
  Invoice.init(
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
        type: DataTypes.ENUM('open', 'paid', 'void'),
        allowNull: false,
        defaultValue: 'open',
      },
      dueDate: {
        type: DataTypes.DATEONLY,
        field: 'due_date',
      },
      meta: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: {},
      },
    },
    {
      sequelize,
      modelName: 'Invoice',
      tableName: 'invoices',
    },
  )

  return Invoice
}
