import { MedPatientsPage } from './app.po';

describe('med-patients App', function() {
  let page: MedPatientsPage;

  beforeEach(() => {
    page = new MedPatientsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
