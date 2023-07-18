import { useRecoilValue } from 'recoil';

import { viewableCommentThreadIdState } from '@/activities/states/viewableCommentThreadIdState';
import { RightDrawerBody } from '@/ui/right-drawer/components/RightDrawerBody';
import { RightDrawerPage } from '@/ui/right-drawer/components/RightDrawerPage';
import { RightDrawerTopBar } from '@/ui/right-drawer/components/RightDrawerTopBar';

import { CommentThread } from '../CommentThread';

export function RightDrawerCreateCommentThread() {
  const commentThreadId = useRecoilValue(viewableCommentThreadIdState);

  return (
    <RightDrawerPage>
      <RightDrawerTopBar />
      <RightDrawerBody>
        {commentThreadId && (
          <CommentThread
            commentThreadId={commentThreadId}
            showComment={false}
            autoFillTitle={true}
          />
        )}
      </RightDrawerBody>
    </RightDrawerPage>
  );
}
