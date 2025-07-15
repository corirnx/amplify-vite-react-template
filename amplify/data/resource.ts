import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

//
// PRODUCT 
//

const ProductStatus = a.enum(['OPEN', 'PENDING', 'IN_PROGRESS', 'AVALOQ', 'IN_CLOSE', 'CLOSED']);
const ProductCategory = a.enum(['ZINS', 'VV', 'NH', 'AV', 'MT', 'EO', 'CI']);

const ProductData = a.model({
  id: a.id().required(),
  createdAt: a.timestamp().required(),
  updatedAt: a.timestamp(),
  status: ProductStatus,
  category: ProductCategory,
  name: a.string().required(),
  customName: a.string(),
  platformPricingId: a.string(),
  platformOnboardingDatasetId: a.string(),

  events: a.hasMany('EventData', 'productDataEventsId'),
  todos: a.hasMany('TodoData', 'productDataTodosId'),
  portfolioInvestments: a.hasMany('PortfolioInvestmentData', 'productDataPortfolioInvestmentsId'),
  savingsPlans: a.hasMany('SavingsPlanData', 'productDataSavingsPlansId'),

  contractDataProductsId: a.string(),
  // TODO: .ref() or .belongsTo()
  contract: a.belongsTo('ContractData', 'contractDataProductsId'),

  clusterId: a.string().required(),
  // TODO: comma-separated string or JSON
  subId: a.string().required(),
}).secondaryIndexes((index) => [
  index("clusterId"),
  index("contractDataProductsId"),
  index("platformPricingId"),
  index("platformOnboardingDatasetId"),
]).authorization((allow) => [
  /* 
    TODO:
    set when calling or defining the schema
    allow: owner, provider: userPools, ownerField: "subId", identityClaim: "sub"
  */
  allow.owner("userPools")
]);



//
// TODO
//

const TodoCategoryData = a.enum(['USER', 'CONTRACT', 'PRODUCT']);
const TodoStatus = a.enum(['OPEN', 'PENDING', 'CANCELED', 'CLOSED']);
const TodoSubCategoryData = a.enum([
  'INITIAL_EMAIL_ADDRESS', 'INITIAL_MOBILE_NUMBER', 'INITIAL_PERSONAL_DATA', 'INITIAL_USER_NAME', 'INITIAL_BIRTH_DATE',
  'INITIAL_NATIONALITY', 'INITIAL_MARITAL_STATUS', 'INITIAL_ADDRESS', 'INITIAL_OCCUPATION', 'INITIAL_TAX_DATA',
  'INITIAL_REFERENCE_ACCOUNT', 'INITIAL_PAYMENT_INVESTMENT', 'INITIAL_PAYMENT_SAVINGS_PLAN', 'INITIAL_W8BEN',
  'INITIAL_IDENTITY', 'INITIAL_JOINT_INVITE_USER', 'INITIAL_JOINT_CONFIRM_USER', 'INITIAL_CHILD_PERSONAL_DATA',
  'INITIAL_CHILD_TAX_DATA', 'INITIAL_CHILD_BIRTH_CERTIFICATE', 'INITIAL_ACCEPT_TERMS', 'CONFIRM_EMAIL_ADDRESS',
  'CONFIRM_MOBILE_NUMBER', 'CONFIRM_PERSONAL_DATA', 'CONFIRM_RISK_PROFILE', 'CONFIRM_W8BEN', 'UPDATE_PERSONAL_DATA',
  'UPDATE_RISK_PROFILE', 'UPDATE_IDENTITY', 'UPDATE_CONTRACT', 'UPDATE_PRODUCT', 'UPDATE_PORTFOLIO_INVESTMENT_ALLOCATION',
  'UPDATE_PORTFOLIO_INVESTMENT_GROUP', 'ACCEPT_UPDATED_TERMS', 'CONTACT_SUPPORT'
]);

const TodoData = a.model({
  id: a.id().required(),
  createdAt: a.timestamp().required(),
  closedAt: a.timestamp(),

  dueDate: a.date(),
  status: TodoStatus,
  category: TodoCategoryData,
  subCategory: TodoSubCategoryData,
  order: a.integer().required(),
  sectionTitle: a.string(),
  groupTitle: a.string(),
  description: a.string().required(),

  userDetailDataTodosId: a.string(),
  contractDataTodosId: a.string(),
  productDataTodosId: a.string(),

  /*  
    TODO:
    .belongsTo() = strong bidirectional relationship, parent-child relationship, Amplify manages rel & enables navigation/filtering
    .ref() = weak reference, simple pointer to another model, loosely-coupled links
  */
  user: a.belongsTo('UserDetailData', 'userDetailDataTodosId'),
  contract: a.belongsTo('ContractData', 'contractDataTodosId'),
  product: a.belongsTo('ProductData', 'productDataTodosId'),

  clusterId: a.string().required(),
  // TODO: comma-separated string or JSON
  subId: a.string().required(),
}).secondaryIndexes((index) => [
  index("clusterId"),
  index("userDetailDataTodosId"),
  index("contractDataTodosId"),
  index("productDataTodosId"),
]).authorization((allow) => [
  /* 
    TODO:
    set when calling or defining the schema
    allow: owner, provider: userPools, ownerField: "subId", identityClaim: "sub"
  */
  allow.owner("userPools")
]);



//
// CONTRACT
//

const ContractAccountType = a.enum(['SINGLE', 'JOINT', 'CHILD_SINGLE', 'CHILD_JOINT']);
// const ContractRole = a.enum(['OWNER', 'LIMITED_OWNER', 'LEGAL_GUARDIAN', 'PROXY']);
const ContractStatus = a.enum(['OPEN', 'PENDING', 'IN_PROGRESS', 'AVALOQ', 'IN_CLOSE', 'CLOSED']);
const ContractServicePackage = a.enum([
  'QUIRION_DIGITAL',
  'QUIRION_PREMIUM',
  'QUIRION_PRIVATE',
  'NONE'
]);
const RiskClass = a.enum(['A', 'B', 'C', 'D', 'E']);

// non-model type
// const ContractUserData = a.model({
//   id: a.id().required(),
//   platformUserId: a.string().required(),
//   role: ContractRole,
// });

// non-model type
// const ContractDeclarationData = a.model({
//   acceptContract: a.timestamp(),
//   churchTax: a.timestamp(),
//   confirmOverviewData: a.timestamp(),
//   confirmTax: a.timestamp(),
//   noPEP: a.timestamp(),
//   noTaxUS: a.timestamp(),
//   onOwnAccount: a.timestamp(),
//   quirinAccount: a.timestamp(),
//   quirionAssetManagement: a.timestamp(),
//   quirionTermsOfService: a.timestamp(),
// });

const ContractData = a.model({
  id: a.id().required(),
  avaloqId: a.string(),

  createdAt: a.timestamp().required(),
  updatedAt: a.timestamp(),
  openedAt: a.timestamp(),

  entity: a.string().required(),
  wphgConfirmedAt: a.timestamp(),

  accountType: ContractAccountType,
  status: ContractStatus,
  name: a.string().required(),
  customName: a.string(),

  balance: a.float().required(),
  balanceDate: a.timestamp(),
  eod: a.float().required(),
  eodDate: a.timestamp(),
  performanceStartDate: a.timestamp(),
  mwr: a.float().required(),
  mwrYear: a.float().required(),
  twr: a.float().required(),
  twrYear: a.float().required(),

  servicePackage: ContractServicePackage,
  servicePackageStartDate: a.timestamp(),

  quirionAgbVersion: a.string(),
  quirionAgbDate: a.timestamp(),
  quirinAgbVersion: a.string(),
  quirinAgbDate: a.timestamp(),

  declaration: a.json(), // ContractDeclarationData

  riskClass: RiskClass,

  users: a.json().required(), // [ContractUserData]
  extraConditions: a.string().required(), // comma-separated string or JSON 

  platformContractId: a.string(),
  platformOnboardingDatasetId: a.string(),

  clearingBankAccounts: a.hasMany('BankAccountData', 'contractDataClearingBankAccountsId'),
  events: a.hasMany('EventData', 'contractDataEventsId'),
  postboxDocuments: a.hasMany('PostboxDocumentData', 'contractDataPostboxDocumentsId'),
  products: a.hasMany('ProductData', 'contractDataProductsId'),
  referenceBankAccounts: a.hasMany('ReferenceBankAccountData', 'contractDataReferenceBankAccountsId'),
  savingsPlans: a.hasMany('SavingsPlanData', 'contractDataSavingsPlansId'),
  todos: a.hasMany('TodoData', 'contractDataTodosId'),
  debitBankAccounts: a.hasMany('DebitBankAccountData', 'contractDataDebitBankAccountsId'),

  clusterId: a.string().required(),
  // TODO: comma-separated string or JSON
  subId: a.string().required(),
}).secondaryIndexes((index) => [
  index("entity"),
  index("platformContractId"),
  index("platformOnboardingDatasetId"),
  index("clusterId"),
]).authorization((allow) => [
  /* 
    TODO:
    set when calling or defining the schema
    allow: owner, provider: userPools, ownerField: "subId", identityClaim: "sub"
  */
  allow.owner("userPools")
]);



//
// DEPOT ITEM
//

const DepotItemClassData = a.enum(['STOCKS', 'BONDS', 'COMMODITIES']);
const DepotItemData = a.model({
  id: a.id().required(),
  createdAt: a.timestamp().required(),
  updatedAt: a.timestamp(),

  name: a.string().required(),
  assetId: a.string(),
  depotItemClass: DepotItemClassData,
  quantity: a.float(),
  currency: a.string(),
  currentPrice: a.float(),
  purchasePrice: a.float(),
  unitPrice: a.float(),
  unrealizedPnLEUR: a.float(),
  unrealizedPnLCurrency: a.float(),
  unrealizedPnLPercentage: a.float(),
  referenceDate: a.timestamp(),

  portfolioInvestmentDataDepotItemsId: a.string(),
  // TODO: .ref() or .belongsTo()
  portfolioInvestment: a.belongsTo('PortfolioInvestmentData', 'portfolioInvestmentDataDepotItemsId'),

  clusterId: a.string().required(),
  // TODO: comma-separated string or JSON
  subId: a.string().required(),
}).secondaryIndexes((index) => [
  index("portfolioInvestmentDataDepotItemsId"),
  index("clusterId"),
]).authorization((allow) => [
  /* 
    TODO:
    set when calling or defining the schema
    allow: owner, provider: userPools, ownerField: "subId", identityClaim: "sub"
  */
  allow.owner("userPools")
]);



//
// EVENT
//

const EventAccessLevel = a.enum(['USER', 'CONTRACT', 'PRODUCT']);
const EventCategory = a.enum(['USER', 'TRANSACTION', 'POSTBOX']);
const EventObjectType = a.enum([
  'USER_LOGIN', 'USER_LOGOUT', 'USER_CONFIRM_LOGIN', 'USER_PASSWORD_UPDATE',
  'TRANSACTION_DEPOT', 'TRANSACTION_DIRECT_DEBIT', 'TRANSACTION_DISBURSEMENT', 'TRANSACTION_TRANSFER',
  'TRANSACTION_WIRE', 'TRANSACTION_WITHDRAWAL', 'DOCUMENT_ACCOUNT_STATEMENT', 'DOCUMENT_INVOICE_STATEMENT',
  'DOCUMENT_QUARTERLY_STATEMENT', 'DOCUMENT_TAX_STATEMENT', 'DOCUMENT_PM_REPORTING', 'DOCUMENT_INVESTMENT_GUIDELINE',
  'DOCUMENT_COST_SHEET', 'DOCUMENT_ONBOARDING_PROTOCOL', 'DOCUMENT_PROCEED_SETTLEMENT', 'DOCUMENT_COST_REPORT',
  'DOCUMENT_FINANCE_REPORT', 'DOCUMENT_REBALANCING_INFORMATION', 'DOCUMENT_FACT_SHEET', 'DOCUMENT_IN_BOOKING',
  'DOCUMENT_OUT_BOOKING', 'DOCUMENT_TANDA', 'DOCUMENT_FONDS', 'DOCUMENT_AGB', 'DOCUMENT_LOSS', 'DOCUMENT_CONDITION',
  'DOCUMENT_DEPOSIT_GUARANTEE', 'DOCUMENT_CONTRACT', 'DOCUMENT_ADDITIONAL'
]);

const EventData = a.model({
  id: a.id().required(),
  createdAt: a.timestamp().required(),
  updatedAt: a.timestamp(),

  title: a.string().required(),
  description: a.string().required(),
  accessLevel: EventAccessLevel,
  category: EventCategory,
  objectType: EventObjectType,

  deviceName: a.string(),
  deviceModel: a.string(),
  deviceType: a.string(),

  userDetailDataEventsId: a.string(),
  contractDataEventsId: a.string(),
  productDataEventsId: a.string(),
  savingsPlanDataEventsId: a.string(),
  bankAccountDataEventsId: a.string(),
  transferDataEventsId: a.string(),
  directDebitDataEventsId: a.string(),
  withdrawalDataEventsId: a.string(),
  disbursementDataEventsId: a.string(),
  transactionDataEventsId: a.string(),
  postboxDocumentDataEventsId: a.string(),

  // TODO: .ref() or .belongsTo()
  user: a.belongsTo('UserDetailData', 'userDetailDataEventsId'),
  contract: a.belongsTo('ContractData', 'contractDataEventsId'),
  product: a.belongsTo('ProductData', 'productDataEventsId'),
  savingsPlan: a.belongsTo('SavingsPlanData', 'savingsPlanDataEventsId'),
  bankAccount: a.belongsTo('BankAccountData', 'bankAccountDataEventsId'),
  transfer: a.belongsTo('TransferData', 'transferDataEventsId'),
  directDebit: a.belongsTo('DirectDebitData', 'directDebitDataEventsId'),
  withdrawal: a.belongsTo('WithdrawalData', 'withdrawalDataEventsId'),
  disbursement: a.belongsTo('DisbursementData', 'disbursementDataEventsId'),
  postboxDocument: a.belongsTo('PostboxDocumentData', 'postboxDocumentDataEventsId'),
  portfolioInvestment: a.belongsTo('PortfolioInvestmentData', 'portfolioInvestmentDataEventsId'),

  clusterId: a.string().required(),
  // TODO: comma-separated string or JSON
  subId: a.string().required(),
}).identifier(['id'])//, 'createdAt'])
  .secondaryIndexes((index) => [
    index("userDetailDataEventsId"),
    index("contractDataEventsId"),
    index("productDataEventsId"),
    index("savingsPlanDataEventsId"),
    index("bankAccountDataEventsId"),
    index("transferDataEventsId"),
    index("directDebitDataEventsId"),
    index("withdrawalDataEventsId"),
    index("disbursementDataEventsId"),
    index("postboxDocumentDataEventsId"),
    index("clusterId"),
  ]).authorization((allow) => [
    /* 
      TODO:
      set when calling or defining the schema
      allow: owner, provider: userPools, ownerField: "subId", identityClaim: "sub"
    */
    allow.owner("userPools")
  ]);



//
// SAVINGSPLAN 
//
const SavingsPlanCategoryData = a.enum(['PORTFOLIO', 'INSTRUMENT']);
const SavingsPlanStatus = a.enum(['OPEN', 'PENDING', 'IN_PROGRESS', 'IN_CLOSE', 'CLOSED']);
const SavingsPlanIntervalType = a.enum(['DAY', 'MONTH', 'QUARTER']);

const SavingsPlanData = a.model({
  id: a.id().required(),
  createdAt: a.timestamp().required(),
  updatedAt: a.timestamp(),

  status: SavingsPlanStatus,
  category: SavingsPlanCategoryData,
  customName: a.string(),
  amount: a.float(),
  currency: a.string(),
  interval: a.integer(),
  intervalType: SavingsPlanIntervalType,
  startDate: a.date(),
  nextDate: a.date(),
  endDate: a.date(),
  executionDay: a.integer(),
  platformSavingsPlanId: a.string(),
  platformMandateId: a.string(),

  contractDataSavingsPlansId: a.string(),
  productDataSavingsPlansId: a.string(),
  portfolioInvestmentDataSavingsPlansId: a.string(),
  referenceBankAccountDataSavingsPlansId: a.string(),
  debitBankAccountDataSavingsPlansId: a.string(),
  // TODO: .ref() or .belongsTo()
  contract: a.belongsTo('ContractData', 'contractDataSavingsPlansId'),
  product: a.belongsTo('ProductData', 'productDataSavingsPlansId'),
  portfolioInvestment: a.belongsTo('PortfolioInvestmentData', 'portfolioInvestmentDataSavingsPlansId'),
  referenceBankAccount: a.belongsTo('ReferenceBankAccountData', 'referenceBankAccountDataSavingsPlansId'),
  debitBankAccount: a.belongsTo('DebitBankAccountData', 'debitBankAccountDataSavingsPlansId'),

  events: a.hasMany('EventData', 'savingsPlanDataEventsId'),

  clusterId: a.string().required(),
  // TODO: comma-separated string or JSON
  subId: a.string().required(),
}).secondaryIndexes((index) => [
  index("contractDataSavingsPlansId"),
  index("productDataSavingsPlansId"),
  index("portfolioInvestmentDataSavingsPlansId"),
  index("referenceBankAccountDataSavingsPlansId"),
  index("debitBankAccountDataSavingsPlansId"),
  index("clusterId"),
]).authorization((allow) => [
  /* 
    TODO:
    set when calling or defining the schema
    allow: owner, provider: userPools, ownerField: "subId", identityClaim: "sub"
  */
  allow.owner("userPools")
]);



//
// USER 
//
const UserStatus = a.enum(['IDENTIFIED', 'INACTIVE', 'ACTIVE']);
const UserAuthStatus = a.enum([
  'RESET_PASSWORD_REQUIRED',
  'FORCE_CHANGE_PASSWORD',
  'DISABLED',
  'UNCONFIRMED',
  'CONFIRMED',
]);
const UserGender = a.enum(['MALE', 'FEMALE', 'DIVERSE', 'EMPTY']);
const UserTitle = a.enum(['DOCTOR', 'PROFESSOR', 'EMPTY']);
const UserMaritalStatus = a.enum(['SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED', 'EMPTY']);
const UserOccupation = a.enum([
  'EMPLOYED',
  'UNEMPLOYED',
  'CIVIL_SERVANT',
  'RETIRED',
  'INDEPENDENT_MEANS',
  'HOMEMAKER',
  'STUDENT',
  'APPRENTICE',
  'CIVILIAN_SERVICE',
  'SELF_EMPLOYED',
  'OTHER_PRIVATE_INDIVIDUAL',
  'EMPTY',
]);
const UserOccupationIndustry = a.enum([
  'UNKNOWN',
  'INFORMATION_AND_COMMUNICATION',
  'HEALTHCARE',
  'ARTS_ENTERTAINMENT_AND_RECREATION',
  'MANUFACTURING',
  'FINANCIAL_AND_INSURANCE_SERVICES',
  'TRADE',
  'GASTRONOMY',
  'PUBLIC_RELATIONS_AND_BUSINESS_CONSULTING',
  'TRAVEL_SERVICES',
  'ENERGY_SUPPLY',
  'WATER_SUPPLY',
  'HOSPITALITY',
  'MINING',
  'AGRICULTURE_FORESTRY_AND_FISHING',
  'REAL_ESTATE',
  'OTHER_SERVICES',
  'LEGAL_TAX_AND_AUDITING',
  'CONSTRUCTION',
  'EDUCATION_AND_TEACHING',
  'VEHICLE_MAINTENANCE_AND_REPAIR',
  'TRANSPORTATION_AND_STORAGE',
  'EMPTY',
]);

// non-model type
// const UserTaxId = a.model({
//   country: a.string().required(),
//   tin: a.string().required(),
// });


const UserDetailData = a.model({
  id: a.id().required(),

  status: UserStatus,
  authStatus: UserAuthStatus,

  cognitoId: a.string(),
  confirmedAt: a.timestamp(),
  totalLoginAttempts: a.integer(),
  lastLoginAt: a.timestamp(),
  lastAttemptedLoginAt: a.timestamp(),

  mfa: a.boolean().required(),
  mfaCreatedAt: a.timestamp(),
  mfaConfirmedAt: a.timestamp(),

  email: a.string(),
  emailConfirmedAt: a.timestamp(),
  contactEmail: a.string(),
  phone: a.string(),
  phoneConfirmedAt: a.timestamp(),
  contactPhone: a.string(),

  birthDate: a.date(),
  birthName: a.string(),
  birthCity: a.string(),
  birthCountry: a.string(),

  street: a.string(),
  streetNumber: a.string(),
  additionalAddressInfo: a.string(),
  city: a.string(),
  state: a.string(),
  zip: a.string(),
  country: a.string(),

  gender: UserGender,
  title: UserTitle,
  firstName: a.string(),
  firstNameInUse: a.string(),
  middleName: a.string(),
  lastName: a.string(),

  isPoliticallyExposed: a.boolean(),
  landline: a.string(),
  maritalStatus: UserMaritalStatus,
  nationality: a.string(),
  occupation: UserOccupation,
  occupationIndustry: UserOccupationIndustry,
  qTag: a.string().required(),

  taxIds: a.json().required(), // [UserTaxIds]!

  isIdentified: a.boolean().required(),
  kycProcessId: a.string(),

  platformUserId: a.string(),
  platformUpdatedAt: a.timestamp(),
  platformKycProcessId: a.string(),

  emailOptIn: a.boolean().required(),
  emailOptInDate: a.timestamp(),
  phoneOptIn: a.boolean().required(),
  phoneOptInDate: a.timestamp(),
  offeringOptIn: a.boolean().required(),
  offeringOptInDate: a.timestamp(),
  acceptPrivacy: a.boolean().required(),
  acceptPrivacyDate: a.timestamp(),

  entity: a.string().required(),
  gwgConfirmedAt: a.timestamp(),
  w8BenConfirmedAt: a.timestamp(),
  hasDataChangeRequest: a.boolean(),

  events: a.hasMany('EventData', 'userDetailDataEventsId'),
  todos: a.hasMany('TodoData', 'userDetailDataTodosId'),

  clusterId: a.string().required(),
  // TODO: comma-separated string or JSON
  subId: a.string().required(),
}).identifier(['id'])
  .secondaryIndexes((index) => [
    index("clusterId"),
    index("platformUserId"),
    index("cognitoId"),
  ]).authorization((allow) => [
    /* 
      TODO:
      set when calling or defining the schema
      allow: owner, provider: userPools, ownerField: "subId", identityClaim: "sub"
    */
    allow.owner("userPools")
  ]);



//
// BANK ACCOUNT
//
const BankAccountCategoryData = a.enum(['CLEARING', 'LIQUID']);
const BankAccountStatus = a.enum(['OPEN', 'PENDING', 'IN_PROGRESS', 'AVALOQ', 'IN_CLOSE', 'CLOSED']);
const BankAccountInterestStatus = a.enum(['ACTIVE', 'PENDING', 'INACTIVE']);


const BankAccountData = a.model({
  id: a.id().required(),

  status: BankAccountStatus,
  category: BankAccountCategoryData,
  createdAt: a.timestamp().required(),
  updatedAt: a.timestamp(),

  interestStatus: BankAccountInterestStatus,

  accountHolder: a.string().required(),
  bic: a.string().required(),
  iban: a.string().required(),
  bankName: a.string().required(),

  balance: a.float().required(),
  balanceDate: a.timestamp(),
  currency: a.string().required(),
  eod: a.float().required(),
  exchangeRate: a.float().required(),

  platformBankAccountId: a.string(),

  directDebits: a.hasMany('DirectDebitData', 'bankAccountDataDirectDebitsId'),
  disbursements: a.hasMany('DisbursementData', 'bankAccountDataDisbursementsId'),
  events: a.hasMany('EventData', 'bankAccountDataEventsId'),
  transfers: a.hasMany('TransferData', 'bankAccountDataTransfersId'),
  withdrawals: a.hasMany('WithdrawalData', 'bankAccountDataWithdrawalsId'),

  contractDataClearingBankAccountsId: a.string(),
  portfolioInvestmentDataLiquidBankAccountsId: a.string(),
  // TODO: .ref() or .belongsTo()
  contract: a.belongsTo('ContractData', 'contractDataClearingBankAccountsId'),
  portfolioInvestment: a.belongsTo('PortfolioInvestmentData', 'portfolioInvestmentDataLiquidBankAccountsId'),

  clusterId: a.string().required(),
  // TODO: comma-separated string or JSON
  subId: a.string().required(),
}).secondaryIndexes((index) => [
  index("platformBankAccountId"),
  index("contractDataClearingBankAccountsId"),
  index("portfolioInvestmentDataLiquidBankAccountsId"),
  index("clusterId"),
]).authorization((allow) => [
  allow.owner("userPools")
]);


const ReferenceBankAccountData = a.model({
  id: a.id().required(),

  createdAt: a.timestamp().required(),
  updatedAt: a.timestamp(),

  accountHolder: a.string().required(),
  iban: a.string().required(),
  bic: a.string().required(),
  bankName: a.string().required(),

  platformMandateId: a.string(),
  platformReferenceAccountId: a.string(),

  directDebits: a.hasMany('DirectDebitData', 'referenceBankAccountDataDirectDebitsId'),
  disbursements: a.hasMany('DisbursementData', 'referenceBankAccountDataDisbursementsId'),
  savingsPlans: a.hasMany('SavingsPlanData', 'referenceBankAccountDataSavingsPlansId'),

  contractDataReferenceBankAccountsId: a.string(),
  // TODO: .ref() or .belongsTo()
  contract: a.belongsTo('ContractData', 'contractDataReferenceBankAccountsId'),

  clusterId: a.string().required(),
  // TODO: comma-separated string or JSON
  subId: a.string().required(),
}).secondaryIndexes((index) => [
  index("contractDataReferenceBankAccountsId"),
  index("platformReferenceAccountId"),
  index("clusterId"),
]).authorization((allow) => [
  /* 
    TODO:
    set when calling or defining the schema
    allow: owner, provider: userPools, ownerField: "subId", identityClaim: "sub"
  */
  allow.owner("userPools")
]);


const DebitBankAccountData = a.model({
  id: a.id().required(),

  createdAt: a.timestamp().required(),
  updatedAt: a.timestamp(),

  accountHolder: a.string().required(),
  iban: a.string().required(),
  bic: a.string().required(),
  bankName: a.string().required(),
  platformMandateId: a.string(),

  directDebits: a.hasMany('DirectDebitData', 'debitBankAccountDataDirectDebitsId'),
  savingsPlans: a.hasMany('SavingsPlanData', 'debitBankAccountDataSavingsPlansId'),

  contractDataDebitBankAccountsId: a.string(),
  // TODO: .ref() or .belongsTo()
  contract: a.belongsTo('ContractData', 'contractDataDebitBankAccountsId'),

  clusterId: a.string().required(),
  // TODO: comma-separated string or JSON
  subId: a.string().required(),
}).secondaryIndexes((index) => [
  index("contractDataDebitBankAccountsId"),
  index("clusterId"),
]).authorization((allow) => [
  /* 
    TODO:
    set when calling or defining the schema
    allow: owner, provider: userPools, ownerField: "subId", identityClaim: "sub"
  */
  allow.owner("userPools")
]);



//
// Portfolio Investment
//
const PortfolioInvestmentCategory = a.enum([
  'GLOBAL_PORTFOLIO', 'SUSTAINABLE_PORTFOLIO', 'MEGATRENDS_PORTFOLIO', 'TOPIC_PORTFOLIO',
  'CASH_INVEST_PORTFOLIO', 'RETIREMENT_PORTFOLIO', 'LEGACY_RETIREMENT_PORTFOLIO'
]);
const PortfolioInvestmentStockBondsSplit = a.enum([
  'SPLIT_0_100', 'SPLIT_10_90', 'SPLIT_20_80', 'SPLIT_30_70', 'SPLIT_40_60', 'SPLIT_50_50',
  'SPLIT_60_40', 'SPLIT_70_30', 'SPLIT_80_20', 'SPLIT_90_10', 'SPLIT_100_0'
]);
const PortfolioInvestmentStatus = a.enum(['ACTIVE', 'INACTIVE', 'STRATEGY_CHANGE', 'LIQUIDATION']);

const PortfolioInvestmentData = a.model({
  id: a.id().required(),
  avaloqIpsId: a.string(),
  status: PortfolioInvestmentStatus,
  category: PortfolioInvestmentCategory,
  stockBondsSplit: PortfolioInvestmentStockBondsSplit,
  entity: a.string(),
  wphgConfirmedAt: a.timestamp(),
  currency: a.string(),
  cashValue: a.float(),
  depotItemsValue: a.float(),
  totalValue: a.float(),
  valuationDate: a.date(),
  valuationUpdatedDate: a.timestamp(),
  roiAbsolute: a.float(),
  roiRelative: a.float(),
  mwr: a.float(),
  mwrYearToDate: a.float(),
  twr: a.float(),
  twrYearToDate: a.float(),
  performanceDate: a.date(),
  performanceUpdatedDate: a.timestamp(),
  performanceStartDate: a.date(),
  createdAt: a.timestamp().required(),
  updatedAt: a.timestamp(),
  openedAt: a.date(),
  platformPortfolioAllocationId: a.string(),
  platformPortfolioInvestmentId: a.string(),
  platformPricingId: a.string(),
  platformOnboardingDatasetId: a.string(),

  postboxDocuments: a.hasMany('PostboxDocumentData', 'portfolioInvestmentDataPostboxDocumentsId'),
  liquidBankAccounts: a.hasMany('BankAccountData', 'portfolioInvestmentDataLiquidBankAccountsId'),
  savingsPlans: a.hasMany('SavingsPlanData', 'portfolioInvestmentDataSavingsPlansId'),
  withdrawals: a.hasMany('WithdrawalData', 'portfolioInvestmentDataWithdrawalsId'),
  directDebits: a.hasMany('DirectDebitData', 'portfolioInvestmentDataDirectDebitsId'),
  transfers: a.hasMany('TransferData', 'portfolioInvestmentDataTransfersId'),
  depotItems: a.hasMany('DepotItemData', 'portfolioInvestmentDataDepotItemsId'),
  events: a.hasMany('EventData', 'portfolioInvestmentDataEventsId'),

  productDataPortfolioInvestmentsId: a.string(),
  // TODO: .ref() or .belongsTo()
  product: a.belongsTo('ProductData', 'productDataPortfolioInvestmentsId'),

  clusterId: a.string().required(),
  // TODO: comma-separated string or JSON
  subId: a.string().required(),
}).secondaryIndexes((index) => [
  index("avaloqIpsId"),
  index("entity"),
  index("platformPortfolioAllocationId"),
  index("platformPortfolioInvestmentId"),
  index("platformPricingId"),
  index("platformOnboardingDatasetId"),
  index("productDataPortfolioInvestmentsId"),
  index("clusterId"),
]).authorization((allow) => [
  /* 
    TODO:
    set when calling or defining the schema
    allow: owner, provider: userPools, ownerField: "subId", identityClaim: "sub"
  */
  allow.owner("userPools")
]);



//
// Transfer/DirectDebit/Withdrawl/Disbursement
//

const TransferStatus = a.enum(['NEW', 'PROCESSING', 'CONFIRMED', 'CANCELED']);
const TransferCategoryData = a.enum(['VOUCHER', 'CLEARING']);
const DirectDebitStatus = a.enum(['NEW', 'PROCESSING', 'CONFIRMED', 'CANCELED']);
const WithdrawalStatus = a.enum(['NEW', 'PROCESSING', 'CONFIRMED', 'CANCELED']);
const DisbursementStatus = a.enum(['NEW', 'PROCESSING', 'CONFIRMED', 'CANCELED']);

const TransferData = a.model({
  id: a.id().required(),
  createdAt: a.timestamp().required(),
  updatedAt: a.timestamp(),
  amount: a.float().required(),
  currency: a.string().required(),
  description: a.string(),
  status: TransferStatus,
  category: TransferCategoryData,
  debtorAccountId: a.string(),
  creditorAccountId: a.string(),
  voucherCode: a.string(),
  voucherSerialNumber: a.string(),
  platformMoneyTransferId: a.string(),

  events: a.hasMany('EventData', 'transferDataEventsId'),

  bankAccountDataTransfersId: a.string(),
  portfolioInvestmentDataTransfersId: a.string(),

  // TODO: .ref() or .belongsTo()
  bankAccount: a.belongsTo('BankAccountData', 'bankAccountDataTransfersId'),
  portfolioInvestment: a.belongsTo('PortfolioInvestmentData', 'portfolioInvestmentDataTransfersId'),

  clusterId: a.string().required(),
  // TODO: comma-separated string or JSON
  subId: a.string().required(),
}).identifier(['id']) //, 'createdAt'])
  .secondaryIndexes((index) => [
    index("portfolioInvestmentDataTransfersId"),
    index("bankAccountDataTransfersId"),
    index("platformMoneyTransferId"),
    index("clusterId"),
  ])
  .authorization((allow) => [
    /* 
      TODO:
      set when calling or defining the schema
      allow: owner, provider: userPools, ownerField: "subId", identityClaim: "sub"
    */
    allow.owner("userPools")
  ]);

const DirectDebitData = a.model({
  id: a.id().required(),
  createdAt: a.timestamp().required(),
  updatedAt: a.timestamp(),
  status: DirectDebitStatus,
  amount: a.float().required(),
  currency: a.string().required(),
  description: a.string(),
  platformDirectDebitId: a.string(),
  platformMandateId: a.string(),

  events: a.hasMany('EventData', 'directDebitDataEventsId'),

  portfolioInvestmentDataDirectDebitsId: a.string(),
  bankAccountDataDirectDebitsId: a.string(),
  referenceBankAccountDataDirectDebitsId: a.string(),
  debitBankAccountDataDirectDebitsId: a.string(),
  // TODO: .ref() or .belongsTo()
  portfolioInvestment: a.belongsTo('PortfolioInvestmentData', 'portfolioInvestmentDataDirectDebitsId'),
  bankAccount: a.belongsTo('BankAccountData', 'bankAccountDataDirectDebitsId'),
  referenceBankAccount: a.belongsTo('ReferenceBankAccountData', 'referenceBankAccountDataDirectDebitsId'),
  debitBankAccount: a.belongsTo('DebitBankAccountData', 'debitBankAccountDataDirectDebitsId'),

  clusterId: a.string().required(),
  // TODO: comma-separated string or JSON
  subId: a.string().required(),
}).identifier(['id'])//, 'createdAt'])
  .secondaryIndexes((index) => [
    index("portfolioInvestmentDataDirectDebitsId"),
    index("bankAccountDataDirectDebitsId"),
    index("referenceBankAccountDataDirectDebitsId"),
    index("debitBankAccountDataDirectDebitsId"),
    index("platformDirectDebitId"),
    index("clusterId"),
  ]).authorization((allow) => [
    /* 
      TODO:
      set when calling or defining the schema
      allow: owner, provider: userPools, ownerField: "subId", identityClaim: "sub"
    */
    allow.owner("userPools")
  ]);

const WithdrawalData = a.model({
  id: a.id().required(),
  createdAt: a.timestamp().required(),
  updatedAt: a.timestamp(),
  status: WithdrawalStatus,
  amount: a.float().required(),
  currency: a.string().required(),
  reason: a.string(),
  platformWithdrawalId: a.string(),

  events: a.hasMany('EventData', 'withdrawalDataEventsId'),

  bankAccountDataWithdrawalsId: a.string(),
  portfolioInvestmentDataWithdrawalsId: a.string(),
  // TODO: .ref() or .belongsTo()
  bankAccount: a.belongsTo('BankAccountData', 'bankAccountDataWithdrawalsId'),
  portfolioInvestment: a.belongsTo('PortfolioInvestmentData', 'portfolioInvestmentDataWithdrawalsId'),

  clusterId: a.string().required(),
  // TODO: comma-separated string or JSON
  subId: a.string().required(),
}).identifier(['id'])//, 'createdAt'])
  .secondaryIndexes((index) => [
    index("bankAccountDataWithdrawalsId"),
    index("portfolioInvestmentDataWithdrawalsId"),
    index("platformWithdrawalId"),
    index("clusterId"),
  ]).authorization((allow) => [
    /* 
      TODO:
      set when calling or defining the schema
      allow: owner, provider: userPools, ownerField: "subId", identityClaim: "sub"
    */
    allow.owner("userPools")
  ]);

const DisbursementData = a.model({
  id: a.id().required(),
  createdAt: a.timestamp().required(),
  updatedAt: a.timestamp(),
  status: DisbursementStatus,
  amount: a.float().required(),
  currency: a.string().required(),
  platformDisbursementId: a.string(),

  events: a.hasMany('EventData', 'disbursementDataEventsId'),

  bankAccountDataDisbursementsId: a.string(),
  referenceBankAccountDataDisbursementsId: a.string(),
  // TODO: .ref() or .belongsTo()
  bankAccount: a.belongsTo('BankAccountData', 'bankAccountDataDisbursementsId'),
  referenceBankAccount: a.belongsTo('ReferenceBankAccountData', 'referenceBankAccountDataDisbursementsId'),

  clusterId: a.string().required(),
  // TODO: comma-separated string or JSON
  subId: a.string().required(),
}).identifier(['id'])//, 'createdAt'])
  .secondaryIndexes((index) => [
    index("bankAccountDataDisbursementsId"),
    index("referenceBankAccountDataDisbursementsId"),
    index("platformDisbursementId"),
    index("clusterId"),
  ]).authorization((allow) => [
    /* 
      TODO:
      set when calling or defining the schema
      allow: owner, provider: userPools, ownerField: "subId", identityClaim: "sub"
    */
    allow.owner("userPools")
  ]);



//
// Postbox Document
//

const PostboxDocumentStatus = a.enum(['UNREAD', 'READ']);

const PostboxDocumentData = a.model({
  id: a.id().required(),
  createdAt: a.timestamp().required(),
  updatedAt: a.timestamp(),
  title: a.string().required(),
  filename: a.string().required(),
  description: a.string(),
  status: PostboxDocumentStatus,
  s3Key: a.string(),

  events: a.hasMany('EventData', 'postboxDocumentDataEventsId'),

  contractDataPostboxDocumentsId: a.string(),
  portfolioInvestmentDataPostboxDocumentsId: a.string(),
  // TODO: .ref() or .belongsTo()
  contract: a.belongsTo('ContractData', 'contractDataPostboxDocumentsId'),
  portfolioInvestment: a.belongsTo('PortfolioInvestmentData', 'portfolioInvestmentDataPostboxDocumentsId'),

  clusterId: a.string().required(),
  // TODO: comma-separated string or JSON
  subId: a.string().required(),
}).identifier(['id'])//, 'createdAt'])
  .secondaryIndexes((index) => [
    index("contractDataPostboxDocumentsId"),
    index("portfolioInvestmentDataPostboxDocumentsId"),
    index("clusterId"),
  ]).authorization((allow) => [
    /* 
      TODO:
      set when calling or defining the schema
      allow: owner, provider: userPools, ownerField: "subId", identityClaim: "sub"
    */
    allow.owner("userPools")
  ]);



//
// ContractSubscriptionDetails
//

// const ContractSubscriptionIneligibilityReason = a.enum([
//   'NOT_ENOUGH_CASH',
//   'STILL_IN_PACKAGE'
// ]);

// non-model type
// const ContractSubscriptionDetails = a.model({
//   servicePackage: ContractServicePackage,
//   isAvailable: a.boolean(),
//   isCurrentlyActive: a.boolean(),
//   isCustomerEligible: a.boolean(),
//   reasonsForIneligibility: a.json(), // [ContractSubscriptionIneligibilityReason]!
//   contractBalance: a.float(),
//   earliestCancelDate: a.date(),
//   earliestStartDate: a.date(),
//   executionStartDate: a.date(),
//   futurePackage: ContractServicePackage,
//   minimumContractPeriod: a.integer(),
//   minimumInvest: a.float(),
//   pricePerMonth: a.float(),
// });



//
// Platform 
//

// const PlatformOnboardingRelation = a.enum([
//   'CONTRACT',
//   'PRODUCT'
// ]);

// const PlatformOnboardingInvestmentPaymentMethod = a.enum([
//   'WIRE',
//   'DIRECT_DEBIT',
//   'INTERNAL_TRANSFER'
// ]);

// const PlatformOnboardingSavingsPlanPaymentMethod = a.enum([
//   'WIRE',
//   'DIRECT_DEBIT'
// ]);

// const PlatformOnboardingInvestmentObjective = a.enum([
//   'RETIREMENT',
//   'GROWTH',
//   'PRESERVATION',
//   'CUSHION',
//   'OTHER'
// ]);

// const PlatformOnboardingRiskPreference = a.enum([
//   'LOWER_EXPECTATIONS',
//   'BUY',
//   'SELL',
//   'INCREASE_RISK'
// ]);

// const PlatformOnboardingRiskPerception = a.enum([
//   'THRILL',
//   'CHANCE',
//   'INSECURITY',
//   'DANGER'
// ]);

// const PlatformOnboardingRiskTolerance = a.enum([
//   'FIVE_PERCENT',
//   'TEN_PERCENT',
//   'TWENTYFIVE_PERCENT',
//   'FIFTY_PERCENT',
//   'ANY'
// ]);

// const PlatformOnboardingRiskAssessment = a.enum([
//   'LOW',
//   'AVERAGE',
//   'OUTSTANDING',
//   'HIGH'
// ]);

// const PlatformOnboardingExperienceKnowledge = a.enum([
//   'PROFESSIONAL',
//   'VERY_GOOD',
//   'GOOD',
//   'MEDIUM',
//   'BAD'
// ]);

// const PlatformOnboardingExperienceCrashes = a.enum([
//   'KEEP',
//   'SELL',
//   'NONE'
// ]);

// const PlatformOnboardingExperienceTransactions = a.enum([
//   'MORE_THAN_FIVE',
//   'ONE_TO_FIVE',
//   'NONE'
// ]);

// const PlatformFreeAssetsRange = a.enum([
//   'RANGE_LESS_THAN_10K',
//   'RANGE_10K_TO_30K',
//   'RANGE_30K_TO_100K',
//   'RANGE_MORE_THAN_100K'
// ]);

// const PlatformTiedAssetsRange = a.enum([
//   'RANGE_NONE',
//   'RANGE_1_TO_10K',
//   'RANGE_10K_TO_30K',
//   'RANGE_30K_TO_100K',
//   'RANGE_MORE_THAN_100K'
// ]);

// const PlatformLoansRange = a.enum([
//   'RANGE_NONE',
//   'RANGE_1_TO_10K',
//   'RANGE_10K_TO_30K',
//   'RANGE_30K_TO_100K',
//   'RANGE_MORE_THAN_100K'
// ]);

// const PlatformMonthlyExpensesRange = a.enum([
//   'RANGE_LESS_THAN_1K',
//   'RANGE_1K_TO_2K',
//   'RANGE_2K_TO_3K',
//   'RANGE_3K_TO_4K',
//   'RANGE_4K_TO_5K',
//   'RANGE_MORE_THAN_5K'
// ]);

// const PlatformMonthlyIncomeRange = a.enum([
//   'RANGE_LESS_THAN_1500',
//   'RANGE_1500_TO_3K',
//   'RANGE_3K_TO_5K',
//   'RANGE_MORE_THAN_5K'
// ]);

// const InvestmentHorizon = a.enum([
//   'ZERO_TO_ONE',
//   'ONE_TO_THREE',
//   'THREE_TO_FIVE',
//   'FIVE_TO_TEN',
//   'TEN_TO_FIFTEEN',
//   'FIFTEEN_PLUS'
// ]);

// const InvestmentStrategy = a.enum([
//   'STRATEGY_CASH_INVEST',
//   'STRATEGY_0_100',
//   'STRATEGY_10_90',
//   'STRATEGY_20_80',
//   'STRATEGY_30_70',
//   'STRATEGY_40_60',
//   'STRATEGY_50_50',
//   'STRATEGY_60_40',
//   'STRATEGY_70_30',
//   'STRATEGY_80_20',
//   'STRATEGY_90_10',
//   'STRATEGY_100_0'
// ]);

// const RiskScore = a.enum([
//   'ONE',
//   'TWO',
//   'THREE',
//   'FOUR',
//   'FIVE'
// ]);

// const Ownership = a.enum([
//   'PERSONAL',
//   'JOINT',
//   'CHILD',
//   'CHILD_JOINT'
// ]);


// const ProductChoice = a.enum([
//   'PORTFOLIO_INVESTMENT',
//   'ACCOUNT_INTEREST'
// ]);

// const SourceOfFunds = a.enum([
//   'AGRICULTURE_AND_FORESTRY',
//   'BUSINESS_OPERATIONS',
//   'CAPITAL_ASSETS',
//   'DISPOSAL_OF_OWN_TRADE',
//   'DONATION',
//   'INDEPENDENT_WORK',
//   'INHERITANCE',
//   'INSURANCE_BENEFIT',
//   'NONINDEPENDENT_WORK',
//   'RENTING_AND_LEASING',
//   'SALE_OF_OWN_PROPERTY',
//   'EMPTY',
// ]);

// // non-model type
// const PlatformOnboardingQuestionnaire = a.model({
//   question: a.string().required(),
//   answers: a.json().required(), // [String!]!
//   possibleAnswers: a.json().required(), // [String!]!
// });

// // non-model type
// const PlatformOnboardingFinancialDetails = a.model({
//   currency: a.string().required(),
//   freeAssets: PlatformFreeAssetsRange,
//   loans: PlatformLoansRange,
//   monthlyIncome: PlatformMonthlyIncomeRange,
//   monthlyExpenses: PlatformMonthlyExpensesRange,
//   tiedAssets: PlatformTiedAssetsRange,
// });

// // non-model type
// const PlatformOnboardingGeneralInfo = a.model({
//   ownership: Ownership,
//   productChoice: ProductChoice,
//   sourceOfFunds: SourceOfFunds,
//   subscription: ContractServicePackage,
//   sustainability: a.boolean(),
// });

// non-model type
// const PlatformOnboardingInvestmentDetails = a.model({
//   investmentAmount: a.float().required(),
//   investmentMandateId: a.string(),
//   investmentPaymentMethod: PlatformOnboardingInvestmentPaymentMethod,
//   savingsPlanAmount: a.float().required(),
//   savingsPlanPaymentMethod: PlatformOnboardingSavingsPlanPaymentMethod,
//   savingsPlanDay: a.integer(),
//   savingsPlanInterval: a.integer(),
//   savingsPlanIntervalType: SavingsPlanIntervalType,
//   savingsPlanMandateId: a.string(),
// });

// // non-model type
// const PlatformOnboardingRiskProfile = a.model({
//   baseKnowledge: a.boolean(),
//   investmentHorizon: InvestmentHorizon,
//   manualInvestmentHorizon: a.integer(),
//   selectedStrategy: InvestmentStrategy,
//   possibleStrategies: a.json().required(), // [InvestmentStrategy!]
//   recommendedStrategy: InvestmentStrategy,
//   investmentObjective: PlatformOnboardingInvestmentObjective,
//   riskClass: RiskClass,
//   riskScore: RiskScore,
//   riskPreference: PlatformOnboardingRiskPreference,
//   riskPerception: PlatformOnboardingRiskPerception,
//   riskTolerance: PlatformOnboardingRiskTolerance,
//   riskAssessment: PlatformOnboardingRiskAssessment,
//   experienceKnowledge: PlatformOnboardingExperienceKnowledge,
//   experienceCrashes: PlatformOnboardingExperienceCrashes,
//   experienceTransactionsMoneyMarket: PlatformOnboardingExperienceTransactions,
//   experienceTransactionsSecurities: PlatformOnboardingExperienceTransactions,
// });

// non-model type
// const PlatformOnboardingDataset = a.model({
//   id: a.string().required(),
//   configVersion: a.integer(),
//   relation: PlatformOnboardingRelation,
//   parentId: a.string(),
//   createdAt: a.timestamp(),
//   updatedAt: a.timestamp(),
//   questionnaire: a.json().required(), // [PlatformOnboardingQuestionnaire!]
//   financialDetails: a.json(), // PlatformOnboardingFinancialDetails
//   generalInfo: a.json(), // PlatformOnboardingGeneralInfo
//   investmentDetails: a.json(), // PlatformOnboardingInvestmentDetails
//   riskProfile: a.json(), // PlatformOnboardingRiskProfile
// });

// const PlatformMandateType = a.enum([
//   'ONE_TIME',
//   'RECURRENT'
// ]);

// Non-model type
// const PlatformMandateAddress = a.model({
//   city: a.string().required(),
//   country: a.string().required(),
//   postcode: a.string().required(),
//   state: a.string().required(),
//   street: a.string().required(),
//   streetNumber: a.string().required(),
// });

// // Non-model type
// const PlatformMandate = a.model({
//   accountHolder: a.string().required(),
//   bankName: a.string().required(),
//   bic: a.string().required(),
//   confirmedAt: a.timestamp().required(),
//   createdAt: a.timestamp().required(),
//   creditorAddress: a.json().required(), // PlatformMandateAddress
//   creditorId: a.string().required(),
//   creditorName: a.string().required(),
//   iban: a.string().required(),
//   id: a.string().required(),
//   reference: a.string().required(),
//   type: PlatformMandateType,
//   platformUserId: a.string().required(),
// });

// const PlatformSavingsPlanStatus = a.enum([
//   'ACTIVE',
//   'INACTIVE'
// ]);

// // non-model type
// const PlatformSavingsPlan = a.model({
//   id: a.id().required(),
//   platformUserId: a.string().required(),
//   platformContractId: a.string().required(),
//   platformBankAccountId: a.string().required(),
//   platformSavingsPlanId: a.string().required(),
//   platformMandateId: a.string(),
//   cashAmount: a.float().required(),
//   currency: a.string().required(),
//   interval: a.integer().required(),
//   intervalType: SavingsPlanIntervalType,
//   name: a.string(),
//   startDate: a.date().required(),
//   executionDay: a.integer(),
//   status: PlatformSavingsPlanStatus,
//   createdAt: a.timestamp().required(),
//   updatedAt: a.timestamp().required(),
// });

// // non-model type
// const PlatformUserAddress = a.model({
//   street: a.string(),
//   streetNumber: a.string(),
//   additionalAddressInfo: a.string(),
//   postcode: a.string(),
//   city: a.string(),
//   state: a.string(),
//   country: a.string(),
// });

// // non-model type
// const PlatformUserTaxInformation = a.model({
//   tin: a.string(),
//   country: a.string(),
// });

// // non-model type
// const PlatformPortfolioPerformanceMetrics = a.model({
//   relax: a.integer().required(),
//   risk: a.integer().required(),
//   loss: a.float().required(),
//   profit: a.float().required(),
//   volatility: a.float().required(),
//   yield: a.float().required(),
// });

// // non-model type
// const PlatformPortfolioSecurity = a.model({
//   category: a.string().required(),
//   id: a.string().required(),
//   securityId: a.string().required(),
//   name: a.string().required(),
//   ter: a.float().required(),
//   weight: a.float().required(),
//   type: a.string().required(),
// });

// // non-model type
// const PlatformPortfolioAllocation = a.model({
//   id: a.string().required(),
//   portfolioGroup: a.string().required(),
//   allocations: a.json().required(), // [PlatformPortfolioSecurity!]!
//   name: a.string().required(),
//   performanceMetrics: a.json().required(), // PlatformPortfolioPerformanceMetrics
//   averageTer: a.float().required(),
// });

// const PlatformBankAccountInterestStatus = a.enum([
//   'ACTIVE',
//   'PENDING',
//   'INACTIVE'
// ]);

// // non-model type
// const PlatformClearingBankAccount = a.model({
//   id: a.string().required(),
//   interestStatus: PlatformBankAccountInterestStatus,
// });

// const PlatformMoneyTransferStatus = a.enum([
//   'NEW',
//   'PROCESSING',
//   'CONFIRMED',
//   'CANCELED'
// ]);

// // non-model type
// const PlatformMoneyTransfer = a.model({
//   id: a.string().required(),
//   platformUserId: a.string().required(),
//   platformContractId: a.string().required(),
//   platformDebtorAccountId: a.string().required(),
//   platformCreditorAccountId: a.string().required(),
//   amount: a.float().required(),
//   currency: a.string().required(),
//   createdAt: a.timestamp().required(),
//   updatedAt: a.timestamp().required(),
//   status: PlatformMoneyTransferStatus,
// });

// const PlatformPortfolioInvestmentReallocationStatus = a.enum([
//   'NEW',
//   'PROCESSING',
//   'CONFIRMED',
//   'CANCELED'
// ]);

// // non-model type
// const PlatformPortfolioInvestmentReallocation = a.model({
//   id: a.string(),
//   platformUserId: a.string(),
//   platformContractId: a.string(),
//   platformPortfolioInvestmentId: a.string(),
//   createdAt: a.timestamp(),
//   updatedAt: a.timestamp(),
//   closedAt: a.timestamp(),
//   canceledAt: a.timestamp(),
//   processedAt: a.timestamp(),
//   platformAllocationId: a.string(),
//   currentPlatformAllocationId: a.string(),
//   status: PlatformPortfolioInvestmentReallocationStatus,
//   processingDate: a.date(),
// });

// // non-model type
// const PlatformPortfolioInvestmentValuation = a.model({
//   id: a.string().required(),
//   createdAt: a.timestamp().required(),
//   updatedAt: a.timestamp().required(),
//   valuationTime: a.timestamp().required(),

//   platformContractId: a.string().required(),
//   platformPortfolioInvestmentId: a.string().required(),
//   currency: a.string().required(),

//   totalValue: a.float().required(),
//   totalCashBalance: a.float().required(),
//   totalSecurityValue: a.float().required(),

//   pendingWithdrawalsSum: a.float().required(),
//   pendingMoneyTransfersSum: a.float().required(),
//   pendingDirectDebitSum: a.float().required(),
// });

// // non-model type
// const PlatformClearingAccountBalance = a.model({
//   platformContractId: a.string().required(),
//   platformClearingBankAccountId: a.string().required(),
//   currency: a.string().required(),

//   balance: a.float().required(),
//   availableBalance: a.float().required(),
//   preliminaryAvailableBalance: a.float().required(),
//   pendingDisbursementsSum: a.float().required(),
//   pendingMoneyTransfersSum: a.float().required(),
// });

// // non-model type
// const PlatformContractValuation = a.model({
//   id: a.string().required(),
//   createdAt: a.timestamp().required(),
//   updatedAt: a.timestamp().required(),
//   valuationTime: a.timestamp().required(),

//   platformContractId: a.string().required(),
//   currency: a.string().required(),

//   totalValue: a.float().required(),
//   totalCashBalance: a.float().required(),
//   totalSecurityValue: a.float().required(),

//   debitReservationLastEightWeeks: a.float().required(),
//   pendingDisbursementsSum: a.float().required(),
//   pendingMoneyTransfersSum: a.float().required(),
// });

// // non-model type
// const PlatformPortfolioInvestment = a.model({
//   id: a.string().required(),
//   createdAt: a.timestamp().required(),
//   updatedAt: a.timestamp().required(),

//   customName: a.string(),
//   platformAllocationId: a.string().required(),
//   platformContractId: a.string().required(),
//   platformOnboardingDatasetId: a.string().required(),
//   wphgConfirmedAt: a.timestamp(),
// });

// // non-model type
// const PlatformPortfolioInvestmentDeletion = a.model({
//   id: a.string().required(),
//   platformPortfolioInvestmentId: a.string().required(),
// });

// const PlatformDisbursementStatus = a.enum([
//   'NEW',
//   'CONFIRMED',
//   'APPROVED',
//   'PENDING',
//   'CLOSED',
//   'CANCELED'
// ]);

// // non-model type
// const PlatformDisbursement = a.model({
//   id: a.string().required(),
//   platformUserId: a.string().required(),
//   platformContractId: a.string().required(),
//   platformBankAccountId: a.string().required(),
//   platformReferenceAccountId: a.string().required(),
//   amount: a.float().required(),
//   currency: a.string().required(),
//   createdAt: a.timestamp().required(),
//   updatedAt: a.timestamp().required(),
//   status: PlatformDisbursementStatus,
// });

// // non-model type
// const PlatformHistoryItem = a.model({
//   date: a.date().required(),
//   value: a.float().required(),
// });

// const PlatformWithdrawalStatus = a.enum([
//   'NEW',
//   'PROCESSING',
//   'CONFIRMED',
//   'CANCELED'
// ]);

// // non-model type
// const PlatformWithdrawal = a.model({
//   id: a.string().required(),
//   platformUserId: a.string().required(),
//   platformContractId: a.string().required(),
//   platformBankAccountId: a.string().required(),
//   amount: a.float().required(),
//   currency: a.string().required(),
//   createdAt: a.timestamp().required(),
//   updatedAt: a.timestamp().required(),
//   status: PlatformWithdrawalStatus,
// });

// const PlatformTaxExemptionUserRole = a.enum([
//   'ACCOUNT_HOLDER',
//   'LEGAL_GUARDIAN'
// ]);

// const PlatformTaxExemptionStatus = a.enum([
//   'INACTIVE',
//   'PROCESSING',
//   'ACTIVE'
// ]);

// // non-model type
// const PlatformTaxExemption = a.model({
//   platformTaxExemptionId: a.string(),
//   balance: a.float(),
//   createdAt: a.timestamp(),
//   endDate: a.date(),
//   startDate: a.date(),
//   status: a.string(),
//   updatedAt: a.timestamp(),
//   upperThreshold: a.float(),
//   users: a.json().required(), // [PlatformTaxExemptionUser!]
// });

// const TransactionType = a.enum([
//   'TAX_PAYMENT',
//   'CREDIT_FUNDING',
//   'SEPA_DIRECT_DEBIT',
//   'SEPA_DIRECT_DEBIT_CHARGE_BACK',
//   'SECURITIES_PURCHASE',
//   'SECURITIES_SALE',
//   'OUTGOING_TRANSFER',
//   'FEE_COLLECTION',
//   'FEE_COLLECTION_CANCELLATION',
//   'CASH_BONUS',
//   'TRAILER_FEE_PAYMENT',
//   'CASH_DIVIDEND',
//   'TRANSFER',
//   'SUBSCRIPTION',
//   'WITHDRAWAL',
//   'SECURITIES_REFUND',
//   'LEDGER_TRANSFER',
//   'INCOMING_PAYMENT_REVERSAL',
//   'INTEREST_SETTLEMENT',
//   'UNKNOWN'
// ]);

// const TransactionStatus = a.enum([
//   'PENDING',
//   'CLOSED'
// ]);

// const PlatformListTransactionsSortOrder = a.enum([
//   'ASC',
//   'DESC'
// ]);

// // non-model type
// const PlatformTransaction = a.model({
//   platformTransactionId: a.string().required(),
//   platformContractId: a.string().required(),
//   platformPortfolioInvestmentId: a.string(),
//   platformBankAccountId: a.string().required(),
//   bankAccountType: BankAccountCategoryData,
//   transactionType: TransactionType,
//   transactionStatus: TransactionStatus,
//   amount: a.float().required(),
//   currency: a.string().required(),
//   bookingText: a.string().required(),
//   bookingDate: a.timestamp().required(),
//   performanceDate: a.timestamp().required(),
//   valueDate: a.timestamp().required(),
//   createdAt: a.timestamp().required(),
//   updatedAt: a.timestamp().required(),
// });

// // non-model type
// const PlatformListTransactionsMeta = a.model({
//   count: a.integer().required(),
//   limit: a.integer().required(),
//   offset: a.integer().required(),
//   sortOrder: PlatformListTransactionsSortOrder,
//   sortBy: a.string().required(),
//   totalCount: a.integer().required(),
// });


//
// ContractSubscription
//

// const ContractSubscriptionOrderStatus = a.enum([
//   'NEW',
//   'PENDING',
//   'CANCELED',
//   'CLOSED'
// ]);

// // non-model type
// const ContractSubscriptionOrder = a.model({
//   id: a.string().required(),
//   contractId: a.string().required(),
//   status: ContractSubscriptionOrderStatus,
//   servicePackage: ContractServicePackage,
//   canceledAt: a.timestamp(),
//   processedAt: a.timestamp(),
//   closedAt: a.timestamp(),
//   updatedAt: a.timestamp().required(),
//   createdAt: a.timestamp().required(),
//   earliestStartDate: a.date().required(),
// });



const schema = a.schema({
  // ContractUserData,
  //ContractDeclarationData,
  //UserTaxId,
  BankAccountData,
  UserDetailData,
  EventData,
  PortfolioInvestmentData,
  SavingsPlanData,
  ReferenceBankAccountData,
  DebitBankAccountData,
  TransferData,
  DirectDebitData,
  WithdrawalData,
  DisbursementData,
  PostboxDocumentData,
  ContractData,
  DepotItemData,
  ProductData,
  TodoData,
  // ContractSubscriptionDetails,
  // PlatformOnboardingDataset,
  // PlatformOnboardingQuestionnaire,
  // PlatformOnboardingFinancialDetails,
  // PlatformOnboardingGeneralInfo,
  // PlatformOnboardingInvestmentDetails,
  // PlatformOnboardingRiskProfile,
  // PlatformMandateAddress,
  // PlatformMandate,
  // PlatformSavingsPlan,
  // PlatformUserAddress,
  // PlatformUserTaxInformation,
  // PlatformPortfolioPerformanceMetrics,
  // PlatformPortfolioSecurity,
  // PlatformPortfolioAllocation,
  // ContractSubscriptionOrder,
  // PlatformClearingBankAccount,
  // PlatformMoneyTransfer,
  // PlatformPortfolioInvestmentReallocation,
  // PlatformPortfolioInvestmentValuation,
  // PlatformClearingAccountBalance,
  // PlatformContractValuation,
  // PlatformPortfolioInvestment,
  // PlatformPortfolioInvestmentDeletion,
  // PlatformDisbursement,
  // PlatformHistoryItem,
  // PlatformWithdrawal,
  // PlatformTaxExemption,
  // PlatformTransaction,
  // PlatformListTransactionsMeta,
  // PlatformOnboardingRelation,
  // PlatformOnboardingInvestmentPaymentMethod,
  // PlatformOnboardingSavingsPlanPaymentMethod,
  // PlatformOnboardingInvestmentObjective,
  // PlatformOnboardingRiskPreference,
  // PlatformOnboardingRiskPerception,
  // PlatformOnboardingRiskTolerance,
  // PlatformOnboardingRiskAssessment,
  // PlatformOnboardingExperienceKnowledge,
  // PlatformOnboardingExperienceCrashes,
  // PlatformOnboardingExperienceTransactions,
  // PlatformFreeAssetsRange,
  // PlatformTiedAssetsRange,
  // PlatformLoansRange,
  // PlatformMonthlyExpensesRange,
  // PlatformMonthlyIncomeRange,
  // InvestmentHorizon,
  // InvestmentStrategy,
  // RiskScore,
  // Ownership,
  // ProductChoice,
  // SourceOfFunds,
  // PlatformTaxExemptionUserRole,
  // PlatformTaxExemptionStatus,
  // TransactionType,
  // TransactionStatus,
  // PlatformListTransactionsSortOrder
});


export type Schema = ClientSchema<typeof schema>;
export const data = defineData({
  schema,
  // authorizationModes: {
  //   defaultAuthorizationMode: "apiKey",
  //   apiKeyAuthorizationMode: {
  //     expiresInDays: 30,
  //   },
  // },
});