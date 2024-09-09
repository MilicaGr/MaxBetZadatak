/// <reference types="cypress" />

describe('Sign up Form Validation',()=>{
    beforeEach('visit page',()=>{
        cy.visit('http://localhost:3000/signup')
    })

    it('Sign up: Response code verification',()=>{
        cy.request('GET','http://localhost:3000/signup').then((response)=>{
            expect(response.status).to.eq(200)
        })
    })

    it('Sign up with empty form',()=>{
        cy.get('[data-test="signup-submit"]').click()
        cy.get('#firstName-helper-text').should('be.visible').and('contain','First Name is required')
        cy.url().should('eq','http://localhost:3000/signup');

    })

    it('Sign up with existing username',()=>{
        cy.get('input#firstName').type('Test')
        cy.get('input#lastName').type('Test')
        cy.get('input#username').type('Heath93')
        cy.get('input#password').type('password')
        cy.get('input#confirmPassword').type('password')
        cy.get('button[data-test="signup-submit"]').click()
        cy.url().should('include','/signin')
        cy.get('button[data-test="signin-submit"]').should('be.visible')
    })

    it('Sign up with short password',()=>{
        cy.get('input#firstName').type('Test')
        cy.get('input#lastName').type('Test')
        cy.get('input#username').type('Test')
        cy.get('input#password').type('pas')
        cy.get('input#confirmPassword').type('pas')
        cy.get('p#password-helper-text').should('be.visible').and('contain','Password must contain at least 4 characters')
        cy.get('[data-test="signup-submit"]').should('be.disabled')
     })

     it('Sign up when password and confirm password do not match',()=>{
        cy.get('input#firstName').type('Test')
        cy.get('input#lastName').type('Test')
        cy.get('input#username').type('Test')
        cy.get('input#password').type('password')
        cy.get('input#confirmPassword').type('password123')
        cy.get('p#confirmPassword-helper-text').should('be.visible').and('contain','Password does not match')
        cy.get('[data-test="signup-submit"]').should('be.disabled')
     })

     it('Sign up with valid credentials',()=>{
    cy.get('input#firstName').type('Jane')
        cy.get('input#lastName').type('Doe')
        cy.get('input#username').type('janedoe065')
        cy.get('input#password').type('password')
        cy.get('input#confirmPassword').type('password')
        cy.get('[data-test="signup-submit"]').click()
     })
})