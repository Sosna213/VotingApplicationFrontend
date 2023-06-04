import { loginUser } from '../fixtures/userData.json';

describe('Login page', () => {
  beforeEach(() => {
    cy.visit('#/login');
    cy.get('input[id=login]').type(loginUser.username);
    cy.get('input[id=password]').type(loginUser.password);
    cy.contains('Zaloguj').click();
  });
  it('Logged use should can create voting', () => {
    cy.contains('Nowe głosowanie').click();
    cy.contains('Dodaj głosowanie');

    cy.get('input[formControlName=votingName]').type('Test voting');
    cy.get('input[formControlName=question]').type('Example question');
    cy.get('input[formControlName=answer]').type('Example answer');
    cy.get('button[color=accent]').click();
    cy.get('div[ng-reflect-name=1]').find('input[formControlName=answer]').type('Example answer 2');
    cy.get('button[color=accent]').click();
    cy.get('div[ng-reflect-name=2]').find('input[formControlName=answer]').type('Example answer 3');

    cy.get('button').contains('Dodaj').click();

    cy.contains('Test voting');
    cy.contains('Test voting');
  });
});
