import { toTitleCase } from './toTitleCase';
import {describe, it, expect} from "vitest";

describe('toTitleCase', () => {
  it('should convert to title case', () => {
    expect(toTitleCase('hello world')).toBe('Hello World');
    expect(toTitleCase('this is a test')).toBe('This Is A Test');
    expect(toTitleCase('multiple   spaces')).toBe('Multiple Spaces');
    expect(toTitleCase('with special characters!')).toBe('With Special Characters!');
  });
});
