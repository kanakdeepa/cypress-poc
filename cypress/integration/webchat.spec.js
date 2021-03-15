describe('Webchat interaction', () => {
  it('Open webchat window', () => {
    cy.visit('https://kkh-uat.app.keyreply.com/webchat/');
  });

  it('Get webchat window ready', () => {
    cy.get('#kr-launcher').click();
    cy.contains('I Agree').click();
  });

  it('Accept personal information', () => {
    cy.fixture('personal-info.json').then((data) => {
      if (data && data.length > 0) {
        data.forEach((record) => {
          cy.get('#keyreply-panel-body').contains(record.question);
          cy.get('textarea.el-textarea__inner').type(record.input);
        });
      }
    });
  });
});
