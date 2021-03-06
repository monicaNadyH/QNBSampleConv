/**
 * Copyright 2017 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License'); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

'use strict';

const bankingServices = {
  _person: {
    fname: 'Monica',
    lname: 'Morcos',
    address: {
      line1: 'Something important',
      line2: 'another sth important',
      city: 'Dubai',
      state: 'MH',
      zip: 400001,
      country: 'UAE'
    },
    customer_id: 7829706,
    tone_anger_threshold: 0.7,
    tone_anger_score : 'happy'
  },

  getPerson: function(customerId, callback) {
    callback(null, this._person);
  },

  _accounts: [
    {
      balance: 12800,
      number: 'xxx8990',
      type: 'savings'
    },
    {
      balance: 7600,
      number: 'xxx0744',
      type: 'current'
    },
    {
      balance: 550,
      number: 'xxx7685',
      type: 'CC',
      available_credit: 4450,
      payment_due_date: '25 March, 2016',
      last_statement_balance: 550
    },
    {
      balance: 50000,
      number: 'xxx7685',
      type: 'FD',
      maturity_date: '25 Nov, 2017'
    }
  ],

  getAccountInfo: function(customerId, accountType, callback) {
    // console.log('getAccountInfo :: start');
    let accounts = [];

    switch (accountType) {
      case 'savings':
        accounts.push(this._accounts[0]);
        break;
      case 'current':
        accounts.push(this._accounts[1]);
        break;
      case 'CC':
        accounts.push(this._accounts[2]);
        break;
      case 'FD':
        accounts.push(this._accounts[3]);
        break;
      default:
        accounts = this._accounts.slice();
    }

    // console.log('Returning account info ',
    // JSON.stringify(accounts,null,2));

    callback(null, accounts);
  },
  _beneficiary: [
    {
      name: 'Marina',
      number: 'xxx0744',
      type: 'savings',
      bank: 'ING'
    },
    {
      name: 'Martina',
      number: 'xxx0744',
      type: 'savings',
      bank: 'Finance Bank'
    },
    {
      name: 'Kiro',
      number: 'xxx7685',
      type: 'savings',
      bank: 'Citi'
    }
  ],
  getBeneficiaryInfo: function(customerId, callback) {
    // console.log('getAccountInfo :: start');
    let beneficiaries = [];
    beneficiaries = this._beneficiary.slice();
    callback(null, beneficiaries);
  },
  getTransactions: function(customerId, category, callback) {
    const response = {
      total: '',
      category: 'all',
      transactions: []
    };

    const len = this._transactions ? this._transactions.length : 0;
    let total = 0;

    let categorySpecifiedBool = false;
    if (category && category !== '' && category !== 'all') {
      categorySpecifiedBool = true;
      response.category = category;
    }

    for (let i = 0; i < len; i++) {
      const transaction = this._transactions[i];
      if (categorySpecifiedBool && transaction.category === category) {
        response.transactions.push(transaction);
        total += transaction.amount;
      } else if (!categorySpecifiedBool) {
        total += transaction.amount;
      }
    }

    response.total = total;
    if (!categorySpecifiedBool) {
      response.transactions = this._transactions.slice();
    }

    callback(null, response);
  },

  _transactions: [
    {
      amount: 700.00,
      account_number: 'xxx7685',
      category: 'dining',
      description: 'Sweekar Restaurant',
      type: 'debit',
      date: '08-29-2016'
    },

    {
      amount: 500.00,
      account_number: 'xxx7685',
      category: 'dining',
      description: 'McDonalds',
      type: 'debit',
      date: '08-27-2016'
    },
    {
      amount: 2000.90,
      account_number: 'xxx7685',
      category: 'grocery',
      description: 'DMart',
      type: 'debit',
      date: '08-26-2016'
    },
    {
      amount: 1500,
      account_number: 'xxx7685',
      category: 'grocery',
      description: 'Hyper City',
      type: 'debit',
      date: '08-24-2016'
    },
    {
      amount: 5000.00,
      account_number: 'xxx7685',
      category: 'travel',
      description: 'Air India',
      type: 'debit',
      date: '08-24-2016'
    },
    {
      amount: 1000.00,
      account_number: 'xxx7685',
      category: 'fuel',
      description: 'Indian Oil',
      type: 'debit',
      date: '08-20-2016'
    },
    {
      amount: 800.00,
      account_number: 'xxx7685',
      category: 'utility',
      description: 'Reliance Energy',
      type: 'debit',
      date: '09-16-2016'
    },
    {
      amount: 700.00,
      account_number: 'xxx7685',
      category: 'utility',
      description: 'BSNL',
      type: 'debit',
      date: '08-16-2016'
    },
    {
      amount: 500.00,
      account_number: 'xxx7685',
      category: 'utility',
      description: 'Mahanagar Gas Ltd',
      type: 'debit',
      date: '08-16-2016'
    },
    {
      amount: 1000.00,
      account_number: 'xxx7685',
      category: 'utility',
      description: 'Mahanagar Gas Ltd',
      type: 'debit',
      date: '09-16-2016'
    },
    {
      amount: 6000.00,
      account_number: 'xxx7685',
      category: 'investment',
      description: 'Open Finance Mutual Fund',
      type: 'debit',
      date: '09-25-2016'
    },
    {
      amount: 10000.00,
      account_number: 'xxx7685',
      category: 'education',
      description: 'Annual Fee',
      type: 'debit',
      date: '08-15-2016'
    }
  ],

  _branchMaster: [
    {
      location: 'AlAhmadi',
      address: 'Al Ahmadi, Kuwait',
      phone: '+97148674532',
      hours: '10AM–4PM'
    },

    {
      location: 'mangaf',
      address: 'mangaf, Kuwait',
      phone: '+97148674532',
      hours: '10AM–4PM'
    },
    {
      location: 'al Jahra',
      address: 'Al Jahra, Kuwait',
      phone: '+97148674532',
      hours: '10AM–4PM'
    },
    {
      location: 'mahboula',
      address: 'Mahboula, Kuwait',
      phone: '+97148674532',
      hours: '10AM–4PM'
    },
    {
      location: 'al Ahmadi',
      address: 'Al Ahmadi, Kuwait',
      phone: '+97148674532',
      hours: '10AM–4PM'
    },
    {
      location: 'al Farwaniyah',
      address: 'Al Farwaniyah, Kuwait',
      phone: '+97148674532',
      hours: '10AM–4PM'
    },


    // {
    //   location: 'دبي',
    //   address: 'دبي, دبي, Dubai 10022, United Arab Emirates',
    //   phone: '+97148674532',
    //   hours: '10AM–4PM'
    // },
    //
    // {
    //   location: 'مصر',
    //   address: '460 Park Ave, مصر, مصر 10022, egypt',
    //   phone: '+2017469573',
    //   hours: '10AM–4PM'
    // },
    // {
    //   location: 'egypt',
    //   address: '460 Park Ave, Egypt, Egypt 10022, egypt',
    //   phone: '+2017469573',
    //   hours: '10AM–4PM'
    // },

    {
      location: 'kuwait',
      address: '460 kuwait, kuwait, kuwait 10022, kuwait',
      phone: '+1846947393',
      hours: '10AM–4PM'
    },

    {
      location: 'الكويت',
      address: '460 الكويت, الكويت, الكويت 10022, الكويت',
      phone: '+1846947393',
      hours: '10AM–4PM'
    },
    {
      location: 'قطر',
      address: 'قطر,450',
      phone: '+1846947393',
      hours: '10AM–4PM'
    },
    {
      location: 'qatar',
      address: 'Qatar, Qatar, Qatar 400023',
      phone: '+9857654893',
      hours: '10AM–5PM'     
    }

  ],
  getBranchInfo: function(location, callback) {
    for (let i = 0; i < this._branchMaster.length; i++) {
      if (this._branchMaster[i].location === location) {
        callback(null, this._branchMaster[i]);
        return;
      }
    }
    callback(null, null);
  }
};

module.exports = bankingServices;
