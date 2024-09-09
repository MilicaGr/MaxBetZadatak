/// <reference types="cypress" />


describe('Create Bank Account Validation',()=>{
    beforeEach('login',()=>{
        cy.visit('http://localhost:3000/signin')
        cy.get('input#username').type('janedoe065')
        cy.get('input#password').type('password')
        cy.get('[data-test="signin-submit"]').click()
    })

    it('Create Bank Account with empty fields',()=>{
        cy.get('[data-test="sidenav-bankaccounts"]').click()
        cy.get('a[data-test="bankaccount-new"]').click({ force: true })
        cy.get('button[data-test="bankaccount-submit"]').click()
        cy.get('#bankaccount-bankName-input').should('be.focused')
        cy.url().should('eq','http://localhost:3000/bankaccounts/new')
    })

    it('Create a Bank Account with a bank name less than 5 characters',()=>{
        cy.get('[data-test="sidenav-bankaccounts"]').click()
        cy.get('a[data-test="bankaccount-new"]').click({ force: true })
        cy.get('#bankaccount-bankName-input').type('Test')
        cy.get('#bankaccount-routingNumber-input').type('123456789')
        cy.get('#bankaccount-accountNumber-input').type('123456789')
        cy.get('button[data-test="bankaccount-submit"]').should('be.disabled')
        cy.get('#bankaccount-bankName-input-helper-text').should('be.visible').and('contain','Must contain at least 5 characters')
        cy.url().should('eq','http://localhost:3000/bankaccounts/new')
    })

    it('Create a Bank Account with less than 9 characters in routing number',()=>{
        cy.get('[data-test="sidenav-bankaccounts"]').click()
        cy.get('a[data-test="bankaccount-new"]').click({ force: true })
        cy.get('#bankaccount-bankName-input').type('Test Bank Name')
        cy.get('#bankaccount-routingNumber-input').type('12345678')
        cy.get('#bankaccount-accountNumber-input').type('123456789')
        cy.get('button[data-test="bankaccount-submit"]').should('be.disabled')
        cy.get('#bankaccount-routingNumber-input-helper-text').should('be.visible').and('contain','Must contain a valid routing number')
        cy.url().should('eq','http://localhost:3000/bankaccounts/new')
    })

    it('Create a Bank Account with more than 9 characters in routing number',()=>{
        cy.get('[data-test="sidenav-bankaccounts"]').click()
        cy.get('a[data-test="bankaccount-new"]').click({ force: true })
        cy.get('#bankaccount-bankName-input').type('Test Bank Name')
        cy.get('#bankaccount-routingNumber-input').type('1234567891')
        cy.get('#bankaccount-accountNumber-input').type('123456789')
        cy.get('button[data-test="bankaccount-submit"]').should('be.disabled')
        cy.get('#bankaccount-routingNumber-input-helper-text').should('be.visible').and('contain','Must contain a valid routing number')
        cy.url().should('eq','http://localhost:3000/bankaccounts/new')
    })

    it('Create a Bank Account with less then 9 characters in account number',()=>{
        cy.get('[data-test="sidenav-bankaccounts"]').click()
        cy.get('a[data-test="bankaccount-new"]').click({ force: true })
        cy.get('#bankaccount-bankName-input').type('Test Bank Name')
        cy.get('#bankaccount-routingNumber-input').type('123456789')
        cy.get('#bankaccount-accountNumber-input').type('12345678')
        cy.get('button[data-test="bankaccount-submit"]').should('be.disabled')
        cy.get('#bankaccount-accountNumber-input-helper-text').should('be.visible').and('contain','Must contain at least 9 digits')
        cy.url().should('eq','http://localhost:3000/bankaccounts/new')
    })

    it('Create a Bank Account with more than 12 characters in account number',()=>{
        cy.get('[data-test="sidenav-bankaccounts"]').click()
        cy.get('a[data-test="bankaccount-new"]').click({ force: true })
        cy.get('#bankaccount-bankName-input').type('Test Bank Name')
        cy.get('#bankaccount-routingNumber-input').type('123456789')
        cy.get('#bankaccount-accountNumber-input').type('1234567891234')
        cy.get('button[data-test="bankaccount-submit"]').should('be.disabled')
        cy.get('#bankaccount-accountNumber-input-helper-text').should('be.visible').and('contain','Must contain no more than 12 digits')
        cy.url().should('eq','http://localhost:3000/bankaccounts/new')
    })

    it('Create a Bank Account with valid data',()=>{
        cy.get('[data-test="sidenav-bankaccounts"]').click()
        cy.get('a[data-test="bankaccount-new"]').click({ force: true })
        cy.get('#bankaccount-bankName-input').type('Test Bank Name')
        cy.get('#bankaccount-routingNumber-input').type('123456789')
        cy.get('#bankaccount-accountNumber-input').type('123456789')
        cy.get('button[data-test="bankaccount-submit"]').click()
        cy.get('.MuiGrid-grid-xs-12 > .MuiPaper-root > .css-9cyib4-MuiGrid-root > :nth-child(1) > .MuiTypography-root').should('be.visible').and('contain','Bank Accounts')
        cy.get('[data-test="bankaccount-new"]').should('be.visible').should('contain.text', 'Create');
        cy.get('footer').scrollIntoView()
        cy.get('ul li').last().should('be.visible').and('have.text', 'Test Bank Name Delete')
        cy.url().should('eq','http://localhost:3000/bankaccounts')
        cy.get('[data-test="bankaccount-delete"]').click();
    })
})