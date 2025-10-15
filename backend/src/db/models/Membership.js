import { DataTypes, Model } from 'sequelize'

export default (sequelize) => {
  class Membership extends Model {}
  Membership.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'user_id',
      },
      planId: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'plan_id',
      },
      status: {
        type: DataTypes.ENUM('active', 'paused', 'canceled', 'expired'),
        allowNull: false,
        defaultValue: 'active',
      },
      startDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        field: 'start_date',
      },
      renewalDate: {
        type: DataTypes.DATEONLY,
        field: 'renewal_date',
      },
      pausedFrom: {
        type: DataTypes.DATEONLY,
        field: 'paused_from',
      },
      pausedTo: {
        type: DataTypes.DATEONLY,
        field: 'paused_to',
      },
      cancelReason: {
        type: DataTypes.STRING,
        field: 'cancel_reason',
      },
      meta: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: {},
      },
    },
    {
      sequelize,
      modelName: 'Membership',
      tableName: 'memberships',
    },
  )

  return Membership
}
