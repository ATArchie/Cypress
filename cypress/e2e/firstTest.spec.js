/// <reference types="cypress" />

describe("Our first suite", () => {
  it("first test", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    //by Tag name
    cy.get("input");

    //by ID (hasztag)
    cy.get("#inputEmail1");

    //by Class name (kropka)
    cy.get(".input-full-width");

    //by Attribute name (kwadratowe nawiasy)
    cy.get("[placeholder]");

    //by Attribute name and value  (symbol = i tekst w "")
    cy.get('[placeholder="Email"]');

    //by Class value (trxzeba podać pełną zawartość Class)
    cy.get('[class="input-full-width size-medium shape-rectangle"]');

    //by tag name and Atttribute with value
    cy.get('input[placeholder="Email"]');

    //by two different attributes

    cy.get('input[placeholder="Email"][type="email"]');

    //by tag name, attribute with value, ID and class name
    cy.get('input[placeholder="Email"]#inputEmail1.input-full-width');

    //the most recommended way by Cypress
    cy.get('[data-cy="imputEmail1"]');
  });

  it("second test", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    cy.get('[data-cy="signInButton"]');

    cy.contains("Sign in");

    cy.contains('[status="warning"]', "Sign in");

    cy.get("#inputEmail3")
      .parents("form")
      //find znajduje tylko child elements, najpierw trzeba podać parenta
      .find("button")
      .should("contain", "Sign in")
      .parents("form")
      .find("nb-checkbox")
      .click();

    cy.contains("nb-card", "Horizontal form").find('[type="email"]');
  });

  it("then and wrap methods", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    // cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email')
    // cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password')
    // cy.contains('nb-card', 'Basic form').find('[for="exampleInputEmail1"]').should('contain', 'Email address')
    // cy.contains('nb-card', 'Basic form').find('[for="exampleInputPassword1"]').should('contain', 'Password')

    //.then() funkcja w jquery format
    cy.contains("nb-card", "Using the Grid").then((firstForm) => {
      const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text();
      const passwordLabelFirst = firstForm
        .find('[for="inputPassword2"]')
        .text();
      expect(emailLabelFirst).to.equal("Email");
      expect(passwordLabelFirst).to.equal("Password");

      cy.contains("nb-card", "Basic form").then((secondForm) => {
        const passwordSecondText = secondForm
          .find('[for="exampleInputPassword1"]')
          .text();
        expect(passwordLabelFirst).to.equal(passwordSecondText);

        cy.wrap(secondForm)
          .find('[for="exampleInputPassword1"]')
          .should("contain", "Password");
      });
    });
  });

  it("invoke command", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    cy.get('[for="exampleInputEmail1"]')
      .invoke("text")
      .then((text) => {
        expect(text).to.equal("Email address");
      });

    cy.contains("nb-card", "Basic form")
      .find("nb-checkbox")
      .click()
      .find(".custom-checkbox")
      .invoke("attr", "class")
      // .should('contain', 'checked')
      .then((classValue) => {
        expect(classValue).to.contain("checked");
      });
  });

  it("assert property", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Datepicker").click();

    cy.contains("nb-card", "Common Datepicker")
      .find("input")
      .then((input) => {
        cy.wrap(input).click();
        cy.get("nb-calendar-day-picker").contains("16").click();
        cy.wrap(input)
          .invoke("prop", "value")
          .should("contain", "Aug 16, 2023");
        // 'prop' - w konsoli po prawej Properties i tam znaleźć 'value', które chcemy
      });
  });

  it("radio button", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layout").click();

    cy.contains("nb-card", "Using the Grid")
      .find('[type="radio"]')
      .then((radioButtons) => {
        cy.wrap(radioButtons)
          .first()
          .check({ force: true })
          .should("be.checked");

        cy.wrap(radioButtons).eq(1).check({ force: true });

        cy.wrap(radioButtons).first().should("be.not.checked");

        cy.wrap(radioButtons).eq(2).should("be.disabled");
      });
  });

  it("check boxes", () => {
    cy.visit("/");
    cy.contains("Modal & Overlays").click();
    cy.contains("Toastr").click();
    // .check() metoda dla  klikania w checkboxy
    cy.get("[type=checkbox]").check({ force: true });
    cy.get("[type=checkbox]").eq(0).click({ force: true });
  });

  it("Datepicker", () => {
    function selectDayFromCurrent(day) {
      let date = new Date();
      date.setDate(date.getDate() + day);
      let futureDay = date.getDate();
      let futureMonth = date.toLocaleString("en-US", { month: "short" });
      let dateAssert =
        futureMonth + " " + futureDay + ", " + date.getFullYear();
      cy.get("nb-calendar-navigation")
        .invoke("attr", "ng-reflect-date")
        .then((dateAttribute) => {
          if (!dateAttribute.includes(futureMonth)) {
            cy.get('[data-name="chevron-right"]').click();
            selectDayFromCurrent(day);
          } else {
            cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]')
              .contains(futureDay)
              .click();
          }
        });
      return dateAssert;
    }

    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Datepicker").click();

    cy.contains("nb-card", "Common Datepicker")
      .find("input")
      .then((input) => {
        cy.wrap(input).click();
        let dateAssert = selectDayFromCurrent(50);
        cy.wrap(input).invoke("prop", "value").should("contain", dateAssert);
      });
  });

  it.only('Web tables', () => {
      cy.visit("/");
      cy.contains("Tables & Data").click();
      cy.contains("Smart Table").click();

      cy.get('tbody').contains('tr', 'Larry').then( tableRow => {
        cy.wrap(tableRow).find('.nb-edit').click()
        cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('25')
        cy.wrap(tableRow).find('.nb-checkmark').click()
        cy.wrap(tableRow).find('td').eq(6).should('contain', '25')
      })

      //1
      cy.get('thead').find('.nb-plus').click()
      cy.get('thead').find('tr').eq(2).then( tableRow => {
        cy.wrap(tableRow).find('[placeholder="First Name"]').type('A')
        cy.wrap(tableRow).find('[placeholder="Last Name"]').type('T')
        cy.wrap(tableRow).find('.nb-checkmark').click()

      })
      
      //2
      cy.get('tbody tr').first().find('td').then( tableColumns => {
        cy.wrap(tableColumns).eq(2).should('contain', 'A')
        cy.wrap(tableColumns).eq(3).should('contain', 'T')

      })

      //3
      const age = [20, 30, 40, 200]
      cy.wrap(age).each(age => {
        cy.get('thead [placeholder="Age"]').clear().type(age)
        cy.wait(500)
        cy.get('tbody tr').each( tableRow => {
          if(age == 200){
            cy.wrap(tableRow).should('contain', "No data found")
          }else{
            cy.wrap(tableRow).find('td').eq(6).should('contain', age)
          }
        })
      })

    })
});