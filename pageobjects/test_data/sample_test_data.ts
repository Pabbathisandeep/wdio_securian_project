
export class DefaultValues {
    public static async getSampleValues() {
      return {
        currentAge: 40,
        retirementAge: 68,
        annualIncome: 100000,
        spouseIncome: 75000,
        retirementSavings: 500000,
        retirementContribution: 10,
        annualContributionIncrease: 2,
        socialSecurityIncome: false,
    };
  }

  public static async getDefaultValues() {
    return {
      additionalIncome: 500,
      yearsRetirementNeedsToLast: 20,
      inflationIncrease: false,
      finalAnnualIncomeDesired: 75,
      preRetirementInvestmentReturn: 8,
      postRetirementInvestmentReturn: 5
      }
    }

  public static async getDataWithSocialSecurityIncome() {
    return {
      currentAge: 40,
      retirementAge: 68,
      annualIncome: 100000,
      spouseIncome: 75000,
      retirementSavings: 500000,
      retirementContribution: 10,
      annualContributionIncrease: 2,
      socialSecurityIncome: true,
      socialSecurityOverride: 4000,
    }
  }

  public static async getUpdatedDefaultValues() {
    return {
      additionalIncome: 1000,
      yearsRetirementNeedsToLast: 25,
      inflationIncrease: false,
      finalAnnualIncomeDesired: 80,
      preRetirementInvestmentReturn: 9,
      postRetirementInvestmentReturn: 4
    }
  }
}