import { TodoCreateTemplate } from '../../features/todos/components';
import { BaseLayout } from '../../shared/components/layouts';

export const TodoCreatePage = () => {
  return (
    <BaseLayout title={'TodoCreate'}>
      <TodoCreateTemplate />
    </BaseLayout>
  );
};
