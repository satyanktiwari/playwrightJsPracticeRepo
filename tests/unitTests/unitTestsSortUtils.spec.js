// @ts-check
import { test, expect } from '@playwright/test';
import { getSortedData, verifySorting } from '../../utils/sortUtils.js';

test.describe('Validate the funtions in sortUtils', () => {
  test('getSortedData returns a new sorted array for strings (asc)', () => {
    const data = ['banana', 'apple', 'cherry'];
    const result = getSortedData(data, 'asc');

    expect(result).toEqual(['apple', 'banana', 'cherry']);
    expect(data).toEqual(['banana', 'apple', 'cherry']);
  });

  test('getSortedData returns a new sorted array for strings (desc)', () => {
    const data = ['banana', 'apple', 'cherry'];
    const result = getSortedData(data, 'desc');

    expect(result).toEqual(['cherry', 'banana', 'apple']);
    expect(data).toEqual(['banana', 'apple', 'cherry']);
  });

  test('getSortedData handles numeric strings with currency, percent, and commas', () => {
    const data = ['20%', '$1,500.00', '100', '$5'];
    const result = getSortedData(data, 'asc');

    expect(result).toEqual(['$5', '20%', '100', '$1,500.00']);
  });

  test('getSortedData handles numeric strings with currency and percent in desc order', () => {
    const data = ['20%', '$1,500.00', '100', '$5'];
    const result = getSortedData(data, 'desc');

    expect(result).toEqual(['$1,500.00', '100', '20%', '$5']);
  });

  test('verifySorting returns true for already sorted arrays', () => {
    expect(verifySorting(['apple', 'banana', 'cherry'], 'asc')).toBe(true);
    expect(verifySorting(['cherry', 'banana', 'apple'], 'desc')).toBe(true);
  });

  test('verifySorting returns false for unsorted arrays', () => {
    expect(verifySorting(['banana', 'apple', 'cherry'], 'asc')).toBe(false);
    expect(verifySorting(['apple', 'banana', 'cherry'], 'desc')).toBe(false);
  });
});
