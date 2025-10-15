import { DataTypes, Model } from 'sequelize'

export default (sequelize) => {
  class ClassSession extends Model {}
  ClassSession.init(
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
      locationId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'location_id',
      },
      classId: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'class_id',
      },
      coachId: {
        type: DataTypes.UUID,
        field: 'coach_id',
      },
      startsAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'starts_at',
      },
      endsAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'ends_at',
      },
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      booked: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      waitlist: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      status: {
        type: DataTypes.ENUM('scheduled', 'canceled', 'done'),
        allowNull: false,
        defaultValue: 'scheduled',
      },
      meta: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: {},
      },
    },
    {
      sequelize,
      modelName: 'ClassSession',
      tableName: 'class_sessions',
    },
  )

  return ClassSession
}
