describe('template spec', () => {
  it('Verifica se app está abrindo', () => {
    cy.visit('http://127.0.0.1:7001/')
  })

  it('Insere uma tarefa', () => {
    cy.visit('http://127.0.0.1:7001'); 

    cy.get('.new-todo')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('.todo-list li')
      .should('have.length', 1) 
      .first()
      .should('have.text', 'TP2 de Engenharia de Software'); 
  });

  it('Insere e deleta uma tarefa', () => {
    cy.visit('http://127.0.0.1:7001');

    cy.get('.new-todo')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('.todo-list li .destroy')
      .invoke('show')
      .click();

    cy.get('.todo-list li')
      .should('have.length', 0);
  });

  it('Filtra tarefas completas e ativas', () => {
    cy.visit('http://127.0.0.1:7001'); 

    cy.get('.new-todo')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}');

    cy.get('.todo-list li .toggle')
      .first()
      .click();

    cy.contains('Active').click();
    cy.get('.todo-list li')
      .should('have.length', 1)
      .first()
      .should('have.text', 'Prova de ES');

    cy.contains('Completed').click();
    cy.get('.todo-list li')
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de ES');

    cy.contains('All').click();
    cy.get('.todo-list li')
      .should('have.length', 2);
  });

  /* Novos testes implementados */

  //1° Editar uma tarefa
  it('Editar uma tarefa e salvar', () => {
    cy.visit('http://127.0.0.1:7001'); 

    cy.get('.new-todo')
      .type('TP2 de ES{enter}');

    cy.get('.todo-list li label')
      .dblclick();

    cy.get('.edit')
      .clear()
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('.todo-list li label')
      .should('have.text', 'TP2 de Engenharia de Software');

  });

  //2° Marcar/Desmarcar as tarefas manualmente
  it ('Marca e desmarca as tarefas', () => {
    cy.visit('http://127.0.0.1:7001'); 
    cy.get('.new-todo')
      .type('TP2 de ES{enter}')
      .type('TP2 de Compiladores{enter}');

    //marca
    cy.get('.toggle')
      .first()
      .click();
    cy.get('.toggle')
      .first()
      .should('be.checked');
    cy.get('.toggle')
      .last()
      .click();
    cy.get('.toggle')
      .last()
      .should('be.checked');

    //desmarca
    cy.get('.toggle')
      .first()
      .click();
    cy.get('.toggle')
      .first()
      .should('not.be.checked');
    cy.get('.toggle')
      .last()
      .click();
    cy.get('.toggle')
      .last()
      .should('not.be.checked');

  });

  //3° Apagar todas as tarefas apos concluidas
  it ('Apagar todas apos concluidas', () => {
    cy.visit('http://127.0.0.1:7001'); 
    cy.get('.new-todo')
      .type('TP2 de ES{enter}')
      .type('TP2 de Compiladores{enter}');

    //marcar como concluida
    cy.get('.toggle')
      .first()
      .click();
    cy.get('.toggle')
      .last()
      .click();
    cy.get('.todo-list li')
      .should('have.length', 2);
      
    //clicar em Clear completed
    cy.get('.clear-completed')
      .click();
    cy.get('.todo-list li')
      .should('have.length', 0);
  });


});