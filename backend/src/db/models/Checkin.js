import { DataTypes, Model } from 'sequelize'

export default (sequelize) => {
  class Checkin extends Model {}
  Checkin.init(
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      gymId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'gym_id',
      },
      locationId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'location_id',
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'user_id',
      },
      gateId: {
        type: DataTypes.STRING,
        field: 'gate_id',
      },
      source: {
        type: DataTypes.ENUM('mobile', 'turnstile', 'staff'),
        allowNull: false,
        defaultValue: 'mobile',
      },
      allowed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      reason: {
        type: DataTypes.STRING,
      },
      checkedInAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'checked_in_at',
      },
    },
    {
      sequelize,
      modelName: 'Checkin',
      tableName: 'checkins',
    },
  )

  return Checkin
}
