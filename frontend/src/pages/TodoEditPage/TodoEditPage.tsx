import { TodoEditTemplate } from '../../features/todos/components';
import { BaseLayout } from '../../shared/components/layouts';

export const TodoEditPage = () => {
  return (
    <BaseLayout title={'TodoEdit'}>
      <TodoEditTemplate />
    </BaseLayout>
  );
};
