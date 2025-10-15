import { DataTypes, Model } from 'sequelize'

export default (sequelize) => {
  class UserRole extends Model {}
  UserRole.init(
    {
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        field: 'user_id',
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        field: 'role_id',
      },
    },
    {
      sequelize,
      modelName: 'UserRole',
      tableName: 'user_roles',
      timestamps: false,
      paranoid: false,
    },
  )

  return UserRole
}
