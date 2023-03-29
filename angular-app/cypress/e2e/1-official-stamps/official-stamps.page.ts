import { OfficialStampResponse } from '@portal/core/interfaces/response';
import * as officialStampResponse from '../../fixtures/official-stamps.json';

export class OfficialStampPage {
    public readonly PAGE_URL = '/official-stamps';
    public readonly TAG = 'app-official-stamps';
    public readonly FILTER = '[data-cy="filter"]';
    public readonly FILTER_CLEAR = '[data-cy="filter-clear"]';
    public readonly TABLE = '[data-cy="official-stamp-table"]';
    public readonly ADD_BUTTON = '[data-cy="add-official-stamp"]';
    public readonly NAME_INPUT = 'input[data-cy="name"]';
    public readonly VALUE_INPUT = 'input[data-cy="value"]';
    public readonly SUBMIT_DIALOG = 'button[data-cy="save-submit"]';
    public readonly EDIT_BUTTON = 'button[data-cy="edit"]';
    public readonly MAT_SNACK_BAR = '.mat-mdc-simple-snack-bar';

    public readonly API_URL = Cypress.env('api_url') + '/official-stamps';

    public readonly officialStamps =
        officialStampResponse._embedded.officialStampResponseList;
    public readonly OFFICIAL_STAMP_ID = 999;
    public readonly OFFICIAL_STAMP_NAME = 'Official Stamps CY';
    public readonly OFFICIAL_STAMP_VALUE = 150; // to make R$ 1,50
    private RESPONSE_AFTER_SAVE = {
        body: {
            id: this.OFFICIAL_STAMP_ID,
            name: this.OFFICIAL_STAMP_NAME,
            value: this.OFFICIAL_STAMP_VALUE / 100,
        },
    };

    public goToPage = () => {
        cy.intercept('GET', this.API_URL, {
            fixture: 'official-stamps.json',
        }).as('official-stamps');

        cy.visit(Cypress.env('host') + this.PAGE_URL);

        cy.wait('@official-stamps');
        cy.get('body').find(this.TAG).should('not.be.empty');
    };

    public filterTable = (value: string) => {
        const filter = cy.get(this.FILTER);
        // Filtering by Selo 2
        filter.type(value);
    };

    public clearFilter = () => {
        cy.get(this.FILTER_CLEAR).click();
    };

    public fillFormAndCreate = () => {
        this.fillForm();

        cy.intercept('POST', this.API_URL, this.RESPONSE_AFTER_SAVE).as(
            'create-official-stamp'
        );

        cy.get(this.SUBMIT_DIALOG).click();

        cy.wait('@create-official-stamp');
    };

    public filterTableAndEdit = (officialStamp: OfficialStampResponse) => {
        this.filterTable(officialStamp.name);
        cy.get(this.EDIT_BUTTON).click();

        this.fillFormEditAndSave(officialStamp);
    };

    private fillFormEditAndSave(officialStamp: OfficialStampResponse) {
        this.resetForm();
        this.fillForm();

        cy.intercept(
            'PUT',
            `${this.API_URL}/${officialStamp.id}`,
            this.RESPONSE_AFTER_SAVE
        ).as('update-official-stamp');

        cy.get(this.SUBMIT_DIALOG).click();

        cy.wait('@update-official-stamp');
    }

    private fillForm(): void {
        cy.get(this.NAME_INPUT).type(this.OFFICIAL_STAMP_NAME);
        cy.get(this.VALUE_INPUT).type(this.OFFICIAL_STAMP_VALUE.toString());
    }

    private resetForm(): void {
        cy.get(this.NAME_INPUT).clear();
        cy.get(this.VALUE_INPUT).clear();
    }
}
