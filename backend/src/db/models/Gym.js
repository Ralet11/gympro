import { DataTypes, Model } from 'sequelize'

export default (sequelize) => {
  class Gym extends Model {}
  Gym.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      legalName: {
        type: DataTypes.STRING,
        field: 'legal_name',
      },
      taxId: {
        type: DataTypes.STRING,
        field: 'tax_id',
      },
      settingsJson: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: {},
        field: 'settings_json',
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: 'Gym',
      tableName: 'gyms',
    },
  )

  return Gym
}
