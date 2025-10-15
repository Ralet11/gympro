import { DataTypes, Model } from 'sequelize'

export default (sequelize) => {
  class BodyMetric extends Model {}
  BodyMetric.init(
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
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
      weight: {
        type: DataTypes.DECIMAL(6, 2),
      },
      bodyFatPct: {
        type: DataTypes.DECIMAL(5, 2),
        field: 'body_fat_pct',
      },
      waist: {
        type: DataTypes.DECIMAL(6, 2),
      },
      chest: {
        type: DataTypes.DECIMAL(6, 2),
      },
      thigh: {
        type: DataTypes.DECIMAL(6, 2),
      },
      bmi: {
        type: DataTypes.DECIMAL(5, 2),
      },
      meta: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: {},
      },
    },
    {
      sequelize,
      modelName: 'BodyMetric',
      tableName: 'body_metrics',
    },
  )

  return BodyMetric
}
