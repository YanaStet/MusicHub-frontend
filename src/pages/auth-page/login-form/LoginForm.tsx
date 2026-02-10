import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/shared/shadcn-ui/field";
import { Input } from "@/shared/shadcn-ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/shadcn-ui/card";
import { Button } from "@/shared/shadcn-ui/button";
import { loginSchema, type LoginSchema } from "./schema";
import { authHooks } from "@/entities/auth/hooks";
import { showToast } from "@/shared/utils/showToast";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "@/shared/utils/routes";
import { Spinner } from "@/shared/shadcn-ui/spinner";
import { handleApiError } from "@/shared/utils/handleApiError";
import { Typography } from "@/shared/shadcn-ui/typography";

type LoginFormProps = {
  setDisplayRegister: () => void;
};

export const LoginForm = ({ setDisplayRegister }: LoginFormProps) => {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  });

  const navigate = useNavigate();

  const { mutate, isPending } = authHooks.useLoginMutation();

  const handleSubmit = (values: LoginSchema) => {
    mutate(
      {
        email: values.email,
        password: values.password,
      },
      {
        onSuccess: () => {
          showToast("success", "Authorization was successful");
          navigate(ROUTE_PATHS.HOME);
        },
        onError: (er) => handleApiError(er),
      },
    );
  };

  const handleLogin = () => {
    window.location.href = "http://localhost:34/auth/google";
  };

  return (
    <Card className="w-full sm:max-w-md bg-neutral-800 border-neutral-700 text-white">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <form {...form} onSubmit={form.handleSubmit(handleSubmit)}>
        <CardContent className="flex flex-col gap-4">
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>

                <Input
                  onChange={field.onChange}
                  value={field.value}
                  type="email"
                  placeholder="example@gmail.com"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                <Input
                  onChange={field.onChange}
                  value={field.value}
                  type="password"
                  placeholder="Start typing"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Typography variant="body3">
            Don`t have an account yet?{" "}
            <span
              className="underline cursor-pointer"
              onClick={setDisplayRegister}
            >
              Register!
            </span>
          </Typography>
        </CardContent>

        <CardFooter className="flex flex-col gap-1 mt-4">
          <Button
            type="submit"
            className="w-full bg-neutral-900 cursor-pointer"
            disabled={isPending}
          >
            Login
            {isPending && <Spinner />}
          </Button>
          <Button className="w-full bg-neutral-700" onClick={handleLogin}>
            Login with google
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
