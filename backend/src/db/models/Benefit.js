import { DataTypes, Model } from 'sequelize'

export default (sequelize) => {
  class Benefit extends Model {}
  Benefit.init(
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
      partnerId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'partner_id',
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
      },
      pointsCost: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: 'points_cost',
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      terms: {
        type: DataTypes.TEXT,
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: 'Benefit',
      tableName: 'benefits',
    },
  )

  return Benefit
}
