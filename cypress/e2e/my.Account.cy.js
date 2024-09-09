/// <reference types="cypress" />


describe('My Account modifications',()=>{
    beforeEach('login',()=>{
        cy.visit('http://localhost:3000/signin')
        cy.get('input#username').type('janedoe065')
        cy.get('input#password').type('password')
        cy.get('[data-test="signin-submit"]').click()
    })

    it('Validate modifications on My Account',()=>{
        cy.get('[data-test="sidenav-user-settings"]').click()
        cy.get('#user-settings-email-input').clear().type('jane@doe.com')
        cy.get('#user-settings-phoneNumber-input').clear().type('123456789')
        cy.get('button[data-test="user-settings-submit"]').click()
        cy.reload()
        cy.get('#user-settings-email-input').should('have.value','jane@doe.com')
        cy.get('#user-settings-phoneNumber-input').should('have.value','123456789')


    })
})