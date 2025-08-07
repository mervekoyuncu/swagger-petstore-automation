// cypress/e2e/login.spec.js
import LoginPage from '../pages/LoginPage';

describe('Login Tests', () => {
  const loginPage = new LoginPage();

  it('valid login', () => {
    loginPage.visit();
    loginPage.fillUsername('validUser');
    loginPage.fillPassword('validPass123');
    loginPage.submit();
    cy.contains('Welcome').should('be.visible');
  });
});
