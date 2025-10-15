import { DataTypes, Model } from 'sequelize'

export default (sequelize) => {
  class FileAsset extends Model {}
  FileAsset.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        field: 'user_id',
      },
      scope: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      filename: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contentType: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'content_type',
      },
      url: {
        type: DataTypes.STRING,
      },
      storage: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 's3',
      },
      meta: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: {},
      },
    },
    {
      sequelize,
      modelName: 'FileAsset',
      tableName: 'file_assets',
    },
  )

  return FileAsset
}
