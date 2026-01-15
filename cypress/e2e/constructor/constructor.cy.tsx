describe('проверяем доступность приложения', () => {
    it('сервис должен быть доступен по адресу localhost:4000', () => {
        cy.visit('http://localhost:4000'); 
    });
});

describe('настройка перехвата запроса ингредиентов', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients')
  })

  it('ингредиенты должны загружаться из моковых данных', () => {
    cy.visit('/')
    cy.wait('@getIngredients')
    cy.get('[data-cy=ingredient]').should('have.length', 6)
  })
});

describe('добавление ингредиентов в конструктор', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/api/auth/user', { fixture: 'user.json' });
        cy.intercept('GET', '**/api/ingredients', { fixture: 'ingredients.json' });
        cy.visit('/');
    })

    it('булка добавляется в конструктор при нажатии кнопки добавления', () => {
        cy.get('[data-cy="ingredient"]').eq(0).should('contain', 'Краторная булка N-200i');
        cy.get('[data-cy="constructor"]').contains('Выберите булки');
        cy.get('[data-cy="ingredient"]')
            .eq(0)
            .within(() => {
                cy.get('button').contains('Добавить').click();
        });
        cy.get('[data-cy="constructor"]').should('contain', 'Краторная булка N-200i').and('contain', 'Выберите начинку');
    });

    it('ингредиент добавляется в конструктор при нажатии кнопки добавления', () => {
        cy.get('[data-cy="ingredient"]').eq(4).should('contain', 'Соус Spicy-X');
        cy.get('[data-cy="constructor"]').contains('Выберите начинку');
        cy.get('[data-cy="ingredient"]')
            .eq(4)
            .within(() => {
                cy.get('button').contains('Добавить').click();
        });
        cy.get('[data-cy="constructor"]').should('contain', 'Соус Spicy-X').and('contain', 'Выберите булки');
    });
});

describe('проверка модальных окон', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/api/auth/user', { fixture: 'user.json' });
        cy.intercept('GET', '**/api/ingredients', { fixture: 'ingredients.json' });
        cy.visit('/');
        cy.get('[data-cy="ingredient"]').first().within(() => {
            cy.get('a').first().click();
        });
    });

    it('открывается модальное окно при клике на ингредиент', () => {
        cy.get('[data-cy="modal"]').should('be.visible');
        cy.get('[data-cy="modal"]').should('contain', 'Детали ингредиента').and('contain', 'Краторная булка N-200i');
    });

    it('модальное окно закрывается при клике на крестик', () => {
        cy.get('[data-cy="modal"]').should('be.visible');
        cy.get('[data-cy="modal"]').within(() => {
            cy.get('[data-cy="modal-close"]').click();
        })
        cy.get('[data-cy="modal"]').should('not.exist');
    });

    it('модальное окно закрывается при клике на оверлей', () => {
        cy.get('[data-cy="modal"]').should('be.visible');
        cy.get('[data-cy="modal-overlay"]').click({force: true});
        cy.get('[data-cy="modal"]').should('not.exist');
    });
});

describe('проверка оформления заказа', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/api/auth/user', { fixture: 'user.json' });
        cy.intercept('GET', '**/api/ingredients', { fixture: 'ingredients.json' });
        cy.intercept('POST', '**/api/auth/token', { fixture: 'token.json' });
        cy.intercept('POST', '**/api/orders', { fixture: 'order.json' });
        cy.visit('/');

        localStorage.setItem('accessToken', 'fake-access-token');
        document.cookie = 'refreshToken=fake-refresh-token'
    })

    afterEach(() => {
        localStorage.removeItem('accessToken');
        document.cookie = 'refreshToken=';
    })

    it('оформляется заказ после сборки бургера и открывается модальное окно успеха', () => {
        cy.get('[data-cy="ingredient"]')
            .eq(0)
            .within(() => {
                cy.get('button').contains('Добавить').click();
        });
        cy.get('[data-cy="ingredient"]')
            .eq(4)
            .within(() => {
                cy.get('button').contains('Добавить').click();
        });
        cy.get('[data-cy="constructor"]').contains('Выберите булки').should('not.exist');
        cy.get('[data-cy="constructor"]').contains('Выберите начинку').should('not.exist');


        cy.get('[data-cy="constructor"]').within(() => {
            cy.get('button').contains('Оформить заказ').click();
        })

        cy.get('[data-cy="modal"]').should('be.visible');
        cy.get('[data-cy="modal"]').should('contain', '888');
    });

    it('закрывается модальное окно успеха заказа и очищается конструктор после заказа', () => {
        cy.get('[data-cy="ingredient"]')
            .eq(0)
            .within(() => {
                cy.get('button').contains('Добавить').click();
        });
        cy.get('[data-cy="ingredient"]')
            .eq(4)
            .within(() => {
                cy.get('button').contains('Добавить').click();
        });
        cy.get('[data-cy="constructor"]').within(() => {
            cy.get('button').contains('Оформить заказ').click();
        })

        cy.get('[data-cy="modal"]').should('be.visible');
        cy.get('[data-cy="modal"]').within(() => {
            cy.get('[data-cy="modal-close"]').click();
        })
        cy.get('[data-cy="modal"]').should('not.exist');

        cy.get('[data-cy="constructor"]').should('contain', 'Выберите булки');
        cy.get('[data-cy="constructor"]').should('contain', 'Выберите начинку');
    });
});


