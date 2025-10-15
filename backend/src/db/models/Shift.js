import { DataTypes, Model } from 'sequelize'

export default (sequelize) => {
  class Shift extends Model {}
  Shift.init(
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
      staffId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'staff_id',
      },
      startsAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'starts_at',
      },
      endsAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'ends_at',
      },
      roleHint: {
        type: DataTypes.STRING,
        field: 'role_hint',
      },
      notes: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: 'Shift',
      tableName: 'shifts',
    },
  )

  return Shift
}
