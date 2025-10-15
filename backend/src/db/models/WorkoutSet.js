import { DataTypes, Model } from 'sequelize'

export default (sequelize) => {
  class WorkoutSet extends Model {}
  WorkoutSet.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      entryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'entry_id',
      },
      reps: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      weight: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      rpe: {
        type: DataTypes.DECIMAL(4, 2),
      },
      effortSec: {
        type: DataTypes.INTEGER,
        field: 'effort_sec',
      },
    },
    {
      sequelize,
      modelName: 'WorkoutSet',
      tableName: 'workout_sets',
    },
  )

  return WorkoutSet
}
