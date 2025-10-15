import { DataTypes, Model } from 'sequelize'

export default (sequelize) => {
  class OccupancyCounter extends Model {}
  OccupancyCounter.init(
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      locationId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'location_id',
      },
      gateId: {
        type: DataTypes.STRING,
        field: 'gate_id',
      },
      direction: {
        type: DataTypes.ENUM('in', 'out'),
        allowNull: false,
      },
      count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      meta: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: {},
      },
    },
    {
      sequelize,
      modelName: 'OccupancyCounter',
      tableName: 'occupancy_counters',
    },
  )

  return OccupancyCounter
}
