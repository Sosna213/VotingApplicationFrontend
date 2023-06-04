import { loginUser } from '../fixtures/userData.json';

describe('Login page', () => {
  beforeEach(() => {
    cy.visit('');
  });
  it('Should login user and logout him', () => {
    cy.contains('Logowanie').click();

    cy.contains('Zaloguj').click();
    cy.contains('Nazwa użytkownika jest wymagana do zalogowania');
    cy.contains('Hasło jest wymagane do zalogowania');
    cy.contains('Nieprawidłowe dane');

    cy.get('input[id=login]').type(loginUser.username);
    cy.get('input[id=password]').type(loginUser.password);
    cy.contains('Zaloguj').click();

    cy.contains('Wyloguj');
    cy.contains('Utwórz głosowanie');
    cy.url().should('include', '/#/');
    cy.contains('Wyloguj').click();
    cy.contains('Logowanie');
  });
});
