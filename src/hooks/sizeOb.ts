import { DirectiveBinding } from 'vue';
import { useDebounceFn } from '@vueuse/core';

const map = new WeakMap<HTMLElement, any>();

const ob = new ResizeObserver((entries: ResizeObserverEntry[]) => {
  for (const entry of entries) {
    const handler = map.get(<HTMLElement>entry.target);
    if (handler) {
      handler(
        entry.contentBoxSize[0].inlineSize,
        entry.contentBoxSize[0].blockSize
      );
    }
  }
});

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const debouncedHandler = useDebounceFn(
      (inlineSize: number, blockSize: number) => {
        binding.value(inlineSize, blockSize);
      },
      0
    ); // 设置防抖时间，单位为毫秒

    map.set(el, debouncedHandler);
    ob.observe(el);
  },
  unmounted(el: HTMLElement) {
    ob.unobserve(el);
  }
};
