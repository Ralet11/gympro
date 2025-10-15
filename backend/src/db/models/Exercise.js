import { DataTypes, Model } from 'sequelize'

export default (sequelize) => {
  class Exercise extends Model {}
  Exercise.init(
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
      muscle: {
        type: DataTypes.STRING,
      },
      equipment: {
        type: DataTypes.STRING,
      },
      techniqueUrl: {
        type: DataTypes.STRING,
        field: 'technique_url',
      },
      meta: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: {},
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: 'Exercise',
      tableName: 'exercises',
    },
  )

  return Exercise
}
