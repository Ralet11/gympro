import { DataTypes, Model } from 'sequelize'

export default (sequelize) => {
  class EquipmentTicket extends Model {}
  EquipmentTicket.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      equipmentId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'equipment_id',
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      severity: {
        type: DataTypes.ENUM('low', 'medium', 'high'),
        allowNull: false,
        defaultValue: 'low',
      },
      status: {
        type: DataTypes.ENUM('open', 'in_progress', 'resolved', 'closed'),
        allowNull: false,
        defaultValue: 'open',
      },
      reportedBy: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'reported_by',
      },
      assignedTo: {
        type: DataTypes.UUID,
        field: 'assigned_to',
      },
      meta: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: {},
      },
    },
    {
      sequelize,
      modelName: 'EquipmentTicket',
      tableName: 'equipment_tickets',
    },
  )

  return EquipmentTicket
}
