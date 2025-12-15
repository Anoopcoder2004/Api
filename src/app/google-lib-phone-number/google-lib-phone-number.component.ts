import { Component } from '@angular/core';
import { PhoneNumberUtil, PhoneNumberFormat } from 'google-libphonenumber';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CdkMonitorFocus } from '@angular/cdk/a11y';

@Component({
  selector: 'app-google-lib-phone-number',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './google-lib-phone-number.component.html',
  styleUrls: ['./google-lib-phone-number.component.scss']
})
export class GoogleLibPhoneNumberComponent {

  phoneNumber: string = '';  // User input
  isValid: boolean | null = null;
  formattedNumber: string = '';

  private phoneUtil = PhoneNumberUtil.getInstance();

  validatePhone() {
    try {
      const number = this.phoneUtil.parse(this.phoneNumber, 'IN'); // You can make this dynamic
      this.isValid = this.phoneUtil.isValidNumber(number);
      this.formattedNumber = this.phoneUtil.format(number, PhoneNumberFormat.INTERNATIONAL);
    } catch (error) {
      this.isValid = false;
      this.formattedNumber = '';
    }
  }
}
