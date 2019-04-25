import { Component, Input, OnInit } from '@angular/core';

export enum BooleanIndicatorType {
  enabledDisabled = 'enabled-disabled',
  lockedUnlocked = 'locked-unlocked',
  unlockedLocked = 'unlocked-locked',
  yesNo = 'yes-no',
  trueFalse = 'true-false',
  healthyUnhealthy = 'healthy-unhealthy',
  succeededFailed = 'success-failed'
}

interface IBooleanConfig {
  isTrue?: boolean;
  isUnknown?: boolean;
  inverse?: boolean;
  subtle?: boolean;
}

interface IBooleanOutput {
  icon: string;
  text: string;
  isUnknown?: boolean;
  isTrue?: boolean;
  subtle: boolean;
}

export type booleanStringType = 'True' | 'False' | 'Unknown';

@Component({
  selector: 'app-boolean-indicator',
  templateUrl: './boolean-indicator.component.html',
  styleUrls: ['./boolean-indicator.component.scss']
})
export class BooleanIndicatorComponent {
  public booleanOutput: IBooleanOutput;
  // Invert the text labels with the icons (No text for yes value and vice-versa)
  @Input() inverse = false;
  // Should we use a subtle display - this won't show the No option as danger (typically red)
  @Input() subtle = true;
  @Input() type: BooleanIndicatorType;
  @Input() showText = true;

  @Input() set isTrue(isTrue: boolean) {
    const isUnknown = typeof isTrue !== 'boolean';
    this.booleanOutput = this.getIconTextAndSeverity({
      isTrue,
      isUnknown,
      inverse: this.inverse,
      subtle: this.subtle
    });
  }

  private icons = {
    Yes: 'check_circle',
    Enabled: 'check_circle',
    Healthy: 'check_circle',
    True: 'check_circle',
    Succeeded: 'check_circle',
    Add: 'add_circle',
    No: 'highlight_off',
    Disabled: 'highlight_off',
    Unhealthy: 'highlight_off',
    Failed: 'remove_circle',
    False: 'highlight_off',
    Remove: 'remove_circle',
    Locked: 'lock_outline',
    Unlocked: 'lock_open',
    Unknown: 'help_outline'
  };

  private getIconTextAndSeverity = (
    { isTrue = false, isUnknown = false, inverse = false, subtle = true }: IBooleanConfig
  ): IBooleanOutput => {
    if (isUnknown) {
      return {
        icon: this.icons.Unknown,
        text: 'Unknown',
        isUnknown: true,
        subtle: true
      };
    }
    const text = this.getText({ isTrue, inverse });
    console.log(text, inverse, isTrue)
    return {
      icon: this.icons[text],
      text,
      isTrue: inverse ? !isTrue : isTrue,
      subtle
    };
  }

  private getText = ({ isTrue = false, inverse = false }: IBooleanConfig): string => {
    const [enabledText, disabledText] = this.getTypeText(this.type);
    const value = inverse ? !isTrue : isTrue;
    return this.capitalizeFirstLetter(value ? enabledText : disabledText);
  }

  private getTypeText = (s: string) => s.split('-');

  private capitalizeFirstLetter = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
}
