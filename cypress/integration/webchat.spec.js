describe('Webchat interaction', () => {
  it('Open webchat url', () => {
    cy.visit('https://kkh-uat.app.keyreply.com/webchat/');
    cy.get('#kr-launcher').click();
  });
});
