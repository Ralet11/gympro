import { DataTypes, Model } from 'sequelize'

export default (sequelize) => {
  class FitnessClass extends Model {}
  FitnessClass.init(
    {
      id: {
        type: DataTypes.STRING,
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
      category: {
        type: DataTypes.STRING,
      },
      defaultCapacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 20,
        field: 'default_capacity',
      },
      description: {
        type: DataTypes.TEXT,
      },
      policyJson: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: {},
        field: 'policy_json',
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: 'FitnessClass',
      tableName: 'classes',
    },
  )

  return FitnessClass
}
