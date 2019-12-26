import { GraphQLResolveInfo } from 'graphql';
import { Context } from '../context';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type Battery = {
   __typename?: 'Battery',
  value?: Maybe<Scalars['Float']>,
  createdAt?: Maybe<Scalars['String']>,
};

/** Creates a patch. */
export type CreatePatchInput = {
  bleId?: Maybe<Scalars['String']>,
  userId?: Maybe<Scalars['Int']>,
};

export type CreatePatchPayload = {
   __typename?: 'CreatePatchPayload',
  /** The patch created. */
  patch?: Maybe<Patch>,
};

/** Creates a reading for a given patch. */
export type CreateReadingInput = {
  patchId?: Maybe<Scalars['Int']>,
  patchBleId?: Maybe<Scalars['ID']>,
  uri?: Maybe<Scalars['String']>,
  /** Commit hash associated with FW build. */
  firmwareVersion?: Maybe<Scalars['String']>,
  /** Packet sequence number since device was last powered on. Reset to 0 when device is powered off. */
  sequence?: Maybe<Scalars['Int']>,
  /** Number of milliseconds patch has been on. */
  uptimeMs?: Maybe<Scalars['Int']>,
  /** Set of tags used to provide additional context to reading. */
  tags?: Maybe<Array<Scalars['String']>>,
};

export type CreateReadingPayload = {
   __typename?: 'CreateReadingPayload',
  /** The patch created. */
  reading?: Maybe<Reading>,
};

export type Mutation = {
   __typename?: 'Mutation',
  updatePatch?: Maybe<UpdatePatchPayload>,
  createPatch?: Maybe<CreatePatchPayload>,
  createReading?: Maybe<CreateReadingPayload>,
  setPatchMode?: Maybe<SetPatchModePayload>,
  version?: Maybe<Scalars['String']>,
};


export type MutationUpdatePatchArgs = {
  input: UpdatePatchInput
};


export type MutationCreatePatchArgs = {
  input: CreatePatchInput
};


export type MutationCreateReadingArgs = {
  input: CreateReadingInput
};


export type MutationSetPatchModeArgs = {
  input: SetPatchModeInput
};

export type Patch = {
   __typename?: 'Patch',
  id: Scalars['Int'],
  bleId?: Maybe<Scalars['String']>,
  battery?: Maybe<Battery>,
  batteryActivity?: Maybe<Array<Battery>>,
  firmwareVersion?: Maybe<Scalars['String']>,
  appVersion?: Maybe<Scalars['String']>,
  mobileDevice?: Maybe<Scalars['String']>,
  readingCount?: Maybe<Scalars['Int']>,
  readings?: Maybe<Array<Reading>>,
  mode?: Maybe<Scalars['String']>,
};

export type Query = {
   __typename?: 'Query',
  readings?: Maybe<Array<Maybe<Reading>>>,
  version?: Maybe<Scalars['String']>,
  user?: Maybe<User>,
  viewer?: Maybe<User>,
};


export type QueryReadingsArgs = {
  patchId: Scalars['Int'],
  start?: Maybe<Scalars['String']>
};


export type QueryUserArgs = {
  id?: Maybe<Scalars['Int']>,
  username?: Maybe<Scalars['String']>
};

export type Reading = {
   __typename?: 'Reading',
  id: Scalars['Int'],
  createdAt?: Maybe<Scalars['String']>,
  uri?: Maybe<Scalars['String']>,
  firmwareVersion?: Maybe<Scalars['String']>,
  sequence?: Maybe<Scalars['Int']>,
  uptimeMs?: Maybe<Scalars['Int']>,
  tags?: Maybe<Array<Scalars['String']>>,
};

/** Creates a reading for a given patch. */
export type SetPatchModeInput = {
  patchId?: Maybe<Scalars['Int']>,
  mode?: Maybe<Scalars['String']>,
};

export type SetPatchModePayload = {
   __typename?: 'SetPatchModePayload',
  id: Scalars['Int'],
  mode?: Maybe<Scalars['String']>,
};

/** Updates patch of provided ID. */
export type UpdatePatchInput = {
  id: Scalars['Int'],
  bleId?: Maybe<Scalars['String']>,
};

export type UpdatePatchPayload = {
   __typename?: 'UpdatePatchPayload',
  /** The patch updated. */
  patch?: Maybe<Patch>,
};

export type User = {
   __typename?: 'User',
  patches: Array<Patch>,
  patch?: Maybe<Patch>,
  patients?: Maybe<Array<User>>,
  readings?: Maybe<Array<Reading>>,
  id: Scalars['Int'],
  username: Scalars['String'],
  firstName?: Maybe<Scalars['String']>,
  lastName?: Maybe<Scalars['String']>,
};


export type UserPatchArgs = {
  id: Scalars['Int']
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Query: ResolverTypeWrapper<{}>,
  Int: ResolverTypeWrapper<Partial<Scalars['Int']>>,
  String: ResolverTypeWrapper<Partial<Scalars['String']>>,
  Reading: ResolverTypeWrapper<Partial<Reading>>,
  User: ResolverTypeWrapper<Partial<User>>,
  Patch: ResolverTypeWrapper<Partial<Patch>>,
  Battery: ResolverTypeWrapper<Partial<Battery>>,
  Float: ResolverTypeWrapper<Partial<Scalars['Float']>>,
  Mutation: ResolverTypeWrapper<{}>,
  UpdatePatchInput: ResolverTypeWrapper<Partial<UpdatePatchInput>>,
  UpdatePatchPayload: ResolverTypeWrapper<Partial<UpdatePatchPayload>>,
  CreatePatchInput: ResolverTypeWrapper<Partial<CreatePatchInput>>,
  CreatePatchPayload: ResolverTypeWrapper<Partial<CreatePatchPayload>>,
  CreateReadingInput: ResolverTypeWrapper<Partial<CreateReadingInput>>,
  ID: ResolverTypeWrapper<Partial<Scalars['ID']>>,
  CreateReadingPayload: ResolverTypeWrapper<Partial<CreateReadingPayload>>,
  SetPatchModeInput: ResolverTypeWrapper<Partial<SetPatchModeInput>>,
  SetPatchModePayload: ResolverTypeWrapper<Partial<SetPatchModePayload>>,
  Boolean: ResolverTypeWrapper<Partial<Scalars['Boolean']>>,
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {},
  Int: Partial<Scalars['Int']>,
  String: Partial<Scalars['String']>,
  Reading: Partial<Reading>,
  User: Partial<User>,
  Patch: Partial<Patch>,
  Battery: Partial<Battery>,
  Float: Partial<Scalars['Float']>,
  Mutation: {},
  UpdatePatchInput: Partial<UpdatePatchInput>,
  UpdatePatchPayload: Partial<UpdatePatchPayload>,
  CreatePatchInput: Partial<CreatePatchInput>,
  CreatePatchPayload: Partial<CreatePatchPayload>,
  CreateReadingInput: Partial<CreateReadingInput>,
  ID: Partial<Scalars['ID']>,
  CreateReadingPayload: Partial<CreateReadingPayload>,
  SetPatchModeInput: Partial<SetPatchModeInput>,
  SetPatchModePayload: Partial<SetPatchModePayload>,
  Boolean: Partial<Scalars['Boolean']>,
}>;

export type BatteryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Battery'] = ResolversParentTypes['Battery']> = ResolversObject<{
  value?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
}>;

export type CreatePatchPayloadResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CreatePatchPayload'] = ResolversParentTypes['CreatePatchPayload']> = ResolversObject<{
  patch?: Resolver<Maybe<ResolversTypes['Patch']>, ParentType, ContextType>,
}>;

export type CreateReadingPayloadResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CreateReadingPayload'] = ResolversParentTypes['CreateReadingPayload']> = ResolversObject<{
  reading?: Resolver<Maybe<ResolversTypes['Reading']>, ParentType, ContextType>,
}>;

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  updatePatch?: Resolver<Maybe<ResolversTypes['UpdatePatchPayload']>, ParentType, ContextType, RequireFields<MutationUpdatePatchArgs, 'input'>>,
  createPatch?: Resolver<Maybe<ResolversTypes['CreatePatchPayload']>, ParentType, ContextType, RequireFields<MutationCreatePatchArgs, 'input'>>,
  createReading?: Resolver<Maybe<ResolversTypes['CreateReadingPayload']>, ParentType, ContextType, RequireFields<MutationCreateReadingArgs, 'input'>>,
  setPatchMode?: Resolver<Maybe<ResolversTypes['SetPatchModePayload']>, ParentType, ContextType, RequireFields<MutationSetPatchModeArgs, 'input'>>,
  version?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
}>;

export type PatchResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Patch'] = ResolversParentTypes['Patch']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  bleId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  battery?: Resolver<Maybe<ResolversTypes['Battery']>, ParentType, ContextType>,
  batteryActivity?: Resolver<Maybe<Array<ResolversTypes['Battery']>>, ParentType, ContextType>,
  firmwareVersion?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  appVersion?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  mobileDevice?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  readingCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  readings?: Resolver<Maybe<Array<ResolversTypes['Reading']>>, ParentType, ContextType>,
  mode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
}>;

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  readings?: Resolver<Maybe<Array<Maybe<ResolversTypes['Reading']>>>, ParentType, ContextType, RequireFields<QueryReadingsArgs, 'patchId'>>,
  version?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, QueryUserArgs>,
  viewer?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
}>;

export type ReadingResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Reading'] = ResolversParentTypes['Reading']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  uri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  firmwareVersion?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  sequence?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  uptimeMs?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  tags?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>,
}>;

export type SetPatchModePayloadResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SetPatchModePayload'] = ResolversParentTypes['SetPatchModePayload']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  mode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
}>;

export type UpdatePatchPayloadResolvers<ContextType = Context, ParentType extends ResolversParentTypes['UpdatePatchPayload'] = ResolversParentTypes['UpdatePatchPayload']> = ResolversObject<{
  patch?: Resolver<Maybe<ResolversTypes['Patch']>, ParentType, ContextType>,
}>;

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  patches?: Resolver<Array<ResolversTypes['Patch']>, ParentType, ContextType>,
  patch?: Resolver<Maybe<ResolversTypes['Patch']>, ParentType, ContextType, RequireFields<UserPatchArgs, 'id'>>,
  patients?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType>,
  readings?: Resolver<Maybe<Array<ResolversTypes['Reading']>>, ParentType, ContextType>,
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
}>;

export type Resolvers<ContextType = Context> = ResolversObject<{
  Battery?: BatteryResolvers<ContextType>,
  CreatePatchPayload?: CreatePatchPayloadResolvers<ContextType>,
  CreateReadingPayload?: CreateReadingPayloadResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  Patch?: PatchResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  Reading?: ReadingResolvers<ContextType>,
  SetPatchModePayload?: SetPatchModePayloadResolvers<ContextType>,
  UpdatePatchPayload?: UpdatePatchPayloadResolvers<ContextType>,
  User?: UserResolvers<ContextType>,
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = Context> = Resolvers<ContextType>;
