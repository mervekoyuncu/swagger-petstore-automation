class ItemsPage {
    visit() {
      cy.visit('/items');
    }
  
    clickCreateNew() {
      cy.get('button#create-new').click();
    }
  
    fillItemName(name) {
      cy.get('input[name="itemName"]').clear().type(name);
    }
  
    saveItem() {
      cy.get('button#save-item').click();
    }
  
    assertItemPresent(name) {
      cy.contains(name).should('be.visible');
    }
  }
  
  export default ItemsPage;
  