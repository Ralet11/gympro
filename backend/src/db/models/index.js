import GymFactory from './Gym.js'
import LocationFactory from './Location.js'
import RoleFactory from './Role.js'
import UserFactory from './User.js'
import UserRoleFactory from './UserRole.js'
import PlanFactory from './Plan.js'
import MembershipFactory from './Membership.js'
import CheckinFactory from './Checkin.js'
import FitnessClassFactory from './FitnessClass.js'
import ClassSessionFactory from './ClassSession.js'
import BookingFactory from './Booking.js'
import ExerciseFactory from './Exercise.js'
import RoutineFactory from './Routine.js'
import RoutineBlockFactory from './RoutineBlock.js'
import RoutineExerciseFactory from './RoutineExercise.js'
import WorkoutFactory from './Workout.js'
import WorkoutEntryFactory from './WorkoutEntry.js'
import WorkoutSetFactory from './WorkoutSet.js'
import BodyMetricFactory from './BodyMetric.js'
import PartnerFactory from './Partner.js'
import BenefitFactory from './Benefit.js'
import RewardWalletFactory from './RewardWallet.js'
import RewardLedgerFactory from './RewardLedger.js'
import InvoiceFactory from './Invoice.js'
import PaymentFactory from './Payment.js'
import ShiftFactory from './Shift.js'
import EquipmentFactory from './Equipment.js'
import EquipmentTicketFactory from './EquipmentTicket.js'
import PushDeviceFactory from './PushDevice.js'
import SupportTicketFactory from './SupportTicket.js'
import FileAssetFactory from './FileAsset.js'
import OccupancyCounterFactory from './OccupancyCounter.js'

export const initModels = (sequelize) => {
  const models = {
    Gym: GymFactory(sequelize),
    Location: LocationFactory(sequelize),
    Role: RoleFactory(sequelize),
    User: UserFactory(sequelize),
    UserRole: UserRoleFactory(sequelize),
    Plan: PlanFactory(sequelize),
    Membership: MembershipFactory(sequelize),
    Checkin: CheckinFactory(sequelize),
    FitnessClass: FitnessClassFactory(sequelize),
    ClassSession: ClassSessionFactory(sequelize),
    Booking: BookingFactory(sequelize),
    Exercise: ExerciseFactory(sequelize),
    Routine: RoutineFactory(sequelize),
    RoutineBlock: RoutineBlockFactory(sequelize),
    RoutineExercise: RoutineExerciseFactory(sequelize),
    Workout: WorkoutFactory(sequelize),
    WorkoutEntry: WorkoutEntryFactory(sequelize),
    WorkoutSet: WorkoutSetFactory(sequelize),
    BodyMetric: BodyMetricFactory(sequelize),
    Partner: PartnerFactory(sequelize),
    Benefit: BenefitFactory(sequelize),
    RewardWallet: RewardWalletFactory(sequelize),
    RewardLedger: RewardLedgerFactory(sequelize),
    Invoice: InvoiceFactory(sequelize),
    Payment: PaymentFactory(sequelize),
    Shift: ShiftFactory(sequelize),
    Equipment: EquipmentFactory(sequelize),
    EquipmentTicket: EquipmentTicketFactory(sequelize),
    PushDevice: PushDeviceFactory(sequelize),
    SupportTicket: SupportTicketFactory(sequelize),
    FileAsset: FileAssetFactory(sequelize),
    OccupancyCounter: OccupancyCounterFactory(sequelize),
  }

  const {
    Gym,
    Location,
    Role,
    User,
    UserRole,
    Plan,
    Membership,
    Checkin,
    FitnessClass,
    ClassSession,
    Booking,
    Exercise,
    Routine,
    RoutineBlock,
    RoutineExercise,
    Workout,
    WorkoutEntry,
    WorkoutSet,
    BodyMetric,
    Partner,
    Benefit,
    RewardWallet,
    RewardLedger,
    Invoice,
    Payment,
    Shift,
    Equipment,
    EquipmentTicket,
    PushDevice,
    SupportTicket,
    FileAsset,
    OccupancyCounter,
  } = models

  // Tenancy
  Gym.hasMany(Location, { foreignKey: 'gym_id' })
  Location.belongsTo(Gym, { foreignKey: 'gym_id' })

  Gym.hasMany(User, { foreignKey: 'gym_id' })
  User.belongsTo(Gym, { foreignKey: 'gym_id' })

  Gym.hasMany(Plan, { foreignKey: 'gym_id' })
  Plan.belongsTo(Gym, { foreignKey: 'gym_id' })

  Gym.hasMany(FitnessClass, { foreignKey: 'gym_id' })
  FitnessClass.belongsTo(Gym, { foreignKey: 'gym_id' })

  Gym.hasMany(Exercise, { foreignKey: 'gym_id' })
  Exercise.belongsTo(Gym, { foreignKey: 'gym_id' })

  Gym.hasMany(Partner, { foreignKey: 'gym_id' })
  Partner.belongsTo(Gym, { foreignKey: 'gym_id' })

  Gym.hasMany(Benefit, { foreignKey: 'gym_id' })
  Benefit.belongsTo(Gym, { foreignKey: 'gym_id' })

  Gym.hasMany(Equipment, { foreignKey: 'gym_id' })
  Equipment.belongsTo(Gym, { foreignKey: 'gym_id' })

  // Roles
  User.belongsToMany(Role, { through: UserRole, foreignKey: 'user_id', otherKey: 'role_id' })
  Role.belongsToMany(User, { through: UserRole, foreignKey: 'role_id', otherKey: 'user_id' })

  // Locations
  Location.hasMany(ClassSession, { foreignKey: 'location_id' })
  ClassSession.belongsTo(Location, { foreignKey: 'location_id' })

  Location.hasMany(Checkin, { foreignKey: 'location_id' })
  Checkin.belongsTo(Location, { foreignKey: 'location_id' })

  Location.hasMany(Shift, { foreignKey: 'location_id' })
  Shift.belongsTo(Location, { foreignKey: 'location_id' })

  Location.hasMany(Equipment, { foreignKey: 'location_id' })
  Equipment.belongsTo(Location, { foreignKey: 'location_id' })

  Location.hasMany(OccupancyCounter, { foreignKey: 'location_id' })
  OccupancyCounter.belongsTo(Location, { foreignKey: 'location_id' })

  // Users & Memberships
  User.hasMany(Membership, { foreignKey: 'user_id' })
  Membership.belongsTo(User, { foreignKey: 'user_id' })

  Plan.hasMany(Membership, { foreignKey: 'plan_id' })
  Membership.belongsTo(Plan, { foreignKey: 'plan_id' })

  // Access & Checkins
  User.hasMany(Checkin, { foreignKey: 'user_id' })
  Checkin.belongsTo(User, { foreignKey: 'user_id' })

  // Classes & Bookings
  FitnessClass.hasMany(ClassSession, { foreignKey: 'class_id' })
  ClassSession.belongsTo(FitnessClass, { foreignKey: 'class_id' })

  User.hasMany(ClassSession, { foreignKey: 'coach_id', as: 'CoachedSessions' })
  ClassSession.belongsTo(User, { foreignKey: 'coach_id', as: 'Coach' })

  User.hasMany(Booking, { foreignKey: 'user_id' })
  Booking.belongsTo(User, { foreignKey: 'user_id' })

  ClassSession.hasMany(Booking, { foreignKey: 'session_id' })
  Booking.belongsTo(ClassSession, { foreignKey: 'session_id' })

  // Routines & workouts
  User.hasMany(Routine, { foreignKey: 'user_id' })
  Routine.belongsTo(User, { foreignKey: 'user_id' })

  Routine.hasMany(RoutineBlock, { foreignKey: 'routine_id' })
  RoutineBlock.belongsTo(Routine, { foreignKey: 'routine_id' })

  RoutineBlock.hasMany(RoutineExercise, { foreignKey: 'block_id' })
  RoutineExercise.belongsTo(RoutineBlock, { foreignKey: 'block_id' })

  Exercise.hasMany(RoutineExercise, { foreignKey: 'exercise_id' })
  RoutineExercise.belongsTo(Exercise, { foreignKey: 'exercise_id' })

  User.hasMany(Workout, { foreignKey: 'user_id' })
  Workout.belongsTo(User, { foreignKey: 'user_id' })

  Workout.hasMany(WorkoutEntry, { foreignKey: 'workout_id' })
  WorkoutEntry.belongsTo(Workout, { foreignKey: 'workout_id' })

  Exercise.hasMany(WorkoutEntry, { foreignKey: 'exercise_id' })
  WorkoutEntry.belongsTo(Exercise, { foreignKey: 'exercise_id' })

  WorkoutEntry.hasMany(WorkoutSet, { foreignKey: 'entry_id' })
  WorkoutSet.belongsTo(WorkoutEntry, { foreignKey: 'entry_id' })

  // Body metrics
  User.hasMany(BodyMetric, { foreignKey: 'user_id' })
  BodyMetric.belongsTo(User, { foreignKey: 'user_id' })

  // Rewards & partners
  Partner.hasMany(Benefit, { foreignKey: 'partner_id' })
  Benefit.belongsTo(Partner, { foreignKey: 'partner_id' })

  User.hasOne(RewardWallet, { foreignKey: 'user_id' })
  RewardWallet.belongsTo(User, { foreignKey: 'user_id' })

  User.hasMany(RewardLedger, { foreignKey: 'user_id' })
  RewardLedger.belongsTo(User, { foreignKey: 'user_id' })

  Benefit.hasMany(RewardLedger, { foreignKey: 'benefit_id' })
  RewardLedger.belongsTo(Benefit, { foreignKey: 'benefit_id' })

  // Billing
  User.hasMany(Invoice, { foreignKey: 'user_id' })
  Invoice.belongsTo(User, { foreignKey: 'user_id' })

  Invoice.hasMany(Payment, { foreignKey: 'invoice_id' })
  Payment.belongsTo(Invoice, { foreignKey: 'invoice_id' })

  User.hasMany(Payment, { foreignKey: 'user_id' })
  Payment.belongsTo(User, { foreignKey: 'user_id' })

  // Shifts (staff scheduling)
  User.hasMany(Shift, { foreignKey: 'staff_id', as: 'Shifts' })
  Shift.belongsTo(User, { foreignKey: 'staff_id', as: 'Staff' })

  // Equipment maintenance
  Equipment.hasMany(EquipmentTicket, { foreignKey: 'equipment_id' })
  EquipmentTicket.belongsTo(Equipment, { foreignKey: 'equipment_id' })

  User.hasMany(EquipmentTicket, { foreignKey: 'reported_by', as: 'ReportedEquipmentTickets' })
  EquipmentTicket.belongsTo(User, { foreignKey: 'reported_by', as: 'Reporter' })

  User.hasMany(EquipmentTicket, { foreignKey: 'assigned_to', as: 'AssignedEquipmentTickets' })
  EquipmentTicket.belongsTo(User, { foreignKey: 'assigned_to', as: 'Assignee' })

  // Push devices & support
  User.hasMany(PushDevice, { foreignKey: 'user_id' })
  PushDevice.belongsTo(User, { foreignKey: 'user_id' })

  User.hasMany(SupportTicket, { foreignKey: 'user_id' })
  SupportTicket.belongsTo(User, { foreignKey: 'user_id' })

  // Files
  User.hasMany(FileAsset, { foreignKey: 'user_id' })
  FileAsset.belongsTo(User, { foreignKey: 'user_id' })

  return models
}

