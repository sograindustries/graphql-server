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

/** Creates a patch. */
export type CreatePatchInput = {
  uuid?: Maybe<Scalars['String']>,
  userId?: Maybe<Scalars['Int']>,
};

export type CreatePatchPayload = {
   __typename?: 'CreatePatchPayload',
  /** The patch created. */
  patch?: Maybe<Patch>,
};

export type Mutation = {
   __typename?: 'Mutation',
  updatePatch?: Maybe<UpdatePatchPayload>,
  createPatch?: Maybe<CreatePatchPayload>,
  version?: Maybe<Scalars['String']>,
};


export type MutationUpdatePatchArgs = {
  input: UpdatePatchInput
};


export type MutationCreatePatchArgs = {
  input: CreatePatchInput
};

export type Patch = {
   __typename?: 'Patch',
  id: Scalars['Int'],
  uuid: Scalars['String'],
};

export type Query = {
   __typename?: 'Query',
  version?: Maybe<Scalars['String']>,
  user?: Maybe<User>,
  viewer?: Maybe<User>,
};


export type QueryUserArgs = {
  id?: Maybe<Scalars['Int']>,
  username?: Maybe<Scalars['String']>
};

/** Updates patch of provided ID. */
export type UpdatePatchInput = {
  id: Scalars['Int'],
  uuid?: Maybe<Scalars['String']>,
};

export type UpdatePatchPayload = {
   __typename?: 'UpdatePatchPayload',
  /** The patch updated. */
  patch?: Maybe<Patch>,
};

export type User = {
   __typename?: 'User',
  patches: Array<Patch>,
  id: Scalars['Int'],
  username: Scalars['String'],
  firstName?: Maybe<Scalars['String']>,
  lastName?: Maybe<Scalars['String']>,
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
  String: ResolverTypeWrapper<Partial<Scalars['String']>>,
  Int: ResolverTypeWrapper<Partial<Scalars['Int']>>,
  User: ResolverTypeWrapper<Partial<User>>,
  Patch: ResolverTypeWrapper<Partial<Patch>>,
  Mutation: ResolverTypeWrapper<{}>,
  UpdatePatchInput: ResolverTypeWrapper<Partial<UpdatePatchInput>>,
  UpdatePatchPayload: ResolverTypeWrapper<Partial<UpdatePatchPayload>>,
  CreatePatchInput: ResolverTypeWrapper<Partial<CreatePatchInput>>,
  CreatePatchPayload: ResolverTypeWrapper<Partial<CreatePatchPayload>>,
  Boolean: ResolverTypeWrapper<Partial<Scalars['Boolean']>>,
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {},
  String: Partial<Scalars['String']>,
  Int: Partial<Scalars['Int']>,
  User: Partial<User>,
  Patch: Partial<Patch>,
  Mutation: {},
  UpdatePatchInput: Partial<UpdatePatchInput>,
  UpdatePatchPayload: Partial<UpdatePatchPayload>,
  CreatePatchInput: Partial<CreatePatchInput>,
  CreatePatchPayload: Partial<CreatePatchPayload>,
  Boolean: Partial<Scalars['Boolean']>,
}>;

export type CreatePatchPayloadResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CreatePatchPayload'] = ResolversParentTypes['CreatePatchPayload']> = ResolversObject<{
  patch?: Resolver<Maybe<ResolversTypes['Patch']>, ParentType, ContextType>,
}>;

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  updatePatch?: Resolver<Maybe<ResolversTypes['UpdatePatchPayload']>, ParentType, ContextType, RequireFields<MutationUpdatePatchArgs, 'input'>>,
  createPatch?: Resolver<Maybe<ResolversTypes['CreatePatchPayload']>, ParentType, ContextType, RequireFields<MutationCreatePatchArgs, 'input'>>,
  version?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
}>;

export type PatchResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Patch'] = ResolversParentTypes['Patch']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  uuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
}>;

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  version?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, QueryUserArgs>,
  viewer?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
}>;

export type UpdatePatchPayloadResolvers<ContextType = Context, ParentType extends ResolversParentTypes['UpdatePatchPayload'] = ResolversParentTypes['UpdatePatchPayload']> = ResolversObject<{
  patch?: Resolver<Maybe<ResolversTypes['Patch']>, ParentType, ContextType>,
}>;

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  patches?: Resolver<Array<ResolversTypes['Patch']>, ParentType, ContextType>,
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
}>;

export type Resolvers<ContextType = Context> = ResolversObject<{
  CreatePatchPayload?: CreatePatchPayloadResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  Patch?: PatchResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  UpdatePatchPayload?: UpdatePatchPayloadResolvers<ContextType>,
  User?: UserResolvers<ContextType>,
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = Context> = Resolvers<ContextType>;
