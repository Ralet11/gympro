import { DataTypes, Model } from 'sequelize'

export default (sequelize) => {
  class RewardWallet extends Model {}
  RewardWallet.init(
    {
      userId: {
        type: DataTypes.UUID,
        primaryKey: true,
        field: 'user_id',
      },
      points: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      tier: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Basic',
      },
      meta: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: {},
      },
    },
    {
      sequelize,
      modelName: 'RewardWallet',
      tableName: 'reward_wallets',
    },
  )

  return RewardWallet
}
