///<reference types="Cypress" />

let faker = require('faker');
let localforage = require('localforage');

describe('Frogbudget - Repeats', () => {
	beforeEach(() => {
		cy.visit('/');
		indexedDB.deleteDatabase('entry');
		indexedDB.deleteDatabase('repeat');
	})
	it('create default weekly repeat', () => {
		cy.get('.fab').click();
		cy.get('.switch__toggle').click();
		cy.get('#input_category_repeat').type(faker.commerce.productName());
		let price = Number(faker.commerce.price()) * (Math.random() > 0.5 ? -1:1);
		cy.get('#input_value_repeat').type(price);
		cy.get('#input_begin').type('2019-02-01');
		cy.get('#input_end').type('2019-02-28');
		cy.get('select').select(['Montag']);
	
		cy.contains('Hinzufügen').click();
		cy.contains(String(4*price));
	})
})

describe('Frogbudget - Entries', () => {
	beforeEach(() => {
		cy.visit('/');
		indexedDB.deleteDatabase('entry');
		indexedDB.deleteDatabase('repeat');
	})
	it('create defaultentry', () => {
		cy.get('.fab').click();
		cy.get('#input_submit').click();
		cy.contains('default');
		cy.contains('0€');
	});

	it('create test entry', () => {
		cy.get('.fab').click();
		cy.get('#input_category_entry').type('bread');
		cy.get('#input_value_entry').type('-1.99');
		cy.get('#input_submit').click()
		cy.contains('bread');
		cy.contains('-1.99€');
	});

	it('create 30 test entries', () => {
		let totalprice = 0;
		for(let i = 0; i < 30; ++i) {
			cy.get('.fab').click();
			cy.get('#input_category_entry').type(faker.commerce.productName());
			let price = Number(faker.commerce.price()) * (Math.random() > 0.5 ? -1:1);
			totalprice += price;
			cy.get('#input_value_entry').type(price);
			let rand = ((Math.random()*27)+1).toFixed(0);
			cy.get('#input_date').type(`2019-02-${rand.length < 2 ? '0' + rand : rand}`)
			cy.contains('Hinzufügen').click()
			cy.get('.right').contains(`${totalprice.toFixed(2)} €`);
		}
	});

});
