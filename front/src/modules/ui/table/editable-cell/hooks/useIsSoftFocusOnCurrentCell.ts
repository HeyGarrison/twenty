import { useRecoilValue } from 'recoil';

import { isSoftFocusOnCellFamilyState } from '../../states/isSoftFocusOnCellFamilyState';

import { useCurrentCellPosition } from './useCurrentCellPosition';

export function useIsSoftFocusOnCurrentCell() {
  const currentCellPosition = useCurrentCellPosition();

  const isSoftFocusOnCell = useRecoilValue(
    isSoftFocusOnCellFamilyState(currentCellPosition),
  );

  return isSoftFocusOnCell;
}
