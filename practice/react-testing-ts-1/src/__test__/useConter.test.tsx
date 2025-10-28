import { act, renderHook } from '@testing-library/react';
import useCounter from '../hooks/useCounter';

describe('useCounter', () => {
  test('render init value', () => {
    const { result } = renderHook(useCounter, {
      initialProps: { initCount: 0 },
    });
    expect(result.current.count).toBe(0);
  });

  test('increment value', () => {
    const { result } = renderHook(useCounter, {
      initialProps: { initCount: 0 },
    });
    act(() => result.current.increment());
    expect(result.current.count).toBe(1);
  });

  test('decrement value', () => {
    const { result } = renderHook(useCounter, {
      initialProps: { initCount: 0 },
    });
    act(() => result.current.decrement());
    expect(result.current.count).toBe(-1);
  });
});
