import { DataTypes, Model } from 'sequelize'

export default (sequelize) => {
  class SupportTicket extends Model {}
  SupportTicket.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'user_id',
      },
      subject: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('open', 'pending', 'resolved', 'closed'),
        allowNull: false,
        defaultValue: 'open',
      },
      channel: {
        type: DataTypes.ENUM('app', 'email', 'frontdesk'),
        allowNull: false,
        defaultValue: 'app',
      },
      payload: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: {},
      },
    },
    {
      sequelize,
      modelName: 'SupportTicket',
      tableName: 'support_tickets',
    },
  )

  return SupportTicket
}
