import { TodoDetailTemplate } from '../../features/todos/components';

import { BaseLayout } from '../../shared/components/layouts';

export const TodoDetailPage = () => {
  return (
    <BaseLayout title={'TodoDetail'}>
      <TodoDetailTemplate />
    </BaseLayout>
  );
};
