import {Injectable, signal} from '@angular/core';
import type {InvestmentInput} from "./investment-input.model";
import {InvestmentResult} from "./investment-result.model";

@Injectable({
  providedIn: 'root'
})
export class InvestmentService {

  results= signal<InvestmentResult[] | undefined>(undefined);

  calculateInvestmentResults(data: InvestmentInput) {
    const annualData:InvestmentResult[] = [];
    const {initialInvestment, duration, expectedReturn, annualInvestment} = data;
    let investmentValue = initialInvestment;

    for (let i = 0; i < duration; i++) {
      const year = i + 1;
      const interestEarnedInYear = investmentValue * (expectedReturn / 100);
      investmentValue += interestEarnedInYear + annualInvestment;
      const totalInterest =
        investmentValue - annualInvestment * year - initialInvestment;
      annualData.push({
        year: year,
        interest: interestEarnedInYear,
        valueEndOfYear: investmentValue,
        annualInvestment: annualInvestment,
        totalInterest: totalInterest,
        totalAmountInvested: initialInvestment + annualInvestment * year,
      });
    }

    this.results.set(annualData);
  }
}
