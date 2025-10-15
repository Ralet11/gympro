import { DataTypes, Model } from 'sequelize'

export default (sequelize) => {
  class RoutineBlock extends Model {}
  RoutineBlock.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      routineId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'routine_id',
      },
      day: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      notes: {
        type: DataTypes.TEXT,
      },
      order: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: 'RoutineBlock',
      tableName: 'routine_blocks',
    },
  )

  return RoutineBlock
}
