import { DataTypes, Model } from 'sequelize'

export default (sequelize) => {
  class Role extends Model {}
  Role.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      key: {
        type: DataTypes.STRING(40),
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING(80),
        allowNull: false,
      },
      scopes: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        defaultValue: [],
      },
    },
    {
      sequelize,
      modelName: 'Role',
      tableName: 'roles',
    },
  )

  return Role
}
