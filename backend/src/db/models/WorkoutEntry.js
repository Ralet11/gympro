import { DataTypes, Model } from 'sequelize'

export default (sequelize) => {
  class WorkoutEntry extends Model {}
  WorkoutEntry.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      workoutId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'workout_id',
      },
      exerciseId: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'exercise_id',
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
      modelName: 'WorkoutEntry',
      tableName: 'workout_entries',
    },
  )

  return WorkoutEntry
}
