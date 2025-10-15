import { DataTypes, Model } from 'sequelize'

export default (sequelize) => {
  class RoutineExercise extends Model {}
  RoutineExercise.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      blockId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'block_id',
      },
      exerciseId: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'exercise_id',
      },
      sets: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      reps: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rir: {
        type: DataTypes.INTEGER,
      },
      tempo: {
        type: DataTypes.STRING,
      },
      restSec: {
        type: DataTypes.INTEGER,
        field: 'rest_sec',
      },
      order: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      meta: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: {},
      },
    },
    {
      sequelize,
      modelName: 'RoutineExercise',
      tableName: 'routine_exercises',
    },
  )

  return RoutineExercise
}
