import { FC } from 'react';
import { InputForm, TextArea } from '../../../../shared/components/ui';

import { TodoType } from '../../types';
import styles from './style.module.css';

type TodoDetailViewProps = {
  todo: TodoType;
};

export const TodoDetailView: FC<TodoDetailViewProps> = ({ todo }) => {
  return (
    <div className={styles.container}>
      <div className={styles.area}>
        <InputForm disabled value={todo.title} placeholder={'Title'} />
      </div>
      <div className={styles.area}>
        <TextArea disabled value={todo.content} placeholder={'Content'} />
      </div>
    </div>
  );
};
