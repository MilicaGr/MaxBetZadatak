/// <reference types="cypress" />


describe('Create New Transaction',()=>{
    beforeEach('login',()=>{
        cy.visit('http://localhost:3000/signin')
        cy.get('input#username').type('janedoe065')
        cy.get('input#password').type('password')
        cy.get('[data-test="signin-submit"]').click()
    })

    it('Create Transaction with empty fields',()=>{
        cy.get('a[data-test="nav-top-new-transaction"]').click()
        cy.get('#user-list-search-input').click({ force: true }).type('Ted Parisian')
        cy.wait(2000)
        cy.get('ul li').first().click()
        cy.get('[data-test="transaction-create-submit-request"]').should('be.disabled')
        cy.get('[data-test="transaction-create-submit-payment"]').should('be.disabled')
    })

    it('Create Transaction with letters in amount field',()=>{
    cy.get('a[data-test="nav-top-new-transaction"]').click()
    cy.get('#user-list-search-input').click({ force: true }).type('Ted Parisian')
    cy.wait(2000)
    cy.get('ul li').first().click()
    cy.get('#amount').type('test')
    cy.get('#amount').should('have.value','')

    })

    it('Create Transaction with special characters in amount field', ()=>{
        cy.get('a[data-test="nav-top-new-transaction"]').click()
        cy.get('#user-list-search-input').click({ force: true }).type('Ted Parisian')
        cy.wait(2000)
        cy.get('ul li').first().click()
        cy.get('#amount').type('-.')
        cy.get('#transaction-create-amount-input-helper-text').should('be.visible').and('have.text','amount must be a `number` type, but the final value was: `NaN` (cast from the value `"-."`).')
    })

    it('Create Transaction with valid data',()=>{
        cy.get('a[data-test="nav-top-new-transaction"]').click()
        cy.get('#user-list-search-input').click({ force: true }).type('Ted Parisian')
        cy.wait(2000)
        cy.get('ul li').first().click()
        cy.get('#amount').type('100')
        cy.get('#transaction-create-description-input').type('Testing')
        cy.get('[data-test="transaction-create-submit-payment"]').click()
        cy.contains('h2', 'Paid $100.00 for Testing').should('be.visible')
        cy.get('[data-test="alert-bar-success"]').should('be.visible').and('have.text','Transaction Submitted!')
    })
})