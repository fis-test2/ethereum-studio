import { IProjectItem } from '../project';
import { IApiError } from '../';

export interface IEnvironment {
    name: string;
    endpoint: string;
}

export interface IAccount {
    name: string;
    balance: Nullable<string>;
    address: Nullable<string>;
    type: string;
    walletName: Nullable<string>;
    isLocked: boolean;
}

export interface IOpenWallet {
    [key: string]: string[];
}

export interface IProjectState {
    project?: Partial<IProjectItem>;
    isProjectLoading: boolean;
    loadProjectError?: IApiError;
    environments: IEnvironment[];
    selectedEnvironment: IEnvironment;
    accounts: IAccount[];
    selectedAccount: IAccount;
    openWallets: IOpenWallet;
    metamaskAccounts: string[];
    dappfileData: any;
    isOwnProject: boolean;
}
