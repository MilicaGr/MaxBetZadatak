/// <reference types="cypress" />

describe('Sign In Form Validation',()=>{
    beforeEach('visit page',()=>{
        cy.visit('http://localhost:3000/signin')
    })


    it('Sign In: Response code verification',()=>{
        cy.request('GET','http://localhost:3000/signin').then((response)=>{
            expect(response.status).to.eq(200)
        })
    })

    it('Sign in with empty form',()=>{
        cy.get('[data-test="signin-submit"]').click()
        cy.get('p#username-helper-text').should('be.visible',).and('contain','Username is required')
        cy.get('[data-test="signin-submit"]').should('be.disabled')
        cy.url().should('eq','http://localhost:3000/signin')
    })

    it('Sign in with invalid username',()=>{
        cy.get('input#username').type('significance123')
        cy.get('input#password').type('password')
        cy.get('[data-test="signin-submit"]').click()
        cy.get('div.MuiAlert-message').should('be.visible').and('contain','Username or password is invalid')
        cy.url().should('eq','http://localhost:3000/signin')
    })

    it('Sign In with invalid password',()=> {
        cy.get('input#username').type('janedoe065')
        cy.get('input#password').type('password065')
        cy.get('[data-test="signin-submit"]').click()
        cy.get('div.MuiAlert-message').should('be.visible').and('contain','Username or password is invalid')
        cy.url().should('eq','http://localhost:3000/signin')
    })

    it('Sign In with short password',()=>{
        cy.get('input#username').type('janedoe065')
        cy.get('input#password').type('pas')
        cy.get('[data-test="signin-submit"]').click({force: true})
        cy.get('p#password-helper-text').should('be.visible').and('contain','Password must contain at least 4 characters')
    })

    it('Sign In with valid credentials',()=>{
        cy.get('input#username').type('janedoe065')
        cy.get('input#password').type('password')
        cy.get('[data-test="signin-submit"]').click()
    })

})