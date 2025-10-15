import { DataTypes, Model } from 'sequelize'

export default (sequelize) => {
  class User extends Model {}
  User.init(
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
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      passwordHash: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'password_hash',
      },
      fullName: {
        type: DataTypes.STRING,
        field: 'full_name',
      },
      phone: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.ENUM('active', 'blocked', 'pending'),
        allowNull: false,
        defaultValue: 'active',
      },
      preferences: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: {},
      },
      goalsJson: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: {},
        field: 'goals_json',
      },
      stripeCustomerId: {
        type: DataTypes.STRING,
        field: 'stripe_customer_id',
      },
      lastLoginAt: {
        type: DataTypes.DATE,
        field: 'last_login_at',
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
    },
  )

  return User
}
