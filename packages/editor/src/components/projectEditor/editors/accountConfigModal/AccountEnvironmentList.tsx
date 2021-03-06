// Copyright 2018 Superblocks AB
//
// This file is part of Superblocks Lab.
//
// Superblocks Lab is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation version 3 of the License.
//
// Superblocks Lab is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Superblocks Lab.  If not, see <http://www.gnu.org/licenses/>.

import React, { Component } from 'react';
import classnames from 'classnames';
import Web3 from 'web3';
import style from './style.less';
import { IEnvironment, IAccount } from '../../../../models/state';
import Networks from '../../../../networks';

interface IProps {
    environments: IEnvironment[];
    // selectedAccount: IAccount;
}

interface IState {
    accountBalanceDirty: boolean;
    accountAddressDirty: boolean;
    selectedEnvironment?: IEnvironment;
}

export default class AccountEnvironmentList extends Component<IProps, IState> {

    state = {
        accountBalanceDirty: false,
        accountAddressDirty: false,
        selectedEnvironment: this.props.environments.find(env => env.name === Networks.browser.name),
        // wallet: this.props.openWallets.
    };

    // TODO
    // canClose = (cb, silent) => {
    //     if (
    //         (this.state.accountBalanceDirty ||
    //             this.state.accountAddressDirty ||
    //             this.state.accountNameDirty) &&
    //         !silent
    //     ) {
    //         const flag = confirm(
    //             'There is unsaved data. Do you want to close tab and loose the changes?'
    //         );
    //         cb(flag ? 0 : 1);
    //         return;
    //     }
    //     cb(0);
    // }

    // setEnv = env => {
    //     // Set all initial values of the account.
    //     let isLocked = false;
    //     let walletType = null;
    //     let address;
    //     let walletItem = null;
    //     const walletName = this.props.item.getWallet(env);
    //     const accountIndex = this.props.item.getAccountIndex(env);
    //     if (walletName) {
    //         walletItem = this.props.item
    //             .getProject()
    //             .getHiddenItem('wallets')
    //             .getByName(walletName);
    //     }
    //     if (walletItem) {
    //         walletType = walletItem.getWalletType();
    //         if (walletType === 'external') {
    //             if (!window.web3) {
    //                 if (this.props.functions.wallet.isOpen(walletName)) {
    //                     address = this.props.functions.wallet.getAddress(
    //                         walletName,
    //                         accountIndex
    //                     );
    //                 } else {
    //                     isLocked = true;
    //                 }
    //             } else {
    //                 const extAccounts = window.web3.eth.accounts || [];
    //                 isLocked = extAccounts.length < 1;
    //                 address = extAccounts[0];
    //             }
    //         } else {
    //             // Local wallet
    //             if (this.props.functions.wallet.isOpen(walletName)) {
    //                 address = this.props.functions.wallet.getAddress(
    //                     walletName,
    //                     accountIndex
    //                 );
    //             } else {
    //                 isLocked = true;
    //             }
    //         }
    //     } else {
    //         address = this.props.item.getAddress(env);
    //     }
    //     address = address || '';  // To not have the input component be uncontrolled.

    //     const network = env;
    //     // Initial (editable) values
    //     this.form = {
    //         env,
    //         name: this.props.item.getName(),
    //         walletName,
    //         wallet: walletItem,
    //         walletType,
    //         address,
    //         balance: 0,
    //         balanceFormatted: '0',
    //         balanceError: '',
    //         isLocked,
    //         web3: this._getWeb3(
    //             (this.props.functions.networks.endpoints[network] || {})
    //                 .endpoint
    //         ),
    //     };
    //     this._fetchBalance(address);
    // }

    // _getWeb3 = endpoint => {
    //     let provider;
    //     if (endpoint.toLowerCase() == 'http://superblocks-browser') {
    //         provider = this.props.functions.EVM.getProvider();
    //     } else {
    //         provider = new Web3.providers.HttpProvider(endpoint);
    //     }
    //     let web3 = new Web3(provider);
    //     return web3;
    // }

    // _fetchBalance = address => {
    //     // Get balance and update this.form.balance
    //     if (!address || address.length < 5) {
    //         // a 0x00 address...
    //         return;
    //     }
    //     const form = this.form; // Grab the reference so we avoid race conditions updating the same object when changing environments.

    //     this.form.web3.eth.getBalance(address, (err, res) => {
    //         if (err) {
    //             this.form.balance = 0;
    //             this.form.balanceError = '<could not get balance>';
    //         } else {
    //             this.form.balance = res.toNumber();
    //             this.form.balanceOriginal = this.form.balance;
    //             this.form.balanceFormatted = this.form.web3.fromWei(
    //                 this.form.balance
    //             );
    //             this.form.balanceError = '';
    //         }
    //         this.redraw();
    //     });
    // }

    // _save = cb => {
    //     const project = this.props.item.getProject();

    //     if (this.props.item.getName() != this.form.name) {
    //         // Name is changing, check for clash.
    //         if (
    //             project
    //                 .getHiddenItem('accounts')
    //                 .getByName(this.form.name)
    //         ) {
    //             alert('Error: An account with that name already exists.');
    //             cb(1);
    //             return;
    //         }
    //     }

    //     const oldname = this.props.item.getName();
    //     this.props.item.reKey(this.form.name);
    //     project.setAccountName(oldname, this.form.name, () => {
    //         if (project.getHiddenItem('accounts').getChosen() == oldname) {
    //             project.getHiddenItem('accounts').setChosen(this.form.name);
    //         }
    //         this.props.router.main.redraw(true);
    //         cb(0);
    //     });
    // }

    onEnvChange = (e: any, selectedEnvironment: IEnvironment) => {
        e.preventDefault();
        this.setState({
            selectedEnvironment
        });
    }

    // unlockWallet = name => {
    //     this.props.functions.wallet.openWallet(name, null, status => {
    //         if (status === 0) {
    //             // Reload data (for the same env)
    //             this.setEnv(this.form.env);
    //         } else if (status === 1) {
    //             // Cancelled
    //             return;
    //         } else {
    //             alert(
    //                 'Computer says no. The seed entered is not a valid 12 word seed.'
    //             );
    //         }
    //     });
    // }

    // onAddressChange = e => {
    //     let value = e.target.value;
    //     this.form.address = value;
    //     this.setState({ accountAddressDirty: true });
    // }

    // _staticAddressSave = e => {
    //     e.preventDefault();

    //     if (
    //         !(
    //             this.form.address.match(/^0x([a-fA-F0-9]){40}$/) ||
    //             this.form.address == '0x0'
    //         )
    //     ) {
    //         alert(
    //             'Illegal Ethereum account address. Must be on format: 0xabcdef0123456789, 42 characters in total or 0x0.'
    //         );
    //         return;
    //     }

    //     this.props.item
    //         .getProject()
    //         .setAccountAddress(
    //             this.props.item.getName(),
    //             this.form.address,
    //             this.form.env,
    //             () => {
    //                 if (
    //                     this._save(status => {
    //                         if (status == 0) {
    //                             this.setState({ accountAddressDirty: false });
    //                         }
    //                     })
    //                 ) {; }
    //             }
    //         );
    // }

    // onBalanceChange = e => {
    //     let value = e.target.value;
    //     this.form.balance = value;
    //     this.form.balanceFormatted = this.form.web3.fromWei(this.form.balance);
    //     this.setState({ accountBalanceDirty: true });
    // }

    // _balanceSave = e => {
    //     e.preventDefault();

    //     if (
    //         !this.form.balance.match(/^([0-9]+)$/) ||
    //         !isNaN(parseInt(this.form.balance))
    //     ) {
    //         alert('Bad integer format.');
    //         return;
    //     }

    //     // TODO burn/fund account...
    // }

    // renderAccountContent = () => {
    //     const { selectedEnvironment } = this.state;

    //     if (this.form.wallet == null) {
    //         // Static address
    //         return (
    //             <div>
    //                 <div className='superInputDarkInline'>
    //                     <label htmlFor='address'>Address</label>
    //                     <input
    //                         type='text'
    //                         id='address'
    //                         onKeyUp={e => {
    //                             this.onAddressChange(e);
    //                         }}
    //                         onChange={e => {
    //                             this.onAddressChange(e);
    //                         }}
    //                         value={this.form.address}
    //                     />

    //                     <button
    //                         className='btn2'
    //                         disabled={!this.state.accountAddressDirty}
    //                         onClick={this._staticAddressSave}
    //                     >
    //                         Save
    //                     </button>
    //                 </div>
    //                 <p>
    //                     <b>NOTE:</b> This account only has a public address
    //                     which you need to set yourself. This means that the
    //                     account cannot be used for any transactions. The reason
    //                     for this feature is that this account can be passed as
    //                     argument to contract constructors.
    //                 </p>
    //             </div>
    //         );
    //     } else {
    //         // Check for external web3 provider
    //         if (this.form.walletType === 'external') {
    //             if (this.form.isLocked) {
    //                 return (
    //                     <p>
    //                         Metamask is locked. Unlock Metamask to see address
    //                         and balance of this account.
    //                     </p>
    //                 );
    //             } else {
    //                 return (
    //                     <div>
    //                         <h3>Metamask account</h3>
    //                         <p>
    //                             <b>Address:</b> {this.form.address}
    //                         </p>
    //                         <p>
    //                             <b>Balance:</b> {this.form.balance} wei (
    //                             {this.form.balanceFormatted} Ether){' '}
    //                             {this.form.balanceError}
    //                         </p>
    //                     </div>
    //                 );
    //             }
    //         } else {
    //             // Regular wallet
    //             if (this.form.isLocked) {
    //                 return (
    //                     <div>
    //                         <p>
    //                             This wallet is locked. Unlock the wallet to show
    //                             the address and the balance.
    //                         </p>
    //                         <button
    //                             className='btn2'
    //                             onClick={e => {
    //                                 e.preventDefault();
    //                                 this.unlockWallet(this.form.walletName);
    //                             }}
    //                         >
    //                             Unlock
    //                         </button>
    //                     </div>
    //                 );
    //             } else {
    //                 let unlockDifferentAccountButton;
    //                 if (this.form.walletName === 'private' || (this.form.walletName === 'external' && !window.web3)) {
    //                     unlockDifferentAccountButton = (
    //                         <button
    //                             className='btn2'
    //                             onClick={e => {
    //                                 e.preventDefault();
    //                                 this.unlockWallet(this.form.walletName);
    //                             }}
    //                         >
    //                             Unlock a different account
    //                         </button>
    //                     );
    //                 }

    //                 return (
    //                     <div>
    //                         <p>
    //                             <b>Address:</b> {this.form.address}
    //                         </p>
    //                         <p>
    //                             <b>Balance:</b> {this.form.balance} wei (
    //                             {this.form.balanceFormatted} Ether){' '}
    //                             {this.form.balanceError}
    //                         </p>
    //                         {unlockDifferentAccountButton}
    //                     </div>
    //                 );
    //             }
    //         }
    //     }
    // }

    render() {
        const { environments } = this.props;
        const { selectedEnvironment } = this.state;

        // const accountContent = this._renderAccountContent();
        return (
            <div className={style.networkContainer}>
                <div className={style.networkHeader}>
                    <div className={style.titleContainer}>
                        <h3 className={style.title}>
                            Configure the account for
                            each network
                        </h3>
                    </div>
                    <div className={style.subtitle}>
                        Each account must be configured
                        for each of the networks
                        available.
                        <a
                            href='https://help.superblocks.com/'
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            {' '}
                            Click here
                        </a>{' '}
                        to access our Help Center and
                        find more information about
                        this.
                    </div>
                </div>
                <div className={style.networkSelector}>
                    <div className={style.networks}>
                        <ul>
                            {
                                environments.map(env => {
                                        const cls: any = {};
                                        if (selectedEnvironment && env.name === selectedEnvironment.name) {
                                            cls[style.active] = true;
                                        }
                                        return (
                                            <li
                                                key={env.name}
                                                className={classnames(
                                                    [cls]
                                                )}
                                            >
                                                <div
                                                    className={style.networkName}
                                                    onClick={e => { this.onEnvChange(e, env); }}
                                                >
                                                    {env.name}
                                                </div>
                                            </li>
                                        );
                                }
                            )}
                        </ul>
                    </div>
                    <div className={style.networkInfo}>
                        {/* {accountContent} */}
                    </div>
                </div>
            </div>
        );
    }
}
