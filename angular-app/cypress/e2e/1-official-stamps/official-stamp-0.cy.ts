import { TableUtils } from '../../utils/table.utils';
import { OfficialStampPage } from './official-stamps.page';

describe('Official Stamp - Filtering and Validation Table', () => {
    const page = new OfficialStampPage();
    const tableUtils = new TableUtils();

    it('Handling error network', () => {
        cy.intercept('GET', 'http://localhost:8090/api/v1/official-stamps', {
            statusCode: 500,
            body: {
                code: 500,
                message: 'Unknown error',
            },
        }).as('official-stamps');

        cy.visit(Cypress.env('host') + page.PAGE_URL);
        cy.wait('@official-stamps');

        cy.get(page.MAT_SNACK_BAR).should(
            'contain.text',
            'Something is wrong!'
        );
    });

    it('Filter table', () => {
        page.goToPage();

        const loading = cy.get('app-loader');
        loading.should('exist');

        const filter = cy.get(page.FILTER);
        filter.should('be.empty');

        const table = cy.get(page.TABLE);
        table.should('exist');

        // Filter Table by a Official Stamps
        page.filterTable(page.officialStamps[0].name);
        // Validate if there is one row in the table
        table.get(tableUtils.ROW).should('have.length', 1);
        // Validate if first cell (id) is not empty
        table.get(tableUtils.CELL).eq(0).should('not.be.empty');

        // Clear Fitler
        page.clearFilter();
        // Validate if the table has many rows
        table.get(tableUtils.ROW).should('have.length.greaterThan', 1);

        // Filtering by anything that not exists on table
        page.filterTable('anything');
        // Validate if the table does not have a row
        table.get(tableUtils.ROW).should('have.length', 0);
        // Validate if no data is showing
        table
            .get(tableUtils.NO_DATA)
            .should('contain.text', 'No data matching the filter');

        // Clear Fitler
        page.clearFilter();
        // Validate if the table has many rows
        table.get(tableUtils.ROW).should('have.length.greaterThan', 1);
    });

    it('Add a new official stamp', () => {
        page.goToPage();

        const addButton = cy.get(page.ADD_BUTTON);
        addButton.should('be.enabled');

        addButton.click();

        page.fillFormAndCreate();

        // Get Filter
        const filter = cy.get(page.FILTER);
        // Filter must be empty
        filter.should('be.empty');

        // Get Table
        const table = cy.get(page.TABLE);
        // It must exist
        table.should('exist');

        // Filter Table by the created official stamp name
        page.filterTable(page.OFFICIAL_STAMP_NAME);
        // Validate if there is one row in the table
        table.get(tableUtils.ROW).should('have.length', 1);
        // Validate if first cell (id) is not empty
        table.get(tableUtils.CELL).eq(0).should('not.be.empty');
    });

    it('Update a official stamp', () => {
        page.goToPage();

        //Edit the first official stamps
        page.filterTableAndEdit(page.officialStamps[0]);

        // Get Filter
        const filter = cy.get(page.FILTER);
        // Clear Filter
        filter.clear();
        // Filter must be empty
        filter.should('be.empty');

        // Get Table
        const table = cy.get(page.TABLE);
        // It must exist
        table.should('exist');

        // Filter Table by the created official stamp name
        page.filterTable(page.OFFICIAL_STAMP_NAME);
        // Validate if there is one row in the table
        table.get(tableUtils.ROW).should('have.length', 1);
        // Validate if first cell (id) is not empty
        table.get(tableUtils.CELL).eq(0).should('not.be.empty');
    });
});
