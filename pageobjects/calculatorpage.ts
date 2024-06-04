import {BasePage} from '../pageobjects/base_page.ts'
class CalculatorPage extends BasePage {
    // Define all the elements and methods
    get currentAgeInput() { return $('#current-age'); }
    get retirementAgeInput() { return $('#retirement-age'); }
    get annualIncomeInput() { return $('#current-income'); }
    get spouseIncomeInput() { return $('#spouse-income'); }
    get retirementSavingsInput() { return $('#current-total-savings'); }
    get retirementContributionInput() { return $('#current-annual-savings'); }
    get annualContributionIncreaseInput() { return $('#savings-increase-rate'); }
    get socialSecurityYesRadio() { return $('//label[@for="yes-social-benefits"]'); }
    get socialSecurityNoRadio() { return $('//label[@for="no-social-benefits"]'); }
    get socialSecurityOverrideInput() { return $('#social-security-override'); }
    get additionalIncomeInput() { return $('#additional-income'); }
    get yearsRetirementNeedsToLastInput() { return $('#retirement-duration'); }
    get inflationIncreaseYesRadio() { return $('//label[@for="include-inflation"]'); }
    get inflationIncreaseNoRadio() { return $('//label[@for="exclude-inflation"]'); }
    get adjustDefaultValuesLink() { return $('//a[normalize-space()="Adjust default values"]')}
    get finalAnnualIncomeDesiredInput() { return $('#retirement-annual-income'); }
    get preRetirementInvestmentReturnInput() { return $('#pre-retirement-roi'); }
    get postRetirementInvestmentReturnInput() { return $('#post-retirement-roi'); }
    get saveChangesButton() { return $('//button[normalize-space()="Save changes"]')}
    get submitButton() { return $('//button[normalize-space()="Calculate"]'); }
    get minimumAmountNeededToRetire() { return $('//p[@id="result-message"]')}

    async open() {
        await browser.url(" ");
        await browser.maximizeWindow();
    }

    async fillForm(data: any) {
        await this.currentAgeInput.setValue(data.currentAge);
        await this.retirementAgeInput.setValue(data.retirementAge);
        const annualIncomeInputBox = await this.annualIncomeInput
        await annualIncomeInputBox.click()
        await annualIncomeInputBox.setValue(data.annualIncome)
        const spouseIncomeInputBox = await this.spouseIncomeInput
        await spouseIncomeInputBox.click()
        await spouseIncomeInputBox.setValue(data.spouseIncome)
        const retirementSavingInputBox = await this.retirementSavingsInput
        await retirementSavingInputBox.click()
        await retirementSavingInputBox.setValue(data.retirementSavings)
        await this.retirementContributionInput.setValue(data.retirementContribution);
        await this.annualContributionIncreaseInput.setValue(data.annualContributionIncrease);
        if (data.socialSecurityIncome) {
            await this.socialSecurityYesRadio.click();
            const socialSecurityOverride = await this.socialSecurityOverrideInput
            await socialSecurityOverride.isEnabled()
            await socialSecurityOverride.setValue(data.socialSecurityOverride);
        } else {
            await this.socialSecurityNoRadio.click();
        }
    }

    async FillDefaultValues(data:any){       
        const adjustDefaultValues = await this.adjustDefaultValuesLink
        await adjustDefaultValues.click()
        const additionalIncome = await this.additionalIncomeInput
        await additionalIncome.click()
        await additionalIncome.setValue(data.additionalIncome)
        await this.yearsRetirementNeedsToLastInput.setValue(data.yearsRetirementNeedsToLast);
        if (data.inflationIncrease) {
            await this.inflationIncreaseYesRadio.click();
        } else {
            await this.inflationIncreaseNoRadio.click();
        }
        await this.finalAnnualIncomeDesiredInput.setValue(data.finalAnnualIncomeDesired);
        await this.preRetirementInvestmentReturnInput.setValue(data.preRetirementInvestmentReturn);
        await this.postRetirementInvestmentReturnInput.setValue(data.postRetirementInvestmentReturn);
        await this.saveChangesButton.click()
    }

    async submitForm() {
        await this.submitButton.click();
    }
}

export default new CalculatorPage();
