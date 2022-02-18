import { ABATransaction } from './aba-transaction';

describe('AbaTrasaction', () => {
  it('should create an instance', () => {
    expect(new ABATransaction({} as any)).toBeTruthy();
  });
});
