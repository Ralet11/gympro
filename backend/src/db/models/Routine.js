import { DataTypes, Model } from 'sequelize'

export default (sequelize) => {
  class Routine extends Model {}
  Routine.init(
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
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'user_id',
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('active', 'archived'),
        allowNull: false,
        defaultValue: 'active',
      },
      nextReview: {
        type: DataTypes.DATEONLY,
        field: 'next_review',
      },
      meta: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: {},
      },
    },
    {
      sequelize,
      modelName: 'Routine',
      tableName: 'routines',
    },
  )

  return Routine
}
