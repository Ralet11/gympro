import { DataTypes, Model } from 'sequelize'

export default (sequelize) => {
  class PushDevice extends Model {}
  PushDevice.init(
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
      deviceId: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'device_id',
      },
      pushToken: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'push_token',
      },
      platform: {
        type: DataTypes.ENUM('ios', 'android', 'web'),
        allowNull: false,
      },
      lastSeenAt: {
        type: DataTypes.DATE,
        field: 'last_seen_at',
      },
    },
    {
      sequelize,
      modelName: 'PushDevice',
      tableName: 'push_devices',
      indexes: [
        {
          unique: true,
          fields: ['device_id', 'user_id'],
        },
      ],
    },
  )

  return PushDevice
}
