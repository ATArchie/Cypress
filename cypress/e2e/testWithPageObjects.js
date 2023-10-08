import { onDAtePickerPage } from "../support/page_objects/datePickerPage"
import { onFormLayoutsPage } from "../support/page_objects/formLayoutsPage"
import { navigateTo } from "../support/page_objects/navigationPage"
import { onSmartTablePage } from "../support/page_objects/smartTable"

describe('Tests with Page Objects', () => {

    beforeEach('open application', () => {
        cy.visit('/')
    })

    it('verify navigations across pages', () => {
        navigateTo.formLayoutsPage()
        navigateTo.datepickerPage()
        navigateTo.toasterPage()
        navigateTo.smartTablePage()
        navigateTo.tooltipPage()    
    })

    it.only('should submit Inline and Basic form and select tomorrow date in the calendar', () => {
        navigateTo.formLayoutsPage()
        onFormLayoutsPage.submitInlineFormWithNameAndEmail('ZAZZA', 'test@test.com')
        onFormLayoutsPage.submitBasicFormWithEmailAndPassword('test@test.com', 'xzcxzczc')
        navigateTo.datepickerPage()
        onDAtePickerPage.selectCommonDatePickerDateFromToday(1)
        onDAtePickerPage.selectDatePickerWithRangeFromToday(3, 20)
        navigateTo.smartTablePage()
        onSmartTablePage.addNewRecordWithFirstAndLastName('A', 'T')
        onSmartTablePage.updateAgeByFirstName('A', '33')
        onSmartTablePage.deleteRowByIndex(1)
    })

})