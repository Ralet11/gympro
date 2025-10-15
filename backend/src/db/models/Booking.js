import { DataTypes, Model } from 'sequelize'

export default (sequelize) => {
  class Booking extends Model {}
  Booking.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      sessionId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'session_id',
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'user_id',
      },
      status: {
        type: DataTypes.ENUM('booked', 'waitlist', 'canceled', 'attended', 'no_show'),
        allowNull: false,
        defaultValue: 'booked',
      },
      source: {
        type: DataTypes.ENUM('mobile', 'web', 'staff'),
        allowNull: false,
        defaultValue: 'mobile',
      },
      policyAck: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'policy_ack',
      },
      checkedInAt: {
        type: DataTypes.DATE,
        field: 'checked_in_at',
      },
      canceledAt: {
        type: DataTypes.DATE,
        field: 'canceled_at',
      },
      meta: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: {},
      },
    },
    {
      sequelize,
      modelName: 'Booking',
      tableName: 'bookings',
      indexes: [
        {
          unique: true,
          fields: ['session_id', 'user_id'],
        },
      ],
    },
  )

  return Booking
}
