const panelBodyId = '#keyreply-panel-body';
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
          cy.get(panelBodyId).contains(record.question);
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
      cy.get(panelBodyId).contains(
        'Thank you for accepting the Privacy Policy. Please be patient with me as this is a Beta enhancement. I will be able to handle more conditions and questions in the future.'
      );
      cy.get(panelBodyId).contains(
        'If your child has overseas travel history (in/out of Singapore) in the last 14 days or if your child has a contact with a confirmed patient who has COVID-19'
      );
      cy.get(panelBodyId).contains(
        'If you have been issued a stay home notice and have developed symptoms of fever, cough, running nose,'
      );
      cy.get(panelBodyId).contains(
        'If your child has been issued a home quarantine order and has developed any sign of illness'
      );
      cy.get(panelBodyId).contains(
        'To start, please select one of the below conditions, or describe your conditions such as "My child has fever'
      );
    }
  );
});

describe(
  'Webchat - Emergency AtoZ',
  {
    defaultCommandTimeout: 10000,
  },
  () => {
    it('Emergency Keywords', () => {
      cy.fixture('symptoms.json').then((data) => {
        const { keywords, answer } = data['EMERGENCY_KEYWORDS'];
        keywords.map((keyword) => {
          cy.get('textarea.el-textarea__inner').type(`${keyword}{enter}`);
          cy.wait(1000);
          cy.get(panelBodyId).contains(answer);
        });
      });
    });

    //A to Z list – Abdominal Pain - intended usage (Diarrhea flow)
    it('Abdominal Pain - intended usage (Diarrhea flow)', () => {
      cy.fixture('symptoms.json').then((data) => {
        const { keywords, answer } = data['ABDOMEN_ISSUES'];
        keywords.map((keyword) => {
          cy.get('textarea.el-textarea__inner').type(`${keyword}{enter}`);
          cy.wait(500);
          cy.get(panelBodyId).contains(answer);
          cy.wait(500);
          cy.get(`#keyreply-panel-body > div`).eq(-2).contains('Yes').click();
          cy.get(panelBodyId).contains('Is your child vomiting?');
          cy.wait(500);
          cy.get(`#keyreply-panel-body > div`).eq(-2).contains('No').click();
          cy.wait(500);
          cy.get(panelBodyId).contains('Is your child having diarrhea?');
          cy.wait(500);
          cy.get(`#keyreply-panel-body > div`)
            .eq(-2)
            .contains('Yes')
            .last()
            .click();
          cy.wait(1000);
        });
      });
      //The patient will be directed to the diarrhea flow.
    });

    //A to Z list – Abdominal Pain - intended usage (Vomit flow)
    it('Abdominal Pain - intended usage (vomit flow)', () => {
      cy.fixture('symptoms.json').then((data) => {
        const { keywords, answer } = data['ABDOMEN_ISSUES'];
        keywords.map((keyword) => {
          cy.get('textarea.el-textarea__inner').type(`${keyword}{enter}`);
          cy.wait(500);
          cy.get(panelBodyId).contains(answer);
          cy.wait(500);
          cy.get(`#keyreply-panel-body > div`).eq(-2).contains('Yes').click();
          cy.get(panelBodyId).contains('Is your child vomiting?');
          cy.wait(500);
          cy.get(`#keyreply-panel-body > div`).eq(-2).contains('Yes').click();
          cy.wait(500);
          cy.get(panelBodyId).contains(
            `I see. I will need to ask you a few questions to provide appropriate advice regarding your child's condition. I will try to give you the best advice possible after you've answered these questions, so please bear with me.`
          );
          cy.wait(500);
          cy.get(panelBodyId).contains(
            `How long has your child been vomiting?`
          );
          cy.wait(1000);
        });
      });
      //The patient will be directed to the vomit flow.
    });

    //A to Z list – Allergic Rhinitis - intended usage
    it('A to Z list – Allergic Rhinitis - intended usage', () => {
      cy.fixture('symptoms.json').then((data) => {
        const { keywords, answer } = data['ALLERGIC_RHINITIS'];
        keywords.map((keyword) => {
          cy.get('textarea.el-textarea__inner').type(`${keyword}{enter}`);
          cy.wait(500);
          cy.get(panelBodyId).contains(answer);
          cy.wait(500);
          cy.get(`#keyreply-panel-body > div`).eq(-2).contains('Yes').click();
          cy.get(panelBodyId).contains(
            'Here is an information leaflet for you to read on Allergic rhinitis. Should this leaflet not answer your question, or if you are still worried, please seek medical advice.'
          );
          cy.get('a').eq(-1).click();
          cy.wait(1000);
        });
      });
    });

    //A to Z list – Allergic Rhinitis - unintended usage (Live Chat)
    it('A to Z list – Allergic Rhinitis - unintended usage (Live Chat)', () => {
      cy.fixture('symptoms.json').then((data) => {
        const { keywords, answer } = data['ALLERGIC_RHINITIS'];
        keywords.map((keyword) => {
          cy.get('textarea.el-textarea__inner').type(`${keyword}{enter}`);
          cy.wait(500);
          cy.get(panelBodyId).contains(answer);
          cy.wait(500);
          cy.get(`#keyreply-panel-body > div`).eq(-2).contains('No').click();
          cy.get(panelBodyId).contains(
            `Please rephrase the way you explain about your child's illness or main condition so that I can understand better.`
          );
          cy.wait(1000);
        });
      });
      //The patient will be directed to Live Chat.
    });
  }
);
