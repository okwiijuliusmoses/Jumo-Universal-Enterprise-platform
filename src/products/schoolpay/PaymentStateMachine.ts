export type PaymentState = 'PENDING' | 'AUTHORIZED' | 'CAPTURED' | 'SETTLED' | 'FAILED' | 'REVERSED';

export class PaymentStateMachine {
  private currentState: PaymentState;

  constructor(initialState: PaymentState = 'PENDING') {
    this.currentState = initialState;
  }

  getState(): PaymentState {
    return this.currentState;
  }

  canTransitionTo(newState: PaymentState): boolean {
    switch (this.currentState) {
      case 'PENDING':
        return ['AUTHORIZED', 'FAILED'].includes(newState);
      case 'AUTHORIZED':
        return ['CAPTURED', 'FAILED'].includes(newState);
      case 'CAPTURED':
        return ['SETTLED', 'FAILED', 'REVERSED'].includes(newState);
      case 'SETTLED':
        return ['REVERSED'].includes(newState);
      case 'FAILED':
      case 'REVERSED':
        return false; // Terminal states
      default:
        return false;
    }
  }

  transitionTo(newState: PaymentState): boolean {
    if (this.canTransitionTo(newState)) {
      this.currentState = newState;
      return true;
    }
    return false;
  }
}
