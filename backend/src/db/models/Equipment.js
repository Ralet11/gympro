import { DataTypes, Model } from 'sequelize'

export default (sequelize) => {
  class Equipment extends Model {}
  Equipment.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
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
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      brand: {
        type: DataTypes.STRING,
      },
      model: {
        type: DataTypes.STRING,
      },
      serialNumber: {
        type: DataTypes.STRING,
        field: 'serial_number',
      },
      installedAt: {
        type: DataTypes.DATEONLY,
        field: 'installed_at',
      },
      status: {
        type: DataTypes.ENUM('ok', 'maintenance', 'out_of_service'),
        allowNull: false,
        defaultValue: 'ok',
      },
      meta: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: {},
      },
    },
    {
      sequelize,
      modelName: 'Equipment',
      tableName: 'equipment',
    },
  )

  return Equipment
}
