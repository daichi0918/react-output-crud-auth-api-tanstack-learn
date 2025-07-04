import { useCallback, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useTodo, useUpdateTodo } from "../../hooks/queries";
import { NAVIGATION_PATH } from "../../../../shared/constants/navigation";

const schema = z.object({
  title: z
    .string()
    .min(1, "タイトルは必須です。")
    .max(10, "10文字以内で入力してください。"),
  content: z.string().optional(),
});

export const useTodoEditTemplate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: todo, isLoading } = useTodo(id || "");
  const updateMutation = useUpdateTodo();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { title: "", content: "" },
  });

  useEffect(() => {
    if (todo) {
      setValue("title", todo.title);
      setValue("content", todo.content);
    }
  }, [todo, setValue]);

  const handleEditSubmit = handleSubmit(
    useCallback(
      async (values: z.infer<typeof schema>) => {
        if (!id) return;
        try {
          await updateMutation.mutateAsync({
            id,
            title: values.title,
            content: values.content,
          });
          navigate(NAVIGATION_PATH.TOP);
        } catch (error) {
          setError("title", {
            type: "manual",
            message: (error as unknown as {response?: {data?: {message?: string}}}).response?.data?.message || "更新に失敗しました",
          });
        }
      },
      [navigate, id, updateMutation, setError]
    )
  );

  return {
    control,
    errors,
    handleEditSubmit,
    isLoading,
    isSaving: updateMutation.isPending,
  };
};
