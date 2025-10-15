import { DataTypes, Model } from 'sequelize'

export default (sequelize) => {
  class Workout extends Model {}
  Workout.init(
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
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      totalVolume: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: 'total_volume',
      },
      notes: {
        type: DataTypes.TEXT,
      },
      meta: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: {},
      },
    },
    {
      sequelize,
      modelName: 'Workout',
      tableName: 'workouts',
    },
  )

  return Workout
}
