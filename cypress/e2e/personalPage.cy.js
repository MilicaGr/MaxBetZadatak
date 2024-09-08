/// <reference types="cypress" />

describe('Validate Transaction',()=>{
    beforeEach('login',()=>{
        cy.visit('http://localhost:3000/signin')
        cy.get('input#username').type('janedoe065')
        cy.get('input#password').type('password')
        cy.get('[data-test="signin-submit"]').click()
    })

    it('Validate Transaction',()=>{
        cy.get('a[data-test="nav-personal-tab"]').click()
        cy.get('p.MuiTypography-root').eq(0).should('have.text','Jane Doe paid Ted Parisian')  
        })
    })