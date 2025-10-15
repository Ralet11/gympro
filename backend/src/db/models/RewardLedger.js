import { DataTypes, Model } from 'sequelize'

export default (sequelize) => {
  class RewardLedger extends Model {}
  RewardLedger.init(
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'user_id',
      },
      benefitId: {
        type: DataTypes.UUID,
        field: 'benefit_id',
      },
      delta: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      reason: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      meta: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: {},
      },
    },
    {
      sequelize,
      modelName: 'RewardLedger',
      tableName: 'reward_ledger',
    },
  )

  return RewardLedger
}
