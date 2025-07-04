import { Controller } from 'react-hook-form';
import { FC } from 'react';

import {
  InputFormSection,
  TextAreaSection,
  CommonButton,
} from '../../../../shared/components/ui';
import { TodoType } from '../../types';

import { useTodoEditForm } from './useTodoEditForm';

import styles from './style.module.css';

type TodoEditFormProps = {
  todo: TodoType;
};

export const TodoEditForm: FC<TodoEditFormProps> = ({ todo }) => {
  const { control, errors, handleEditSubmit } = useTodoEditForm({ todo });

  return (
    <form className={styles.container} onSubmit={handleEditSubmit}>
      <div className={styles.area}>
        <Controller
          name="title"
          render={({ field }) => (
            <InputFormSection
              placeholder={'Title'}
              errorMessage={errors.title?.message}
              {...field}
            />
          )}
          control={control}
        />
      </div>
      <div className={styles.area}>
        <Controller
          name="content"
          render={({ field }) => (
            <TextAreaSection
              placeholder={'Content'}
              errorMessage={errors.content?.message}
              {...field}
            />
          )}
          control={control}
        />
      </div>
      <div className={styles.area}>
        <CommonButton type="submit">{'Edit Todo'}</CommonButton>
      </div>
    </form>
  );
};
