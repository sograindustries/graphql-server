import { GraphQLResolveInfo } from 'graphql';
import { Context } from '../context';
export declare type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export declare type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
};
export declare type Patch = {
    __typename?: 'Patch';
    id: Scalars['String'];
    uuid: Scalars['String'];
    data: Array<Scalars['Int']>;
};
export declare type Query = {
    __typename?: 'Query';
    version?: Maybe<Scalars['String']>;
    user?: Maybe<User>;
    viewer?: Maybe<User>;
};
export declare type QueryUserArgs = {
    id?: Maybe<Scalars['String']>;
    username?: Maybe<Scalars['String']>;
};
export declare type User = {
    __typename?: 'User';
    patches: Array<Patch>;
    id: Scalars['String'];
    username: Scalars['String'];
    firstName?: Maybe<Scalars['String']>;
    lastName?: Maybe<Scalars['String']>;
};
export declare type WithIndex<TObject> = TObject & Record<string, any>;
export declare type ResolversObject<TObject> = WithIndex<TObject>;
export declare type ResolverTypeWrapper<T> = Promise<T> | T;
export declare type ResolverFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => Promise<TResult> | TResult;
export declare type StitchingResolver<TResult, TParent, TContext, TArgs> = {
    fragment: string;
    resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export declare type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | StitchingResolver<TResult, TParent, TContext, TArgs>;
export declare type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;
export declare type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => TResult | Promise<TResult>;
export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<{
        [key in TKey]: TResult;
    }, TParent, TContext, TArgs>;
    resolve?: SubscriptionResolveFn<TResult, {
        [key in TKey]: TResult;
    }, TContext, TArgs>;
}
export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
    resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}
export declare type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> = SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs> | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;
export declare type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> = ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>) | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;
export declare type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (parent: TParent, context: TContext, info: GraphQLResolveInfo) => Maybe<TTypes>;
export declare type NextResolverFn<T> = () => Promise<T>;
export declare type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (next: NextResolverFn<TResult>, parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => TResult | Promise<TResult>;
/** Mapping between all available schema types and the resolvers types */
export declare type ResolversTypes = ResolversObject<{
    Query: ResolverTypeWrapper<{}>;
    String: ResolverTypeWrapper<Partial<Scalars['String']>>;
    User: ResolverTypeWrapper<Partial<User>>;
    Patch: ResolverTypeWrapper<Partial<Patch>>;
    Int: ResolverTypeWrapper<Partial<Scalars['Int']>>;
    Boolean: ResolverTypeWrapper<Partial<Scalars['Boolean']>>;
}>;
/** Mapping between all available schema types and the resolvers parents */
export declare type ResolversParentTypes = ResolversObject<{
    Query: {};
    String: Partial<Scalars['String']>;
    User: Partial<User>;
    Patch: Partial<Patch>;
    Int: Partial<Scalars['Int']>;
    Boolean: Partial<Scalars['Boolean']>;
}>;
export declare type PatchResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Patch'] = ResolversParentTypes['Patch']> = ResolversObject<{
    id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    uuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    data?: Resolver<Array<ResolversTypes['Int']>, ParentType, ContextType>;
}>;
export declare type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
    version?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, QueryUserArgs>;
    viewer?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
}>;
export declare type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
    patches?: Resolver<Array<ResolversTypes['Patch']>, ParentType, ContextType>;
    id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;
export declare type Resolvers<ContextType = Context> = ResolversObject<{
    Patch?: PatchResolvers<ContextType>;
    Query?: QueryResolvers<ContextType>;
    User?: UserResolvers<ContextType>;
}>;
/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export declare type IResolvers<ContextType = Context> = Resolvers<ContextType>;
