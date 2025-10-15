import { DataTypes, Model } from 'sequelize'

export default (sequelize) => {
  class Location extends Model {}
  Location.init(
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
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      timezone: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'America/Argentina/Buenos_Aires',
      },
      address: {
        type: DataTypes.STRING,
      },
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 100,
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
      modelName: 'Location',
      tableName: 'locations',
    },
  )

  return Location
}
