import { FoaasUiPage } from './app.po';

describe('foaas-ui App', () => {
  let page: FoaasUiPage;

  beforeEach(() => {
    page = new FoaasUiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
