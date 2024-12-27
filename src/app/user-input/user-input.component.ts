import {Component, EventEmitter, inject, output, Output, signal} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {InvestmentService} from "../investment.service";
import {InvestmentInput} from "../investment-input.model";

@Component({
  selector: 'app-user-input',
  imports: [
    FormsModule
  ],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css'
})
export class UserInputComponent {

  enteredInitialInvestment = signal('100');
  enteredAnnualInitialInvestment = signal('1200');
  enteredExpectedReturn = signal('5');
  enteredDuration = signal('10');

  private investmentService: InvestmentService = inject(InvestmentService);

  onSubmit() {
    let data:InvestmentInput = {
      initialInvestment: +this.enteredInitialInvestment(),
      annualInvestment: +this.enteredAnnualInitialInvestment(),
      expectedReturn: +this.enteredExpectedReturn(),
      duration: +this.enteredDuration()
    }
    this.investmentService.calculateInvestmentResults(data);
  }
}
