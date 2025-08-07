import ItemsPage from '../pages/ItemsPage';

describe('Items Tests', () => {
  const itemsPage = new ItemsPage();
  const testItemName = 'Test Item';

  beforeEach(() => {
    itemsPage.visit();
  });

  it('Creating a new item', () => {
    itemsPage.clickCreateNew();
    itemsPage.fillItemName(testItemName);
    itemsPage.saveItem();
    itemsPage.assertItemPresent(testItemName);
  });
});
