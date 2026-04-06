// usehooks-ts에서 검증된 훅 re-export
export {
  useMediaQuery,
  useLocalStorage,
  useDebounceValue,
  useCopyToClipboard,
  useScrollLock,
} from "usehooks-ts"

import { useMediaQuery } from "usehooks-ts"

// Tailwind md 브레이크포인트(768px) 기준 모바일 감지 편의 훅
export function useIsMobile() {
  return useMediaQuery("(max-width: 767px)")
}
