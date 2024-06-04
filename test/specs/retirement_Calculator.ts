import CalculatorPage from '../../pageobjects/calculatorpage.ts';
import {DefaultValues} from '../../pageobjects/test_data/sample_test_data.ts'

describe('Retirement Savings Calculator', () => {
    beforeEach(async () => {
        await CalculatorPage.open();
    });

    it('User should submit form with all required fields filled in', async () => {
        const data = await DefaultValues.getSampleValues();
        await CalculatorPage.assertIsVisible();
        await CalculatorPage.fillForm(data);
        await CalculatorPage.submitForm();
    });

    it('User should submit form with all required fields filled in including social security income', async () => {
        const data = await DefaultValues.getDataWithSocialSecurityIncome();
        await CalculatorPage.assertIsVisible();
        await CalculatorPage.fillForm(data);
        await CalculatorPage.submitForm();
    });


    it('should show/hide Social Security fields based on Social Security benefits toggle', async () => {
        await CalculatorPage.assertIsVisible();
        await CalculatorPage.socialSecurityNoRadio.click();
        expect(await CalculatorPage.socialSecurityOverrideInput.isDisplayed()).toBe(false);
        await CalculatorPage.socialSecurityYesRadio.click();
        expect(await CalculatorPage.socialSecurityOverrideInput.isDisplayed()).toBe(true);
    });

    it('User should submit form with all fields filled in with default values ', async () => {
        const data = await DefaultValues.getSampleValues()
        const defaultValues = await DefaultValues.getDefaultValues()
        await CalculatorPage.assertIsVisible();
        await CalculatorPage.fillForm(data);
        await CalculatorPage.FillDefaultValues(defaultValues)
        await CalculatorPage.submitForm();
    });

    it('User should update default calculator values', async () => {
        const data = await DefaultValues.getSampleValues()
        const updatedDefaultValues = await DefaultValues.getUpdatedDefaultValues()
        await CalculatorPage.assertIsVisible();
        await CalculatorPage.fillForm(data)
        await CalculatorPage.FillDefaultValues(updatedDefaultValues)
        await CalculatorPage.submitForm()       
    });
});
