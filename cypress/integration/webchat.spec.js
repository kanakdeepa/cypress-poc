describe('Webchat - Privacy Policy', () => {
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

  it(
    'Show accepted privacy policy',
    {
      defaultCommandTimeout: 10000,
    },
    () => {
      cy.contains(
        'Thank you for accepting the Privacy Policy. Please be patient with me as this is a Beta enhancement. I will be able to handle more conditions and questions in the future.'
      );
      cy.contains(
        'If your child has overseas travel history (in/out of Singapore) in the last 14 days or if your child has a contact with a confirmed patient who has COVID-19'
      );
      cy.contains(
        'If you have been issued a stay home notice and have developed symptoms of fever, cough, running nose,'
      );
      cy.contains(
        'If your child has been issued a home quarantine order and has developed any sign of illness'
      );
      cy.contains(
        'To start, please select one of the below conditions, or describe your conditions such as "My child has fever'
      );
    }
  );
});

describe(
  'Webchat - Emergecy AtoZ',
  {
    defaultCommandTimeout: 10000,
  },
  () => {
    it('Emergency Test - Seizure', () => {
      cy.get('textarea.el-textarea__inner').type('My child has seizure{enter}');
      cy.get('#keyreply-panel-body').contains(
        'I have detected an emergency condition. Is your child suffering from seizure, drowsiness (altered subconsciousness, confused state, abnormal behaviour and NOT tiredness) or is unresponsive?'
      );
    });
  }
);
