// cypress/pages/LoginPage.js
class LoginPage {
    visit() {
      cy.visit('/login');
    }
    fillUsername(name) {
      cy.get('input[name="username"]').type(name);
    }
    fillPassword(pass) {
      cy.get('input[name="password"]').type(pass);
    }
    submit() {
      cy.get('button[type="submit"]').click();
    }
  }
  export default LoginPage;
  